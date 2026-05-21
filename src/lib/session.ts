import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  MAX_AGE_SEC,
  makeCookieValue,
  verifyCookie,
} from "@/lib/auth";

export async function createSession() {
  const value = await makeCookieValue();
  const c = await cookies();
  c.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
    path: "/",
  });
}

export async function destroySession() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  return verifyCookie(c.get(COOKIE_NAME)?.value);
}
