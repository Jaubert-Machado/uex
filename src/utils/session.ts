import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function encrypt(data: any) {
  const key = new TextEncoder().encode(process.env.SECRET_KEY);

  return await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(data: string): Promise<JWTPayload> {
  const key = new TextEncoder().encode(process.env.SECRET_KEY);

  const { payload } = await jwtVerify(data, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function keepCookieAlive(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) return;

  const parsed = await decrypt(session);
  parsed.exp = Number(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();

  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.exp,
    httpOnly: true,
  });

  return res;
}

export async function getSession() {
  const session = cookies().get("session")?.value;

  if (!session) return null;

  return await decrypt(session);
}

export async function logout() {
  cookies().delete("session");
}
