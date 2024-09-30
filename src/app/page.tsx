import Link from "next/link";
import { Button, Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Welcome to KPI Dashboard
      </Typography>
      <Link href="/library" passHref legacyBehavior>
        <Button variant="contained" color="primary" component="a">
          Go to Library Page
        </Button>
      </Link>
    </Box>
  );
}
