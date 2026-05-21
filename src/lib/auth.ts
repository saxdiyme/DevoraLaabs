export const COOKIE_NAME = "admin_session";
export const MAX_AGE_SEC = 60 * 60 * 24 * 7;

async function sign(value: string): Promise<string> {
  const secret = process.env.AUTH_SECRET ?? "dev-secret-change-me";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function makeCookieValue(): Promise<string> {
  const issued = Date.now().toString();
  const sig = await sign(issued);
  return `${issued}.${sig}`;
}

export async function verifyCookie(val: string | undefined): Promise<boolean> {
  if (!val) return false;
  const [issued, sig] = val.split(".");
  if (!issued || !sig) return false;
  const expected = await sign(issued);
  if (expected !== sig) return false;
  const ageMs = Date.now() - Number(issued);
  return ageMs > 0 && ageMs < MAX_AGE_SEC * 1000;
}
