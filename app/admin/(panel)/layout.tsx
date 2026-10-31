import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

// Server-side check on every admin page (the proxy is only a first layer).
export default async function PanelLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
