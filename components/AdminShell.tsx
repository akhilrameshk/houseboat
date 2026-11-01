"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "@/components/Logo";
import { api } from "@/lib/api";

const ITEMS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Dashboard", href: "/admin", icon: <DashboardIcon /> },
  { label: "Boats", href: "/admin/boats", icon: <DirectionsBoatIcon /> },
  { label: "Gallery", href: "/admin/gallery", icon: <PhotoLibraryIcon /> },
  { label: "Settings", href: "/admin/settings", icon: <SettingsIcon /> },
];
const W = 240;

export default function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const active = (h: string) => (h === "/admin" ? path === "/admin" : path.startsWith(h));

  const logout = async () => {
    await api("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const nav = (
    <Box sx={{ width: W, height: "100%", bgcolor: "#04385B", color: "#CFE3EA", display: "flex", flexDirection: "column", p: 1.5 }}>
      <Box sx={{ borderRadius: 2, p: 1, mb: 1, display: "inline-block", alignSelf: "flex-start" }}>
        <Logo height={50} />
      </Box>
      <Typography sx={{ fontSize: 11, letterSpacing: ".2em", fontWeight: 700, color: "#81C8D7", mb: 2, px: 0.5 }}>ADMIN PANEL</Typography>
      <List sx={{ flex: 1 }}>
        {ITEMS.map((i) => (
          <ListItemButton key={i.href} component={Link} href={i.href} selected={active(i.href)} onClick={() => setOpen(false)} sx={{ borderRadius: 2, mb: 0.5, color: "inherit", "&.Mui-selected": { bgcolor: "primary.main", color: "#fff" }, "&.Mui-selected:hover": { bgcolor: "primary.main" } }}>
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>{i.icon}</ListItemIcon>
            <ListItemText primary={i.label} />
          </ListItemButton>
        ))}
      </List>
      <Button onClick={logout} startIcon={<LogoutIcon />} sx={{ color: "#CFE3EA", justifyContent: "flex-start" }}>Log out</Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ display: { xs: "none", md: "block" }, width: W, flexShrink: 0 }}>
        <Box sx={{ position: "fixed", top: 0, bottom: 0, width: W }}>{nav}</Box>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)} sx={{ display: { md: "none" } }}>{nav}</Drawer>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <AppBar position="sticky" color="inherit" elevation={0} sx={{ display: { md: "none" }, borderBottom: "1px solid #E7E1D3" }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setOpen(true)} aria-label="Open menu"><MenuIcon /></IconButton>
            <Typography fontWeight={700} sx={{ ml: 1 }}>Admin</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
