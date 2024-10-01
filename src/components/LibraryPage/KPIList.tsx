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
  SelectChangeEvent,
} from "@mui/material";

import { KPI } from "@/types";
import AssetModal from "../AssetModal";

interface KPIListProps {
  kpis: KPI[];
  favoriteKPIs: string[];
  onToggleFavorite: (kpiId: string) => void;
}

const KPIList: React.FC<KPIListProps> = ({
  kpis,
  favoriteKPIs,
  onToggleFavorite,
}) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  const handleShowMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + itemsPerPage, kpis.length)
    );
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
  };

  const handleKPIClick = (kpi: KPI) => {
    setSelectedKPI(kpi);
  };

  const handleCloseModal = () => {
    setSelectedKPI(null);
  };

  return (
    <Box>
      <Box sx={{ height: "600px", overflow: "auto", mb: 2 }}>
        <Grid2 container spacing={2}>
          {kpis.slice(0, displayCount).map((kpi) => (
            <Grid2 key={kpi.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                onClick={() => handleKPIClick(kpi)}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography variant="h6" component="div">
                      {kpi.name}
                    </Typography>
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
      {selectedKPI && (
        <AssetModal
          kpi={selectedKPI}
          onClose={handleCloseModal}
          onFavorite={() => onToggleFavorite(selectedKPI.id)}
          open={!!selectedKPI}
          isFavorite={favoriteKPIs.includes(selectedKPI.id)}
        />
      )}
    </Box>
  );
};

export default KPIList;
