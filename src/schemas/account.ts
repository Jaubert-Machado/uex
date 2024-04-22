import { z } from "zod";

export const zLogin = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(1, "Insira sua senha."),
});

export type TLogin = z.infer<typeof zLogin>;

export const zDeleteAccount = z.object({
  password: z.string().min(1, "Insira sua senha."),
});

export type TDeleteAccount = z.infer<typeof zDeleteAccount>;
