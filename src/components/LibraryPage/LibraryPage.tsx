"use client";

import { useState, useCallback } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import KPICard from "./KPICards";

import { useKPIs } from "@/app/api/kpiApi";
import SearchBar from "./SearchBar";
import { KPI } from "../../types";

interface LibraryPageProps {
  featuredKPIs: KPI[];
  trendingKPIs: KPI[];
}

export default function LibraryPage({
  featuredKPIs,
  trendingKPIs,
}: LibraryPageProps) {
  const [search, setSearch] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const { data: searchResults, isLoading, error } = useKPIs(search);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => setSearch(value), 300),
    []
  );

  const renderKPICards = (kpis: KPI[]) => {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <SearchBar onChange={debouncedSearch} />
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Featured" />
        <Tab label="KPI" />
        <Tab label="Layout" />
        <Tab label="StoryBoards" />
      </Tabs>

      {search && search.length && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Search Result</Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error.message}</Typography>
          ) : (
            <>{renderKPICards(searchResults || [])}</>
          )}
        </Box>
      )}
      {tabValue === 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Featured KPIs
          </Typography>
          {renderKPICards(featuredKPIs)}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Trending KPIs
          </Typography>
          {renderKPICards(trendingKPIs)}
        </>
      )}
      {tabValue === 1 && <Typography>KPI tab content (placeholder)</Typography>}
      {tabValue === 2 && (
        <Typography>Layout tab content (placeholder)</Typography>
      )}
      {tabValue === 3 && (
        <Typography>Storyboard tab content (placeholder)</Typography>
      )}
    </Box>
  );
}
