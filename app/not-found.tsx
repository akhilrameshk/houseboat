import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 12 }}>
      <Typography variant="h1" fontWeight={800} gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" size="large" sx={{ mt: 2, bgcolor: "#006C9C" }}>
          Back to Home
        </Button>
      </Link>
    </Container>
  );
}