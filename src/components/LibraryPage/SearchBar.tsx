import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { fetchKPIs } from "@/app/api/kpiApi";
import { KPI } from "@/types";
import debounce from "lodash/debounce";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    if (search.trim() !== "") {
      fetchKPIs(search).then(setKPIs).catch(console.error);
      setShowResults(true);
    } else {
      setKPIs([]);
      setShowResults(false);
    }
  }, [search]);

  const handleSearch = async (searchTerm: string) => {
    setSearch(searchTerm);
    if (searchTerm.trim() !== "") {
      setRecentSearches((prev) => {
        const updatedSearches = [
          searchTerm,
          ...prev.filter((s) => s !== searchTerm),
        ].slice(0, 5);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        return updatedSearches;
      });
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => handleSearch(value), 300),
    []
  );

  const handleKPIClick = (kpi: KPI) => {
    // Handle KPI selection here
    console.log("Selected KPI:", kpi);
    setShowResults(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        width: "100%",
      }}
    >
      <Box position="relative">
        <TextField
          fullWidth
          variant="standard"
          placeholder="Search KPIs..."
          onChange={(e) => debouncedSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {showResults && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1,
              maxHeight: 300,
              overflowY: "auto",
              mt: 1,
            }}
          >
            <List>
              {kpis.map((kpi) => (
                <ListItem
                  key={kpi.id}
                  onClick={() => handleKPIClick(kpi)}
                  sx={{
                    textAlign: "left",
                    width: "100%",
                    border: "none",
                    background: "none",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText
                    primary={kpi.name}
                    secondary={kpi.description}
                  />
                </ListItem>
              ))}
              {kpis.length === 0 && (
                <ListItem>
                  <ListItemText primary="No KPIs found" />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Box>
      {recentSearches.length > 0 && !showResults && (
        <Box
          sx={{
            maxHeight: 300,
            overflowY: "auto",
            width: "100%",
            mt: 1,
            p: 1,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Recent Searches
          </Typography>
          {recentSearches.map((search, index) => (
            <Chip key={index} label={search} sx={{ margin: "4px 4px 4px 0" }} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default SearchBar;
