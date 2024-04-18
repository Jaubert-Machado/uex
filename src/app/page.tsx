"use client";

import Card from "@components/Card";
import * as S from "./styles";
import InputField from "@components/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TLogin, zLogin } from "@schemas/login";
import Button from "@components/Button";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(zLogin),
  });

  function onLogin(data: TLogin) {
    console.log(data);
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
