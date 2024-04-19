import { NextRequest, NextResponse } from "next/server";
import { getSession, keepCookieAlive } from "./utils/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const URL = request.nextUrl.pathname;

  if (!session && URL === "/home") {
    const LOGIN_PATH = request.nextUrl.clone();
    LOGIN_PATH.pathname = "/";

    return NextResponse.redirect(LOGIN_PATH);
  }

  if ((session && URL === "/") || (session && URL === "/register")) {
    const HOME_PATH = request.nextUrl.clone();
    HOME_PATH.pathname = "/home";

    return NextResponse.redirect(HOME_PATH);
  }

  return await keepCookieAlive(request);
}
