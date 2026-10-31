"use client";

import { useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form State
  const [name, setName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [adults, setAdults] = useState("2");
  const [childrenAbove5, setChildrenAbove5] = useState("0");
  const [childrenBelow5, setChildrenBelow5] = useState("0");
  const [rooms, setRooms] = useState("1");
  const [tripType, setTripType] = useState<
    "Day Trip ( 11AM-5PM )" | "Overnight ( 12PM-9AM )"
  >("Overnight ( 12PM-9AM )");

  const isHouseboat = boat.type?.toLowerCase() === "houseboat";
  const imagesList =
    boat.images && boat.images.length > 0
      ? boat.images
      : [{ url: "/hero.webp", alt: boat.name }];
  const mainImgUrl = imagesList[0]?.url || "/hero.webp";

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + imagesList.length) % imagesList.length
    );
  };

  const handleSendWhatsApp = () => {
    const message = `Welcome to ⛵ ${siteName} ⛵

For houseboat related query, please send below details so that we can provide you better assistance.

Your Name : ${name || "N/A"}
Arrival date : ${arrivalDate || "N/A"}
Number of Adults : ${adults}
Children above 5 years : ${childrenAbove5}
Children below 5 years : ${childrenBelow5}
How many Rooms : ${isHouseboat ? rooms : "N/A"}
Trip Type : ${tripType}

Please send your Houseboat Requirements, for best service & Rate`;

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
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#ffffff",
          borderColor: "#EAEAEA",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 180,
            minHeight: 180,
            bgcolor: "#EAEAEA",
            cursor: "pointer",
          }}
          onClick={() => {
            setActiveImageIndex(0);
            setOpenDetails(true);
          }}
        >
          <Image
            src={"/hero.webp"}
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
              top: 10,
              left: 10,
              zIndex: 2,
              bgcolor: "rgba(4, 40, 66, 0.85)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 11,
            }}
          />
        </Box>

        <CardContent
          sx={{
            p: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            color="#042842"
            sx={{
              fontSize: 16,
              mb: 0.5,
              lineHeight: 1.2,
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontSize: 12.5, flexGrow: 1 }}
          >
            {boat.capacity}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
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
                fontWeight: 600,
                fontSize: 12,
                py: 0.8,
                "&:hover": { borderColor: "#006C9C" },
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
                fontWeight: 600,
                fontSize: 12,
                py: 0.8,
                "&:hover": { bgcolor: "#008F4C" },
              }}
            >
              Enquire
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ----------------- 1. DETAILS POPUP MODAL ----------------- */}
      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontWeight: 700,
            color: "#042842",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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

        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 220, sm: 300 },
              borderRadius: 2,
              overflow: "hidden",
              mb: 2.5,
              bgcolor: "#000",
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
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {imagesList.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      sx={{
                        width: activeImageIndex === idx ? 12 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          activeImageIndex === idx
                            ? "#00A859"
                            : "rgba(255,255,255,0.6)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Stack>
              </>
            )}
          </Box>

          <Stack spacing={2}>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "#006C9C", mb: 0.5 }}
              >
                <DirectionsBoatIcon fontSize="small" />
                <Typography fontWeight={700} fontSize={16}>
                  Boat Specifications
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{ mb: 1 }}
              >
                {boat.description ||
                  "Experience the serene backwaters of Alleppey onboard our well-equipped luxury boat."}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label={`Category: ${typeName}`} size="small" variant="outlined" />
                <Chip label={`Capacity: ${boat.capacity}`} size="small" variant="outlined" />
                {boat.duration && (
                  <Chip label={`Duration: ${boat.duration}`} size="small" variant="outlined" />
                )}
                {boat.routeTo && (
                  <Chip label={`Route: ${boat.routeTo}`} size="small" variant="outlined" />
                )}
              </Stack>
            </Box>

            <Divider />

            <Box
              sx={{
                bgcolor: "#F8F9FA",
                p: 2,
                borderRadius: 2,
                border: "1px solid #EAEAEA",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "#00A859", mb: 1 }}
              >
                <RestaurantMenuIcon fontSize="small" />
                <Typography fontWeight={700} fontSize={16}>
                  Authentic Keralan Cuisine Included
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 13, lineHeight: 1.6 }}
              >
                • <strong>Welcome Drink:</strong> Fresh Tender Coconut or Season Juice.<br />
                • <strong>Lunch:</strong> Kerala Matta Rice, Karimeen Fry (Pearl Spot), Chicken Curry, Parippu, Sambar, Thoran, Mezhukkupuratti, Salad, Pappadam & Payasam.<br />
                • <strong>Evening Snacks:</strong> Banana Fritters (Pazham Pori) / Tea & Coffee.<br />
                • <strong>Dinner (Overnight):</strong> Chappathi, Kerala Chicken Roast, Dal Curry, Rice & Salads.<br />
                • <strong>Breakfast:</strong> Traditional Puttu & Kadala Curry or Idli & Sambar.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
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
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#008F4C" },
            }}
          >
            Enquire Now on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>

      {/* ----------------- 2. ENQUIRY POPUP MODAL ----------------- */}
      <Dialog
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, color: "#042842" }}>
          Enquire for {boat.name}
          <IconButton
            aria-label="close"
            onClick={() => setOpenEnquiry(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Your Name"
              fullWidth
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Arrival Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
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
              />
              <TextField
                label="Kids (>5 yrs)"
                type="number"
                fullWidth
                size="small"
                inputProps={{ min: 0 }}
                value={childrenAbove5}
                onChange={(e) => setChildrenAbove5(e.target.value)}
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
                />
              )}
            </Stack>

            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ fontSize: 13, fontWeight: 600, color: "#042842" }}
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
                  control={<Radio size="small" />}
                  label="Day Trip (11AM - 5PM)"
                />
                <FormControlLabel
                  value="Overnight ( 12PM-9AM )"
                  control={<Radio size="small" />}
                  label="Overnight Stay (12PM - 9AM)"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSendWhatsApp}
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: "#00A859",
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#008F4C" },
            }}
          >
            Send Requirement on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}