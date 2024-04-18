import { z } from "zod";

export const zRegister = z.object({
  name: z.string().min(1, "Insira seu nome."),
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(1, "Insira sua senha."),
});

export type TRegister = z.infer<typeof zRegister>;
