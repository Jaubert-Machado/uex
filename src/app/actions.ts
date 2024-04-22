"use server";

import { db } from "../database";
import { users } from "../database/schema";
import { errorHandler } from "../utils/error";
import bcrypt from "bcrypt";

import { cookies } from "next/headers";
import { encrypt } from "../utils/session";
import { TLogin } from "@schemas/account";

export async function login(data: TLogin) {
  try {
    const res = (await db.select().from(users)).find(
      (user) => user.email === data.email
    );

    if (!res) {
      throw new Error("UNAUTHORIZED");
    }

    const { password, ...rest } = res;

    const match = await bcrypt.compare(data.password, password);

    if (!match) {
      throw new Error("UNAUTHORIZED");
    }

    const coockieExpire = new Date(Date.now() + 60 * 60 * 1000);

    const session = await encrypt({ ...rest, coockieExpire });

    cookies().set("session", session, {
      expires: coockieExpire,
      sameSite: "strict",
      httpOnly: true,
    });

    return {
      ok: true,
      message: "logged in",
    };
  } catch (error) {
    return errorHandler(error);
  }
}
