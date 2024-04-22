"use client";

import React, { useState } from "react";
import * as S from "./styles";
import InputField from "@components/InputField";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import { TRegister, zRegister } from "@schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "./actions";
import { AnimatePresence, Variants } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { login } from "../actions";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";

const FORM_VARIANTS: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const REGISTER_SUCCESS_VARIANTS: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const Register = () => {
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const router = useRouter();

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
    login(data);

    setTimeout(() => {
      router.replace("/home");
    }, 2000);
  }

  return (
    <S.Page>
      <S.FormContainer>
        <S.CardHeader>
          <h1>Cadastro</h1>
          <S.BackButton
            whileHover={{
              backgroundColor: theme.colors.container.primaryLight,
            }}
            href="/"
          >
            <BsArrowLeft size={24} />
          </S.BackButton>
        </S.CardHeader>
        <AnimatePresence mode="wait">
          {!success && (
            <S.Form
              key="form"
              variants={FORM_VARIANTS}
              exit="hidden"
              initial="visible"
              onSubmit={handleSubmit(onRegister)}
            >
              <S.FieldsContainer>
                <InputField
                  {...register("name")}
                  label={{ value: "Nome" }}
                  additionalInfo={{
                    message: errors.name?.message,
                    type: "error",
                  }}
                />
                <InputField
                  {...register("email")}
                  label={{
                    value: "E-mail",
                  }}
                  additionalInfo={{
                    message: errors.email?.message,
                    type: "error",
                  }}
                />
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
              </S.FieldsContainer>
              <S.ButtonsContainer>
                <Button>Cadastrar</Button>
              </S.ButtonsContainer>
            </S.Form>
          )}
          {success && (
            <S.RegisterSuccess
              key="success"
              variants={REGISTER_SUCCESS_VARIANTS}
              initial="initial"
              animate="animate"
            >
              <h1>Usuário registrado com sucesso!</h1>
              <p>Você será redirecionado para dentro do app. :)</p>
            </S.RegisterSuccess>
          )}
        </AnimatePresence>
      </S.FormContainer>
    </S.Page>
  );
};

export default Register;
