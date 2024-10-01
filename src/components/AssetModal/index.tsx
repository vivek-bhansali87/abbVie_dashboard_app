import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Grid2,
  Button,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GridViewIcon from "@mui/icons-material/GridView";
import LinkIcon from "@mui/icons-material/Link";
import { KPI } from "@/types";

interface AssetModalProps {
  kpi: KPI;
  onClose: () => void;
  open: boolean;
  onFavorite: () => void;
  isFavorite: boolean;
}

const AssetModal: React.FC<AssetModalProps> = ({
  kpi,
  onClose,
  onFavorite,
  open,
  isFavorite,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopyLink = (kpiId: string) => {
    const link = `https://localhost:3000/api/kpi/${kpiId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setSnackbarMessage("Link copied to clipboard");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error while copying link. erorr details: ", error);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ padding: 1 }}
    >
      <DialogTitle>
        <Box display={"flex"} justifyContent={"end"}>
          <IconButton onClick={() => handleCopyLink(kpi.id)}>
            <LinkIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={"column"}
        >
          <Box display="flex" alignItems="center">
            <GridViewIcon sx={{ mr: 1 }} />
          </Box>
          <Typography variant="h3">INTES</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {kpi.name}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={2} display={"flex"} justifyContent={"center"}>
          <Typography variant="body1">
            {kpi.description} Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Sit maiores modi reprehenderit, nisi itaque minima
            quas nemo nulla beatae blanditiis voluptatum cum fugit totam enim
            fugiat obcaecati eius explicabo molestiae?
          </Typography>
        </Box>
        <Box
          mb={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {["comms", "coverage", "stakeholders"].map((tag) => (
            <Chip key={tag} label={`#${tag}`} sx={{ mr: 1 }} />
          ))}
        </Box>
        <Grid2 container spacing={2} sx={{ mb: 2 }} textAlign={"center"}>
          <Grid2 size={{ xs: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Used
            </Typography>
            <Typography variant="body1">2485</Typography>
          </Grid2>
          <Grid2 size={{ xs: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Type
            </Typography>
            <Typography variant="body1">Universal</Typography>
          </Grid2>
          <Grid2 size={{ xs: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Pages No.
            </Typography>
            <Typography variant="body1">6</Typography>
          </Grid2>
          <Grid2 size={{ xs: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Last Updated
            </Typography>
            <Typography variant="body1">
              {new Date(kpi.updatedAt).toLocaleDateString()}
            </Typography>
          </Grid2>
        </Grid2>
        <Typography variant="h6" gutterBottom>
          Business Questions
        </Typography>
        <Grid2 container spacing={2}>
          {kpi.businessQuestions.map((question: string, index: number) => (
            <Grid2 size={{ xs: 6 }} key={index}>
              <Box bgcolor="action.hover" p={2} borderRadius={1}>
                <Typography variant="subtitle1">
                  Question {index + 1}
                </Typography>
                <Typography variant="body2">{question}</Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
        <Box mt={2}>
          <Button
            variant="contained"
            color={isFavorite ? "secondary" : "primary"}
            fullWidth
            onClick={onFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Box>
      </DialogContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default AssetModal;
