"use client";

import { useState } from "react";
import { useKPIs } from "../../app/api/kpiApi";
import SearchBar from "./SearchBar";
import KPIList from "./KPIList";
import AssetModal from "../AssetModal/AssetModal";
import { KPI } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { addFavoriteKPI, removeFavoriteKPI } from "../../../lib/redux/kpiSlice";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const { data: kpis, isLoading, error } = useKPIs(search);
  const dispatch = useAppDispatch();
  const favoriteKPIs = useAppSelector((store) => store.kpi.favoriteKPIs);

  const handleKPISelect = (kpi: KPI) => {
    setSelectedKPI(kpi);
  };
  const handleToggleFavorite = (kpiId: string) => {
    if (favoriteKPIs.includes(kpiId)) {
      dispatch(removeFavoriteKPI(kpiId));
    } else {
      dispatch(addFavoriteKPI(kpiId));
    }
  };

  const filteredKPIs =
    kpis?.filter(
      (kpi) =>
        kpi.name.toLowerCase().includes(search.toLowerCase()) ||
        kpi.description.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <KPIList
          kpis={filteredKPIs || []}
          onKPISelect={handleKPISelect}
          favoriteKPIs={favoriteKPIs}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      {/* {selectedKPI && (
        <AssetModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )} */}
    </div>
  );
}
