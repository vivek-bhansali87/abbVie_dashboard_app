"use client";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
const users = [
  { id: "user1", name: "John Doe", role: "Viewer" },
  { id: "user2", name: "Jane Smith", role: "Editor" },
];

export default function HomePage() {
  const router = useRouter();

  const handleUserSelect = (user: (typeof users)[0]) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    router.push("/library");
  };
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
      <Typography variant="h4" gutterBottom>
        Choose a User
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {users.map((user) => (
          <Button
            key={user.id}
            variant="contained"
            color="primary"
            component="a"
            onClick={() => handleUserSelect(user)}
          >
            {user.name} ({user.role})
          </Button>
        ))}
      </Box>
    </Box>
  );
}
