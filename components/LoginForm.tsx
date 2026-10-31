"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import Logo from "@/components/Logo";
import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/login", { method: "POST", body: { email, password } });
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setBusy(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, background: "linear-gradient(180deg,#04385B,#0A5C85)" }}>
      <Paper component="form" onSubmit={submit} sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 5,background:"#000000" }}>
        <Stack spacing={2.5} sx={{}}>
          <Box sx={{ alignSelf: "center" }}><Logo height={100} priority /></Box>
          <Typography variant="h5" component="h1" textAlign="center">Admin login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
          <Button type="submit" variant="contained" size="large" disabled={busy}>{busy ? "Signing in..." : "Log in"}</Button>
        </Stack>
      </Paper>
    </Box>
  );
}
