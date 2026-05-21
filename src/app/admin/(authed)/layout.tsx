import Link from "next/link";
import { redirect } from "next/navigation";
import { destroySession, isAuthenticated } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  async function logout() {
    "use server";
    await destroySession();
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 flex-col gap-4 border-r border-dl-navy/30 bg-dl-slate p-6">
        <div className="font-syne text-lg font-bold text-dl-warm-white">
          Admin
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin/content"
            className="rounded-md px-3 py-2 font-inter text-sm text-dl-muted transition-colors hover:bg-white/5 hover:text-dl-orange"
          >
            Content
          </Link>
          <Link
            href="/admin/projects"
            className="rounded-md px-3 py-2 font-inter text-sm text-dl-muted transition-colors hover:bg-white/5 hover:text-dl-orange"
          >
            Projects
          </Link>
          <Link
            href="/"
            target="_blank"
            className="rounded-md px-3 py-2 font-inter text-sm text-dl-muted transition-colors hover:bg-white/5 hover:text-dl-orange"
          >
            View site ↗
          </Link>
        </nav>
        <form action={logout} className="mt-auto">
          <button
            type="submit"
            className="font-inter text-sm text-dl-muted transition-colors hover:text-dl-orange"
          >
            Logout
          </button>
        </form>
      </aside>
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
