import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AdminRoot() {
  if (await isAuthenticated()) {
    redirect("/admin/content");
  }
  redirect("/admin/login");
}
