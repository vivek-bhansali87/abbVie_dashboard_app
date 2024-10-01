import React, { useState, useEffect } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (searchTerm: string) => {
    onChange(searchTerm);
    if (searchTerm.trim() !== "") {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter((s) => s !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  return (
    <>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Search KPIs..."
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {recentSearches.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Recent Searches
          </Typography>
          {recentSearches.map((search, index) => (
            <Chip
              key={index}
              label={search}
              onClick={() => handleSearch(search)}
              sx={{ margin: "0 4px 4px 0" }}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default SearchBar;
