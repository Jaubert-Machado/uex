"use server";

import { TRegister } from "@schemas/register";
import { db } from "../../database";
import { users } from "../../database/schema";
import bcrypt from "bcrypt";
import { errorHandler } from "../../utils/error";

const SALT_ROUNDS = 10;

export async function registerUser(data: TRegister) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      })
      .execute()
      .catch((error) => {
        throw new Error(error);
      });

    return {
      ok: true,
      message: "User created",
    };
  } catch (error) {
    return errorHandler(error);
  }
}
