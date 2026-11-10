"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import type { BoatDTO } from "@/types";

interface BoatPageData extends BoatDTO {
  typeName?: string;
  whatsapp?: string;
}

export default function HouseboatDetailPage() {
  const router = useRouter();
  const [boat, setBoat] = useState<BoatPageData | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openEnquiry, setOpenEnquiry] = useState(false);

  // Form State
  const todayStr = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(todayStr);
  const [adults, setAdults] = useState("2");
  const [childrenAbove5, setChildrenAbove5] = useState("0");
  const [childrenBelow5, setChildrenBelow5] = useState("0");
  const [rooms, setRooms] = useState("1");
  const [tripType, setTripType] = useState<
    "Day Trip ( 11AM-5PM )" | "Overnight ( 12PM-9AM )"
  >("Overnight ( 12PM-9AM )");

  useEffect(() => {
    const data = sessionStorage.getItem("selectedBoat");
    if (data) {
      setBoat(JSON.parse(data));
    }
  }, []);

  const imagesList =
    boat?.images && boat.images.length > 0
      ? boat.images.map((img) => ({
          url: typeof img === "string" ? img : img.url || "/hero.webp",
          alt: typeof img === "object" && img.alt ? img.alt : boat.name,
        }))
      : [{ url: "/hero.webp", alt: boat?.name || "Houseboat" }];

  // Auto-play slider every 5 seconds with smooth transition
  useEffect(() => {
    if (imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesList.length]);

  if (!boat) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Loading boat details...
        </Typography>
        <Button onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
          Back to list
        </Button>
      </Container>
    );
  }

  const typeName = boat.typeName || boat.type || "Houseboat";
  const whatsapp = boat.whatsapp || "";
  const isHouseboat =
    boat.type?.toLowerCase() === "house-boat" ||
    boat.type?.toLowerCase() === "houseboat";

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + imagesList.length) % imagesList.length
    );
  };

  const handleSendWhatsApp = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!phone.trim()) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!isValid) return;

    const message = `✨ *ALLEPPEY MERMAID HOUSEBOATS* ✨
🌊 _Experience Serene Backwaters in Luxury_ 🧜‍♀️⛵

Hi Team, I would like to inquire about booking a cruise. Here are my trip details:

━━━━━━━━━━━━━━━━━━━
👤 *GUEST INFORMATION*
- *Name:* ${name}
- *Contact Number:* ${phone}

📅 *BOOKING DETAILS*
- *Boat Type:* ${typeName} (${boat.name})
- *Arrival Date:* ${arrivalDate || "N/A"}
- *Trip Package:* ${isHouseboat ? tripType : "Standard Cruise"}
${isHouseboat ? `• *Rooms Required:* ${rooms}` : ""}

👥 *GUEST COUNT*
- *Adults:* ${adults}
- *Children (>5 yrs):* ${childrenAbove5}
- *Children (<5 yrs):* ${childrenBelow5}
━━━━━━━━━━━━━━━━━━━

✨ *Please share the best tariff, available options, and package details for this requirement.*

Thank you! 🧜‍♀️💙`;

    const encodedMsg = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodedMsg}`;
    window.open(waUrl, "_blank");
    setOpenEnquiry(false);
  };

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="sm">
        {/* Navigation Bar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            color: "#042842",
            fontWeight: 700,
            textTransform: "none",
            mb: 2,
          }}
        >
          Back
        </Button>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #EAEAEA",
            bgcolor: "#ffffff",
          }}
        >
          {/* Header Title */}
          <Box
            sx={{
              p: 2.5,
              bgcolor: "#F8F9FA",
              borderBottom: "1px solid #EAEAEA",
            }}
          >
            <Typography variant="h6" fontWeight={800} color="#042842">
              {boat.name}
            </Typography>
          </Box>

          {/* Main Display Body */}
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            {/* Image Slider (80% width on mobile, centered, smooth transition effect) */}
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%" },
                mx: "auto",
                height: { xs:450 },
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#F0F2F5",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                mb: 2.5,
              }}
            >
              {imagesList.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: activeImageIndex === idx ? 1 : 0,
                    transition: "opacity 0.7s ease-in-out, transform 0.7s ease-in-out",
                    transform: activeImageIndex === idx ? "scale(1)" : "scale(1.03)",
                  }}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}

              
            </Box>

            {/* Specifications Section */}
            <Stack spacing={1.5}>
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ color: "#006C9C", mb: 1.5 }}
                >
                  <DirectionsBoatIcon fontSize="small" />
                  <Typography fontWeight={700} fontSize={16}>
                    Vessel Specifications
                  </Typography>
                </Stack>

                {/* Single line layout matching specifications */}
                <Box
                  sx={{
                    bgcolor: "#F8F9FA",
                    p: 1.5,
                    borderRadius: 2.5,
                    border: "1px solid #EAEAEA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: 13,
                    }}
                  >
                    Category:{" "}
                    <Box
                      component="span"
                      sx={{ color: "#042842", fontWeight: 700 }}
                    >
                      {typeName}
                    </Box>
                  </Typography>
                  <Box component="span" sx={{ color: "text.disabled" }}>
                    |
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: 13,
                    }}
                  >
                    Capacity:{" "}
                    <Box
                      component="span"
                      sx={{ color: "#042842", fontWeight: 700 }}
                    >
                      {boat.capacity}
                    </Box>
                  </Typography>
                  {boat.duration && (
                    <>
                      <Box component="span" sx={{ color: "text.disabled" }}>
                        |
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "text.secondary",
                          fontSize: 13,
                        }}
                      >
                        Duration:{" "}
                        <Box
                          component="span"
                          sx={{ color: "#042842", fontWeight: 700 }}
                        >
                          {boat.duration}
                        </Box>
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Stack>

            {/* Action Button */}
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpenEnquiry(true)}
                startIcon={<WhatsAppIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #00A859 0%, #008F4C 100%)",
                  py: 1.4,
                  fontWeight: 800,
                  textTransform: "none",
                  borderRadius: 2.5,
                  fontSize: 15,
                  boxShadow: "0 4px 14px rgba(0, 168, 89, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #008F4C 0%, #00753E 100%)",
                  },
                }}
              >
                Enquire Now on WhatsApp
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Enquiry Modal */}
      <Dialog
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #00A859 0%, #008F4C 100%)",
            color: "#fff",
            p: 3,
            position: "relative",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => setOpenEnquiry(false)}
            sx={{ position: "absolute", right: 12, top: 12, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          <WhatsAppIcon sx={{ fontSize: 36, mb: 1 }} />
          <Typography
            variant="h6"
            fontWeight={800}
            fontSize={19}
            sx={{ lineHeight: 1.2 }}
          >
            Book {boat.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, fontSize: 13, mt: 0.5 }}
          >
            Fill details to instantly connect via WhatsApp
          </Typography>
        </Box>

        <DialogContent dividers sx={{ p: 3 }}>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <Box
              sx={{
                bgcolor: "#F0F8F5",
                border: "1px dashed #00A859",
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <WhatsAppIcon sx={{ color: "#00A859", fontSize: 22 }} />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ fontWeight: 600 }}
                >
                  Direct WhatsApp Support Number:
                </Typography>
                <Typography variant="body2" fontWeight={700} color="#042842">
                  {whatsapp}
                </Typography>
              </Box>
            </Box>

            <TextField
              label="Your Name *"
              fullWidth
              size="small"
              value={name}
              error={nameError}
              helperText={nameError ? "Please enter your name to proceed" : ""}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError(false);
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Phone Number *"
              fullWidth
              size="small"
              type="tel"
              value={phone}
              error={phoneError}
              helperText={
                phoneError ? "Please enter your phone number to proceed" : ""
              }
              onChange={(e) => {
                setPhone(e.target.value);
                if (e.target.value.trim()) setPhoneError(false);
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Arrival Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Adults"
                type="number"
                fullWidth
                size="small"
                inputProps={{ min: 1 }}
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Kids (>5 yrs)"
                type="number"
                fullWidth
                size="small"
                inputProps={{ min: 0 }}
                value={childrenAbove5}
                onChange={(e) => setChildrenAbove5(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Kids (<5 yrs)"
                type="number"
                fullWidth
                size="small"
                inputProps={{ min: 0 }}
                value={childrenBelow5}
                onChange={(e) => setChildrenBelow5(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              {isHouseboat && (
                <TextField
                  label="Number of Rooms"
                  type="number"
                  fullWidth
                  size="small"
                  inputProps={{ min: 1 }}
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              )}
            </Stack>

            {isHouseboat && (
              <FormControl component="fieldset" sx={{ mt: 1 }}>
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: "#042842",
                    mb: 1,
                  }}
                >
                  Trip Type
                </FormLabel>
                <RadioGroup
                  value={tripType}
                  onChange={(e) =>
                    setTripType(
                      e.target.value as
                        | "Day Trip ( 11AM-5PM )"
                        | "Overnight ( 12PM-9AM )"
                    )
                  }
                >
                  <FormControlLabel
                    value="Day Trip ( 11AM-5PM )"
                    control={<Radio size="small" color="success" />}
                    label="Day Trip (11AM - 5PM)"
                  />
                  <FormControlLabel
                    value="Overnight ( 12PM-9AM )"
                    control={<Radio size="small" color="success" />}
                    label="Overnight Stay (12PM - 9AM)"
                  />
                </RadioGroup>
              </FormControl>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, bgcolor: "#F8F9FA" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSendWhatsApp}
            startIcon={<WhatsAppIcon />}
            sx={{
              background: "linear-gradient(135deg, #00A859 0%, #008F4C 100%)",
              py: 1.4,
              fontWeight: 800,
              textTransform: "none",
              borderRadius: 2.5,
              fontSize: 15,
              boxShadow: "0 4px 14px rgba(0, 168, 89, 0.35)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #008F4C 0%, #00753E 100%)",
                boxShadow: "0 6px 20px rgba(0, 168, 89, 0.45)",
              },
            }}
          >
            Send Requirement on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}