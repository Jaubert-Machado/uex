import { z } from "zod";

export const zLogin = z.object({
  email: z.string().email("Insira um e-mail válido."),
  password: z.string().min(1, "Insira sua senha."),
});

export type Login = z.infer<typeof zLogin>;
