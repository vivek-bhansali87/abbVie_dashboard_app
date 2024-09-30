import React, { useState, useEffect } from "react";
import { InputBase, Chip, Box, Typography, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
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
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "2px",
        }}
      >
        <IconButton sx={{ padding: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search KPIs..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(value);
            }
          }}
        />
      </Box>
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
    </Box>
  );
};

export default SearchBar;
