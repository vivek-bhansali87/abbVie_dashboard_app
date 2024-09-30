/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import SearchBar from "./SearchBar";
import KPIList from "./KPIList";
import KPICard from "./KPICards";
import { KPI } from "@/types";
import { useKPIs } from "@/app/api//kpiApi";
import { useFavorites } from "@/app/api/favoritesApi";

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
  const { data: userKPIs, isLoading, error } = useKPIs();
  const { data: favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
      router.push("/");
    } else {
      setUser(JSON.parse(userString));
    }
  }, [router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
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

  const renderKPIList = (kpis: KPI[]) => (
    <KPIList
      kpis={kpis}
      onToggleFavorite={toggleFavorite}
      favoriteKPIs={favorites?.map((fav) => fav.kpiId) || []}
    />
  );

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Welcome, {user.name}</Typography>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </Box>
      <SearchBar onChange={debouncedSearch} />
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Featured" />
        <Tab label="KPI" />
        <Tab label="Layout" />
        <Tab label="StoryBoards" />
      </Tabs>

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

      {tabValue === 1 && (
        <>
          <Typography variant="h5" gutterBottom>
            Your KPIs
          </Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">Error: {error.message}</Typography>
          ) : (
            renderKPIList(userKPIs || [])
          )}
        </>
      )}

      {tabValue === 2 && (
        <Typography>Layout tab content (placeholder)</Typography>
      )}
      {tabValue === 3 && (
        <Typography>Storyboard tab content (placeholder)</Typography>
      )}
    </Box>
  );
}
