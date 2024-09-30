import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid2,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
  SelectChangeEvent,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LinkIcon from "@mui/icons-material/Link";

import { KPI } from "@/types";

interface KPIListProps {
  kpis: KPI[];
  favoriteKPIs: string[];
  onToggleFavorite: (kpiId: string) => void;
}

const KPIList: React.FC<KPIListProps> = ({
  kpis,
  onToggleFavorite,
  favoriteKPIs,
}) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleShowMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + itemsPerPage, kpis.length)
    );
  };

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

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
  };

  return (
    <Box>
      <Box sx={{ height: "600px", overflow: "auto", mb: 2 }}>
        <Grid2 container spacing={2}>
          {kpis.slice(0, displayCount).map((kpi) => (
            <Grid2 key={kpi.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography variant="h6" component="div">
                      {kpi.name}
                    </Typography>
                    <Box>
                      <IconButton onClick={() => onToggleFavorite(kpi.id)}>
                        {favoriteKPIs.includes(kpi.id) ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                      <IconButton onClick={() => handleCopyLink(kpi.id)}>
                        <LinkIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {kpi.description}
                  </Typography>
                  <Typography variant="body2">
                    Access Level: {kpi.accessLevel}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleShowMore}
          disabled={displayCount >= kpis.length}
        >
          Show More
        </Button>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="items-per-page-label">Items per page</InputLabel>
          <Select
            labelId="items-per-page-label"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            label="Items per page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default KPIList;
