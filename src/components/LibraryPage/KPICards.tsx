import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { KPI } from "@/types";

interface KPICardProps {
  kpi: KPI;
}

const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display={"flex"} flexDirection={"row"}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            width={"30%"}
            sx={{ bgcolor: "rgba(0,0,0,0.04)", borderRadius: "5px" }}
          >
            <PieChartIcon
              sx={{
                mr: 1,
                color: "action.active",
                fontSize: "100px",
              }}
            />
          </Box>
          <Box sx={{ p: 2, pt: 0 }}>
            <Typography variant="h6" component="div">
              {kpi.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {kpi.description.length > 100
                ? `${kpi.description.substring(0, 100)}...`
                : kpi.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(kpi.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KPICard;
