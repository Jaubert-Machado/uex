import { z } from "zod";
import { cpfValidator } from "../utils/validator";

export const zContact = z.object({
  name: z.string().min(1, "Insira um nome."),
  cpf: cpfValidator,
  phone: z.string().min(1, "Insira um telefone."),
  address: z.string().min(1, "Insira um endereço."),
  district: z.string().min(1, "Insira um bairro."),
  addressNumber: z.string().min(1, "Insira um número."),
  cep: z.string().min(1, "Insira um CEP."),
  state: z.string().min(1, "Insira um estado.").max(2),
  city: z.string().min(1, "Insira uma cidade."),
  addOnAddress: z.string(),
});

export type TContact = z.infer<typeof zContact>;
