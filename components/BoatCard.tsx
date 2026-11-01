"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import GroupIcon from "@mui/icons-material/Group";
import type { BoatDTO } from "@/types";

interface Props {
  boat: BoatDTO;
  typeName: string;
  whatsapp: string;
  siteName?: string;
}

export default function BoatCard({
  boat,
  typeName,
  whatsapp,
  siteName = "Alleppey Mermaid Houseboats",
}: Props) {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openFoodModal, setOpenFoodModal] = useState(false);
  const [foodTab, setFoodTab] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form State with current date default
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

  const isHouseboat = boat.type?.toLowerCase() === "house-boat";
  
  const imagesList =
    boat.images && boat.images.length > 0
      ? boat.images.map((img) => ({
          url: typeof img === "string" ? img : img.url || "/hero.webp",
          alt: typeof img === "object" && img.alt ? img.alt : boat.name,
        }))
      : [{ url: "/hero.webp", alt: boat.name }];

  const mainImgUrl = imagesList[0]?.url || "/hero.webp";

  // Auto-slide effect for details modal
  useEffect(() => {
    if (!openDetails || imagesList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [openDetails, imagesList.length]);

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
• *Name:* ${name}
• *Contact Number:* ${phone}

📅 *BOOKING DETAILS*
• *Boat Type:* ${typeName} (${boat.name})
• *Arrival Date:* ${arrivalDate || "N/A"}
• *Trip Package:* ${isHouseboat ? tripType : "Standard Cruise"}
${isHouseboat ? `• *Rooms Required:* ${rooms}` : ""}

👥 *GUEST COUNT*
• *Adults:* ${adults}
• *Children (>5 yrs):* ${childrenAbove5}
• *Children (<5 yrs):* ${childrenBelow5}
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
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#ffffff",
          borderColor: "#EAEAEA",
          transition: "all 0.25s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(4,40,66,0.1)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 190,
            bgcolor: "#EAEAEA",
            cursor: "pointer",
          }}
          onClick={() => {
            setActiveImageIndex(0);
            setOpenDetails(true);
          }}
        >
          <Image
            src={mainImgUrl}
            alt={boat.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <Chip
            label={typeName}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
              bgcolor: "rgba(4, 40, 66, 0.9)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 11.5,
              borderRadius: 2,
            }}
          />
        </Box>

        <CardContent
          sx={{
            p: 2.5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={800}
            color="#042842"
            sx={{
              fontSize: 17,
              mb: 0.5,
              lineHeight: 1.25,
              cursor: "pointer",
              "&:hover": { color: "#006C9C" },
            }}
            onClick={() => {
              setActiveImageIndex(0);
              setOpenDetails(true);
            }}
          >
            {boat.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <GroupIcon sx={{ fontSize: 16, color: "#006C9C" }} />
            <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: 13 }}>
              {boat.capacity}
            </Typography>
          </Stack>

          {/* Food & Liquid Link on Card (Only for Houseboats) */}
          {isHouseboat && (
            <Box
              component="span"
              onClick={() => setOpenFoodModal(true)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                color: "#00A859",
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                mb: 2,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <RestaurantMenuIcon sx={{ fontSize: 15 }} />
              View Food & Menu Details →
            </Box>
          )}

          <Stack direction="row" spacing={1.5} sx={{ mt: "auto" }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => {
                setActiveImageIndex(0);
                setOpenDetails(true);
              }}
              sx={{
                borderColor: "#D0D0D0",
                color: "#2B3A42",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 12.5,
                py: 0.9,
                borderRadius: 2,
                "&:hover": { borderColor: "#006C9C", bgcolor: "rgba(0,108,156,0.02)" },
              }}
            >
              Details
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="success"
              size="small"
              onClick={() => setOpenEnquiry(true)}
              startIcon={<WhatsAppIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                bgcolor: "#00A859",
                textTransform: "none",
                fontWeight: 700,
                fontSize: 12.5,
                py: 0.9,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": { bgcolor: "#008F4C", boxShadow: "none" },
              }}
            >
              Enquire
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ----------------- 1. DETAILS POPUP MODAL (4/5 Image Portion + 1/5 Details Portion) ----------------- */}
      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, maxHeight: "95vh" } }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: 800,
            fontSize: 18,
            color: "#042842",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#F8F9FA",
            borderBottom: "1px solid #EAEAEA",
          }}
        >
          {boat.name}
          <IconButton
            onClick={() => setOpenDetails(false)}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: { xs: 2, md: 2.5 }, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* 4/5 Portion: Large Image Showcase with Auto-Slide */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 360, sm: 460 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "#F0F2F5",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              flexShrink: 0,
            }}
          >
            <Image
              src={imagesList[activeImageIndex]?.url || "/hero.webp"}
              alt={imagesList[activeImageIndex]?.alt || boat.name}
              fill
              style={{ objectFit: "cover" }}
            />

            {imagesList.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "rgba(0,0,0,0.5)",
                    px: 2,
                    py: 0.6,
                    borderRadius: 4,
                  }}
                >
                  {imagesList.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      sx={{
                        width: activeImageIndex === idx ? 16 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          activeImageIndex === idx
                            ? "#00A859"
                            : "rgba(255,255,255,0.7)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Box>

          {/* 1/5 Portion: Name, Description, and Specs */}
          <Stack spacing={1.5}>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "#006C9C", mb: 0.5 }}
              >
                <DirectionsBoatIcon fontSize="small" />
                <Typography fontWeight={700} fontSize={16}>
                  About This Vessel
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5, lineHeight: 1.6, fontSize: 14 }}
              >
                {boat.description ||
                  "Experience the serene backwaters of Alleppey onboard our well-equipped luxury boat with exceptional hospitality."}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={`Category: ${typeName}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                <Chip label={`Capacity: ${boat.capacity}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                {boat.duration && (
                  <Chip label={`Duration: ${boat.duration}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                )}
                {boat.routeTo && (
                  <Chip label={`Route: ${boat.routeTo}`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                )}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, bgcolor: "#F8F9FA" }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => {
              setOpenDetails(false);
              setOpenEnquiry(true);
            }}
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "#00A859",
              py: 1.2,
              fontWeight: 800,
              textTransform: "none",
              borderRadius: 2.5,
              fontSize: 15,
              boxShadow: "none",
              "&:hover": { bgcolor: "#008F4C", boxShadow: "none" },
            }}
          >
            Enquire Now on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      {/* ----------------- 2. FOOD & BEVERAGES TABBED POPUP ----------------- */}
      <Dialog
        open={openFoodModal}
        onClose={() => setOpenFoodModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 3,
            fontWeight: 800,
            fontSize: 19,
            color: "#042842",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#F8F9FA",
            borderBottom: "1px solid #EAEAEA",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <RestaurantMenuIcon sx={{ color: "#00A859" }} />
            <span>Onboard Food & Beverage Menu</span>
          </Stack>
          <IconButton onClick={() => setOpenFoodModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#F8F9FA", px: 3 }}>
          <Tabs
            value={foodTab}
            onChange={(_, val) => setFoodTab(val)}
            indicatorColor="secondary"
            sx={{
              "& .MuiTab-root": { fontWeight: 700, textTransform: "none", fontSize: 15 },
            }}
          >
            <Tab label="Day Trip Menu" />
            <Tab label="Overnight Menu" />
          </Tabs>
        </Box>

        <DialogContent sx={{ p: 3.5 }}>
          {foodTab === 0 ? (
            <Stack spacing={2.5}>
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  🌴 Welcome Drink
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14}>
                  Seasonal Fruit Juice upon boarding.
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  🍛 Traditional Kerala Lunch
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.7 }}>
                  • Kerala Matta Rice & Sambar<br />
                  • Karimeen Fry (Pearl Spot - Special Kerala Fish)<br />
                  • Chicken Curry (Nadan style)<br />
                  • Aviyal & Thoran (Mixed Vegetable sides)<br />
                  • Mezhukkupuratti, Pappadam, Pickle 
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  ☕ Evening Snacks
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14}>
                  Hot tea or coffee served with crispy Banana Fritters (Pazham Pori) or local snacks.
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Stack spacing={2.5}>
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  🥥 Welcome Drink & Lunch
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14}>
                  Seasonal Fruit Juice upon boarding.
                </Typography>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mt: 1.5, mb: 1 }}>
                  🍛 Traditional Kerala Lunch
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14, lineHeight: 1.7 }}>
                  • Kerala Matta Rice & Sambar<br />
                  • Karimeen Fry (Pearl Spot - Special Kerala Fish)<br />
                  • Chicken Curry (Nadan style)<br />
                  • Aviyal & Thoran (Mixed Vegetable sides)<br />
                  • Mezhukkupuratti, Pappadam, Pickle 
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  ☕ Evening Snacks & Tea
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14}>
                  Evening tea/coffee with traditional snacks during sunset anchorage.
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  🌙 Overnight Dinner
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14} sx={{ lineHeight: 1.7 }}>
                  • Soft Chappathis / Appam<br />
                  • Kerala Chicken Roast / Curry/ Veg Curries<br />
                  •  Fresh Salads
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography fontWeight={700} color="#042842" fontSize={16} sx={{ mb: 1 }}>
                  🌅 Morning Breakfast
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={14}>
                  Traditional Kerala Puttu & Kadala Curry or Idli & Sambar with Coffee/Tea.
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, bgcolor: "#F8F9FA" }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => {
              setOpenFoodModal(false);
              setOpenEnquiry(true);
            }}
            startIcon={<WhatsAppIcon />}
            sx={{ bgcolor: "#00A859", py: 1.2, fontWeight: 700, borderRadius: 2 }}
          >
            Enquire With Meals Included
          </Button>
        </DialogActions>
      </Dialog>

      {/* ----------------- 3. ENQUIRY POPUP MODAL (With Customer Phone Number) ----------------- */}
      <Dialog
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        <Box
          sx={{
            bgcolor: "#00A859",
            color: "#fff",
            p: 3,
            position: "relative",
            textAlign: "center",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenEnquiry(false)}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <WhatsAppIcon sx={{ fontSize: 36, mb: 1 }} />
          <Typography variant="h6" fontWeight={800} fontSize={19} sx={{ lineHeight: 1.2 }}>
            Book {boat.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: 13, mt: 0.5 }}>
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
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 600 }}>
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
              helperText={phoneError ? "Please enter your phone number to proceed" : ""}
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
                  sx={{ fontSize: 13.5, fontWeight: 700, color: "#042842", mb: 1 }}
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
            color="success"
            onClick={handleSendWhatsApp}
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "#00A859",
              py: 1.4,
              fontWeight: 800,
              textTransform: "none",
              borderRadius: 2.5,
              fontSize: 15,
              boxShadow: "0 4px 14px rgba(0, 168, 89, 0.35)",
              "&:hover": { bgcolor: "#008F4C", boxShadow: "0 6px 20px rgba(0, 168, 89, 0.45)" },
            }}
          >
            Send Requirement on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}