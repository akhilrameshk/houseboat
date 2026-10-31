"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import ImageUploader from "@/components/ImageUploader";
import { api } from "@/lib/api";
import type { SettingsDTO } from "@/types";

interface Msg {
  type: "success" | "error";
  text: string;
}

export default function SettingsForm({ initial }: { initial: SettingsDTO }) {
  const [f, setF] = useState<SettingsDTO>(initial);
  const [msg, setMsg] = useState<Msg | null>(null);
  const [pw, setPw] = useState({ current: "", next: "" });
  const [pwMsg, setPwMsg] = useState<Msg | null>(null);
  const set = (k: keyof SettingsDTO) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api("/api/settings", { method: "PUT", body: f });
      setMsg({ type: "success", text: "Settings saved" });
    } catch (err) {
      setMsg({ type: "error", text: err instanceof Error ? err.message : "Could not save" });
    }
  };

  const changePw = async (e: FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    try {
      await api("/api/auth/password", { method: "PUT", body: pw });
      setPw({ current: "", next: "" });
      setPwMsg({ type: "success", text: "Password changed" });
    } catch (err) {
      setPwMsg({ type: "error", text: err instanceof Error ? err.message : "Could not change password" });
    }
  };

  const grid = { display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 } as const;

  return (
    <Stack spacing={3} sx={{ maxWidth: 860 }}>
      <Paper component="form" onSubmit={save} variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
        <Stack spacing={2.5}>
          <Typography variant="h6">Contact and WhatsApp</Typography>
          {msg && <Alert severity={msg.type}>{msg.text}</Alert>}
          <Box sx={grid}>
            <TextField label="WhatsApp number (digits with country code)" value={f.whatsappNumber} onChange={set("whatsappNumber")} helperText="Example: 919876543210. Enquiries go here." />
            <TextField label="Call number (digits with country code)" value={f.callNumber} onChange={set("callNumber")} helperText="Leave empty to use the WhatsApp number" />
            <TextField label="Email" value={f.email} onChange={set("email")} />
            <TextField label="Address" value={f.address} onChange={set("address")} />
          </Box>
          <Typography variant="h6">Google links</Typography>
          <Box sx={grid}>
            <TextField label="Google review link" value={f.googleReviewUrl} onChange={set("googleReviewUrl")} helperText="https://g.page/r/.../review" />
            <TextField label="Google Maps embed link" value={f.googleMapsUrl} onChange={set("googleMapsUrl")} helperText="Google Maps → Share → Embed a map (the src URL)" />
            <TextField label="Google Search Console verification code" value={f.googleVerification} onChange={set("googleVerification")} helperText="Only the content value of the google-site-verification tag" />
          </Box>
          <Typography variant="h6">Search engine (SEO)</Typography>
          <Box sx={grid}>
            <TextField label="Latitude" value={f.latitude} onChange={set("latitude")} helperText="Of your office or jetty, e.g. 9.4981" />
            <TextField label="Longitude" value={f.longitude} onChange={set("longitude")} helperText="e.g. 76.3388" />
          </Box>
          <TextField label="Extra keywords (comma separated)" value={f.extraKeywords} onChange={set("extraKeywords")} multiline minRows={2} helperText="Added to meta keywords and structured data, e.g. alleppey houseboat near me, punnamada houseboat" />
          <Typography variant="h6">Social profiles</Typography>
          <Box sx={grid}>
            <TextField label="Instagram URL" value={f.instagramUrl} onChange={set("instagramUrl")} />
            <TextField label="Facebook URL" value={f.facebookUrl} onChange={set("facebookUrl")} />
            <TextField label="YouTube URL" value={f.youtubeUrl} onChange={set("youtubeUrl")} />
            <TextField label="Tripadvisor URL" value={f.tripadvisorUrl} onChange={set("tripadvisorUrl")} />
          </Box>
          <Typography variant="h6">Website</Typography>
          <TextField label="Site name" value={f.siteName} onChange={set("siteName")} />
          <TextField label="Footer text" value={f.footerText} onChange={set("footerText")} multiline minRows={2} />
          <Box>
            <Typography fontWeight={700} sx={{ mb: 1 }}>Home page hero photo</Typography>
            <ImageUploader 
              images={f.heroImage ? [{ url: f.heroImage, publicId: "", width: 0, height: 0, alt: "Hero Photo" }] : []} 
              onChange={(a) => setF({ ...f, heroImage: a[0]?.url ?? "" })} 
              label="Upload hero photo" 
            />
          </Box>
          <Box><Button type="submit" variant="contained">Save settings</Button></Box>
        </Stack>
      </Paper>

      <Paper component="form" onSubmit={changePw} variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Admin account</Typography>
          {pwMsg && <Alert severity={pwMsg.type}>{pwMsg.text}</Alert>}
          <Box sx={grid}>
            <TextField label="Current password" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" />
            <TextField label="New password (10+ characters)" type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
          </Box>
          <Box><Button type="submit" variant="outlined">Change password</Button></Box>
        </Stack>
      </Paper>
    </Stack>
  );
}