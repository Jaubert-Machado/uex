"use client";

import * as S from "./styles";
import InputField from "@components/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLogin, zLogin } from "@schemas/login";
import Button from "@components/Button";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "../utils/session";
import { cookies } from "next/headers";

export const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLogin>({
    resolver: zodResolver(zLogin),
  });

  useEffect(() => {
    async function checkSession() {}

    checkSession();
  }, [router]);

  async function onLogin(data: TLogin) {
    const res = await login(data);

    if (!res.ok) {
      return setError("password", {
        type: "manual",
        message: "Credenciais invalidas.",
      });
    }

    router.replace("/home");
  }

  return (
    <S.Page>
      <S.LoginCard>
        <h1>Login</h1>
        <S.Form onSubmit={handleSubmit(onLogin)}>
          <S.FieldsContainer>
            <InputField
              label="E-mail"
              register={register("email")}
              additionalInfo={{
                message: errors.email?.message,
                type: "error",
              }}
            />
            <InputField
              label="Senha"
              register={register("password")}
              secureTextEntry
              additionalInfo={{
                message: errors.password?.message,
                type: "error",
              }}
            />
          </S.FieldsContainer>
          <S.ButtonsContainer>
            <S.RegisterCallout>
              Ainda não possui uma conta?{" "}
              <S.RegisterLink href="/register">Registre-se</S.RegisterLink>.
            </S.RegisterCallout>
            <Button type="submit">Entrar</Button>
          </S.ButtonsContainer>
        </S.Form>
      </S.LoginCard>
    </S.Page>
  );
};

export default Login;
