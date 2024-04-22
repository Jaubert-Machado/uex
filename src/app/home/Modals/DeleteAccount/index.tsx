import Portal from "@components/Portal";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import * as S from "./styles";
import { deleteAccount } from "../../actions";
import InputField from "@components/InputField";
import Button from "@components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TDeleteAccount, zDeleteAccount } from "@schemas/account";

const DeleteAccModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TDeleteAccount>({
    resolver: zodResolver(zDeleteAccount),
  });

  const router = useRouter();
  const params = useSearchParams().get("modal");

  async function onDeleteConfirm(data: TDeleteAccount) {
    const res = await deleteAccount(data.password);

    if (!res.ok) {
      if (res.message === "Invalid password") {
        return setError("password", {
          type: "manual",
          message: "Senha inválida.",
        });
      }
    }

    router.push("/");
  }

  return (
    <Portal selector="modal" show={params === "delete-acc"} onClose={() => {}}>
      <S.DeleteAccModal>
        <h1>Tem certeza que deseja deletar sua conta?</h1>
        <p>Essa ação é irreversível.</p>
        <S.Form onSubmit={handleSubmit(onDeleteConfirm)}>
          <InputField
            {...register("password")}
            label={{
              value: "Senha",
            }}
            secureTextEntry
            additionalInfo={{
              message: errors.password?.message,
              type: "error",
            }}
          />
          <Button type="submit">Sim</Button>
        </S.Form>
      </S.DeleteAccModal>
    </Portal>
  );
};

export default DeleteAccModal;
