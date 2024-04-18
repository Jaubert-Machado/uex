"use client";

import React, { useState } from "react";
import * as S from "./styles";
import InputField from "@components/InputField";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import { TRegister, zRegister } from "@schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "./actions";
import { AnimatePresence } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";

const Register = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TRegister>({
    resolver: zodResolver(zRegister),
  });

  async function onRegister(data: TRegister) {
    const res = await registerUser(data);

    if (!res.ok)
      return setError("email", {
        type: "manual",
        message: "E-mail já cadastrado no sistema.",
      });

    setSuccess(true);
  }

  return (
    <S.Page>
      <S.RegisterCard>
        <S.CardHeader>
          <h1>Register</h1>
          <S.BackButton href="/">
            <BsArrowLeft size={24} />
          </S.BackButton>
        </S.CardHeader>
        <AnimatePresence mode="wait">
          {!success && (
            <S.Form
              key="form"
              exit={{
                opacity: 0,
                y: 20,
              }}
              onSubmit={handleSubmit(onRegister)}
            >
              <S.FieldsContainer>
                <InputField
                  register={register("name")}
                  label="Name"
                  additionalInfo={{
                    message: errors.name?.message,
                    type: "error",
                  }}
                />
                <InputField
                  register={register("email")}
                  label="E-mail"
                  additionalInfo={{
                    message: errors.email?.message,
                    type: "error",
                  }}
                />
                <InputField
                  register={register("password")}
                  label="Password"
                  secureTextEntry
                  additionalInfo={{
                    message: errors.password?.message,
                    type: "error",
                  }}
                />
              </S.FieldsContainer>
              <S.ButtonsContainer>
                <Button>Register</Button>
              </S.ButtonsContainer>
            </S.Form>
          )}
          {success && (
            <S.RegisterSuccess
              key="success"
              animate={{
                opacity: 1,
                y: 0,
              }}
              initial={{
                opacity: 0,
                y: 20,
              }}
            >
              <h1>Usuário registrado com sucesso!</h1>
              <p>Você será redirecionado para dentro do app. :)</p>
            </S.RegisterSuccess>
          )}
        </AnimatePresence>
      </S.RegisterCard>
    </S.Page>
  );
};

export default Register;
