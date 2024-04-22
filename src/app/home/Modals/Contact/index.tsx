import Portal from "@components/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { TContact, zContact } from "@schemas/contact";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as S from "./styles";
import InputField from "@components/InputField";
import Button from "@components/Button";

import { getGeocode } from "use-places-autocomplete";
import { createContact, getContact, updateContact } from "../../actions";
import { APIAddress, isValidAddressList } from "../../../../types/api-address";
import { cepMask, cpfMask, phoneMask } from "../../../../utils/masks";

const VIA_CEP_URL = "https://viacep.com.br/ws";

const ContactModal = () => {
  const [addressList, setAddressList] = React.useState<APIAddress[]>([]);

  const param = useSearchParams().get("modal");
  const contactId = useSearchParams().get("id");

  const path = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<TContact>({
    resolver: zodResolver(zContact),
  });

  const { onChange: onCepChange, ...cepRest } = register("cep");
  const { onChange: onAddressChange, ...addressRest } = register("address");

  function onModalClose() {
    reset();
  }

  useEffect(() => {
    if (!contactId) return;

    async function getContactInfo() {
      const res = await getContact(Number(contactId));

      if (res.ok) {
        const contact = res.data;

        setValue("name", contact.name);
        setValue("cpf", contact.cpf);
        setValue("phone", contact.phone);
        setValue("cep", contact.cep);
        setValue("address", contact.address);
        setValue("city", contact.city);
        setValue("state", contact.state);
        setValue("addressNumber", contact.addressNumber);
        setValue("district", contact.district);
        setValue("addOnAddress", contact.addOnAddress || "");
      }
    }

    getContactInfo();
  }, [contactId, setValue]);

  async function onCepInput(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!(e.target.value.length === 9)) return;

      const address = await fetch(`${VIA_CEP_URL}/${e.target.value}/json`).then(
        (res) => res.json()
      );

      if (!address) return;

      setValue("district", address.bairro);
      setValue("address", address.logradouro);
      setValue("city", address.localidade);
      setValue("state", address.uf);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    onCepChange(e);
  }

  async function onAddressInput(e: React.ChangeEvent<HTMLInputElement>) {
    const state = getValues("state");
    const city = getValues("city");

    try {
      if (!city)
        return setError("city", {
          type: "manual",
          message: "Insira uma cidade.",
        });

      clearErrors("city");

      if (!state)
        return setError("state", {
          type: "manual",
          message: "Insira um estado.",
        });

      clearErrors("state");

      if (e.target.value.length < 5) return;

      const address = await fetch(
        `${VIA_CEP_URL}/${state}/${city}/${e.target.value}/json`
      ).then((res) => res.json());

      if (!isValidAddressList(address)) throw new Error("Invalid address list");

      console.log(address);

      setAddressList(address);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    onAddressChange(e);
  }

  function onAddressSelect(address: APIAddress) {
    return () => {
      setValue("district", address.bairro);
      setValue("cep", address.cep);
      setValue("address", address.logradouro);
      setValue("city", address.localidade);
      setValue("state", address.uf);

      setAddressList([]);
    };
  }

  async function onSubmit(data: TContact) {
    try {
      if (contactId) {
        const res = await updateContact(contactId, data);

        if (!res.ok) {
          throw new Error(res.message);
        }
      }

      const geocodeRes = await getGeocode({
        address: `${data.address} ${data.addressNumber} ${data.city} ${data.state}`,
      });

      if (!contactId) {
        const res = await createContact({
          ...data,
          coordinates: {
            lat: geocodeRes[0].geometry.location.lat(),
            lng: geocodeRes[0].geometry.location.lng(),
          },
        });

        if (!res.ok && res.message === "Contact already exists") {
          return setError("cpf", {
            type: "manual",
            message: "Contato já existe em sua lista.",
          });
        }

        if (!res.ok) {
          throw new Error(res.message);
        }
      }

      router.push(path);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <Portal onClose={onModalClose} selector="modal" show={param === "contact"}>
      <S.NewContactModal>
        <h1>{contactId ? "Editar" : "Adicionar"} contato</h1>
        <S.NewContactForm onSubmit={handleSubmit(onSubmit)}>
          <S.SideBySideInput>
            <InputField
              {...register("name")}
              label={{ value: "Nome", mode: "onTop" }}
              additionalInfo={{
                message: errors.name?.message,
                type: "error",
              }}
            />
            <InputField
              {...register("cpf")}
              label={{ value: "CPF", mode: "onTop" }}
              mask={cpfMask}
              additionalInfo={{
                message: errors.cpf?.message,
                type: "error",
              }}
            />
          </S.SideBySideInput>
          <S.SideBySideInput>
            <InputField
              {...register("phone")}
              label={{ value: "Telefone", mode: "onTop" }}
              mask={phoneMask}
              additionalInfo={{
                message: errors.phone?.message,
                type: "error",
              }}
            />
            <InputField
              onChange={onCepInput}
              {...cepRest}
              label={{
                value: "CEP",
                mode: "onTop",
              }}
              mask={cepMask}
              additionalInfo={{
                message: errors.cep?.message,
                type: "error",
              }}
            />
          </S.SideBySideInput>
          <S.SideBySideInput>
            <InputField
              {...register("city")}
              label={{
                value: "Cidade",
                mode: "onTop",
              }}
              additionalInfo={{
                message: errors.city?.message,
                type: "error",
              }}
            />
            <InputField
              {...register("state")}
              maxLength={2}
              label={{
                value: "Estado",
                mode: "onTop",
              }}
              additionalInfo={{
                message: errors.state?.message,
                type: "error",
              }}
            />
          </S.SideBySideInput>

          <S.AddressSearchContainer>
            <InputField
              onChange={onAddressInput}
              {...addressRest}
              label={{
                value: "Endereço",
                mode: "onTop",
              }}
              additionalInfo={{
                message: errors.address?.message,
                type: "error",
              }}
            />
            {addressList.length > 0 && (
              <S.AddressSugestionsContainer>
                {addressList.map((address, index) => (
                  <S.AddressSugestion
                    key={index}
                    onClick={onAddressSelect(address)}
                  >
                    <p>{address.logradouro}</p>
                    <p>{address.cep}</p>
                  </S.AddressSugestion>
                ))}
              </S.AddressSugestionsContainer>
            )}
          </S.AddressSearchContainer>

          <S.SideBySideInput>
            <InputField
              {...register("addressNumber")}
              label={{
                value: "Número",
                mode: "onTop",
              }}
              additionalInfo={{
                message: errors.addressNumber?.message,
                type: "error",
              }}
            />
            <InputField
              {...register("district")}
              label={{
                value: "Bairro",
                mode: "onTop",
              }}
              additionalInfo={{
                message: errors.district?.message,
                type: "error",
              }}
            />
          </S.SideBySideInput>
          <InputField
            {...register("addOnAddress")}
            label={{
              value: "Complemento",
              mode: "onTop",
            }}
            additionalInfo={{
              message: errors.addOnAddress?.message,
              type: "error",
            }}
          />
          <Button type="submit">{contactId ? "Atualizar" : "Adicionar"}</Button>
        </S.NewContactForm>
      </S.NewContactModal>
    </Portal>
  );
};

export default ContactModal;
