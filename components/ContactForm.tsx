"use client";
import { useState, type ChangeEvent } from "react";
import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { waLink } from "@/lib/whatsapp";

interface FormState {
  name: string;
  date: string;
  boat: string;
  message: string;
}

// Nothing is stored: the enquiry is opened as a ready-to-send WhatsApp message.
export default function ContactForm({ whatsapp, boats }: { whatsapp: string; boats: string[] }) {
  const [f, setF] = useState<FormState>({ name: "", date: "", boat: "", message: "" });
  const set = (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const send = () => {
    const lines = [
      "Hello, I would like to make an enquiry.",
      f.name && `Name: ${f.name}`,
      f.boat && `Boat / service: ${f.boat}`,
      f.date && `Preferred date: ${f.date}`,
      f.message && `Message: ${f.message}`,
    ].filter(Boolean);
    window.open(waLink(whatsapp, lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h2">Send an enquiry</Typography>
        <TextField label="Your name" value={f.name} onChange={set("name")} slotProps={{ htmlInput: { maxLength: 80 } }} />
        <TextField select label="Boat / service" value={f.boat} onChange={set("boat")}>
          <MenuItem value="">Not sure yet</MenuItem>
          {boats.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
        </TextField>
        <TextField type="date" label="Preferred date" value={f.date} onChange={set("date")} slotProps={{ inputLabel: { shrink: true } }} />
        <TextField label="Message" value={f.message} onChange={set("message")} multiline minRows={3} slotProps={{ htmlInput: { maxLength: 500 } }} />
        <Button variant="contained" color="success" startIcon={<WhatsAppIcon />} onClick={send}>Send on WhatsApp</Button>
      </Stack>
    </Paper>
  );
}
