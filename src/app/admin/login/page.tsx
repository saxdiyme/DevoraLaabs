import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth";
import { createSession, isAuthenticated } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin/content");
  const params = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const pw = String(formData.get("password") ?? "");
    if (!verifyPassword(pw)) redirect("/admin/login?error=1");
    await createSession();
    redirect("/admin/content");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        action={login}
        className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-dl-navy/30 bg-dl-slate p-8"
      >
        <h1 className="font-syne text-xl font-bold text-dl-warm-white">
          Admin Login
        </h1>
        {params.error && (
          <p className="font-inter text-sm text-red-400">Invalid password</p>
        )}
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="Password"
          className="rounded-lg border border-dl-navy/40 bg-dl-deep px-4 py-3 font-inter text-sm text-dl-warm-white placeholder:text-dl-muted focus:border-dl-orange focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-dl-orange px-5 py-3 font-inter font-semibold text-dl-deep transition-colors hover:bg-dl-peach"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
