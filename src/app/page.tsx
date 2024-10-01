"use client";
import React, { useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import AssumptionsModal from "@/components/AssumptionModal";

const users = [
  {
    id: "832762d4-a368-4c7e-ad6e-3ba9ac2a5867",
    name: "John Doe",
    role: "Viewer",
  },
  {
    id: "1d3838a9-5e16-4499-81bc-7d18f56ee182",
    name: "Jane Smith",
    role: "Editor",
  },
];

export default function HomePage() {
  const router = useRouter();
  const [assumptionsModalOpen, setAssumptionsModalOpen] = useState(false);

  const handleUserSelect = (user: (typeof users)[0]) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/library");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Choose a User
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          {users.map((user) => (
            <Button
              key={user.id}
              variant="contained"
              color="primary"
              onClick={() => handleUserSelect(user)}
            >
              {user.name} ({user.role})
            </Button>
          ))}
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setAssumptionsModalOpen(true)}
        >
          Show Assumptions
        </Button>
        <AssumptionsModal
          open={assumptionsModalOpen}
          onClose={() => setAssumptionsModalOpen(false)}
        />
      </Box>
    </Container>
  );
}
