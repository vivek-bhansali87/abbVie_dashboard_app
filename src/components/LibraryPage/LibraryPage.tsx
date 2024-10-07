/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import KPIList from "./KPIList";
import KPICard from "./KPICards";
import RequestModal from "../RequestModal";
import { KPI } from "@/types";
import { useUserKPIs } from "@/app/api/kpiApi";
import { useFavorites } from "@/app/api/favoritesApi";

interface LibraryPageProps {
  featuredKPIs: KPI[];
  trendingKPIs: KPI[];
}

export default function LibraryPage({
  featuredKPIs,
  trendingKPIs,
}: LibraryPageProps) {
  const [tabValue, setTabValue] = useState(0);
  const { data: userKPIs, isLoading, error } = useUserKPIs();
  const { data: favorites, toggleFavorite } = useFavorites();
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(null);
  const router = useRouter();

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

  const handleRequestSubmit = (
    selectedKPIs: string[],
    reasonText: string | null
  ) => {
    setRequestModalOpen(false);

    // Implemented Request API.
  };

  return (
    <Box sx={{ bgcolor: "rgba(0,0,0,0.04)", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setRequestModalOpen(true)}
          >
            Request
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{ ml: 3 }}
          >
            Logout
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          m={2}
          flexDirection={"column"}
        >
          <Typography variant="h2" fontWeight="bold">
            Library
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={3}>
            Browse for assets needed to report and present analysis.
          </Typography>
        </Box>

        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        >
          <SearchBar />
        </Paper>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            mt: 5,
            mb: 2,
            bgcolor: "rgba(0,0,0,0.04)",
            borderRadius: "5px",
          }}
        >
          <Tab label="Featured" sx={{ width: "25%" }} />
          <Tab label="KPI" sx={{ width: "25%" }} />
          <Tab label="Layouts" sx={{ width: "25%" }} />
          <Tab label="Storyboards" sx={{ width: "25%" }} />
        </Tabs>

        {tabValue === 0 && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Featured
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Curated top picks from this week
            </Typography>
            {renderKPICards(featuredKPIs)}

            <Typography variant="h5" fontWeight="bold" gutterBottom mt={4}>
              Trending
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Most popular by community
            </Typography>
            {renderKPICards(trendingKPIs)}
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ pt: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              All KPIs
            </Typography>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography color="error">Error: {error.message}</Typography>
            ) : (
              renderKPIList(userKPIs || [])
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ pt: 2 }}>
            <Typography>Layouts tab content (placeholder)</Typography>
          </Box>
        )}
        {tabValue === 3 && (
          <Box sx={{ pt: 2 }}>
            <Typography>Storyboards tab content (placeholder)</Typography>
          </Box>
        )}
        <RequestModal
          open={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
          onSubmit={handleRequestSubmit}
        />
      </Container>
    </Box>
  );
}
