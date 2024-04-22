"use client";

import * as S from "./styles";
import InputField from "@components/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@components/Button";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TLogin, zLogin } from "@schemas/account";

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
      <S.FormContainer>
        <h1>Login</h1>
        <S.Form onSubmit={handleSubmit(onLogin)}>
          <S.FieldsContainer>
            <InputField
              label={{
                value: "Email",
              }}
              {...register("email")}
              additionalInfo={{
                message: errors.email?.message,
                type: "error",
              }}
            />
            <InputField
              label={{
                value: "Senha",
              }}
              {...register("password")}
              secureTextEntry
              additionalInfo={{
                message: errors.password?.message,
                type: "error",
              }}
            />
          </S.FieldsContainer>
          <S.ButtonsContainer>
            <Button type="submit">Acessar</Button>
            <S.RegisterCallout>
              Ainda não possui uma conta?{" "}
              <S.RegisterLink href="/register">Registre-se</S.RegisterLink>.
            </S.RegisterCallout>
          </S.ButtonsContainer>
        </S.Form>
      </S.FormContainer>
    </S.Page>
  );
};

export default Login;
