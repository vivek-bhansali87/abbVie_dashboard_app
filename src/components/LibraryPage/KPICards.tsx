import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { KPI } from "@/types";

interface KPICardProps {
  kpi: KPI;
}

const KPICard: React.FC<KPICardProps> = ({ kpi }) => {
  return (
    <Card sx={{ width: 300, height: 200 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {kpi.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {kpi.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KPICard;
