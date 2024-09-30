import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { KPI } from "../../../types";

interface KPIListProps {
  kpis: KPI[];
  onKPISelect: (kpi: KPI) => void;
  favoriteKPIs: string[];
  onToggleFavorite: (kpiId: string) => void;
}

const KPIList: React.FC<KPIListProps> = ({
  kpis,
  onKPISelect,
  favoriteKPIs,
  onToggleFavorite,
}) => {
  return (
    <Paper elevation={3}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {kpis.map((kpi) => (
          <ListItem
            key={kpi.id}
            alignItems="flex-start"
            sx={{
              "&:hover": {
                backgroundColor: "action.hover",
              },
              cursor: "pointer",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
            onClick={() => onKPISelect(kpi)}
          >
            <ListItemText
              primary={
                <Typography component="span" variant="h6" color="text.primary">
                  {kpi.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {kpi.description}
                  </Typography>
                  <Box mt={1}>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Access Level: {kpi.accessLevel}
                    </Typography>
                  </Box>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(kpi.id);
                }}
              >
                {favoriteKPIs.includes(kpi.id) ? (
                  <FavoriteIcon color="secondary" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default KPIList;
