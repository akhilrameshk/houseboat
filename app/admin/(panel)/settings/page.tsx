import { Stack, Typography } from "@mui/material";
import SettingsForm from "@/components/SettingsForm";
import { getSettings } from "@/lib/settings";

export default async function AdminSettings() {
  const settings = await getSettings();
  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">Settings</Typography>
      <SettingsForm initial={settings} />
    </Stack>
  );
}
