"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { api } from "@/lib/api";

interface Props {
  url: string;
  label?: string;
  confirmText?: string;
}

export default function DeleteButton({ url, label = "Delete", confirmText = "Delete this item? This cannot be undone." }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const run = async () => {
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    try {
      await api(url, { method: "DELETE" });
      router.refresh();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };
  return <Button color="error" size="small" onClick={run} disabled={busy}>{label}</Button>;
}
