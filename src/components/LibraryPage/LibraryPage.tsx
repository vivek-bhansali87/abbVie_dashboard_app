"use client";

import { useState } from "react";
import { useKPIs } from "@/lib/api/kpiApi";
import SearchBar from "./SearchBar";
import KPIList from "./KPIList";
import AssetModal from "../AssetModal/AssetModal";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedKPI, setSelectedKPI] = useState(null);
  const { data: kpis, isLoading, error } = useKPIs(search);

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <KPIList kpis={kpis} onKPISelect={setSelectedKPI} />
      )}
      {selectedKPI && (
        <AssetModal kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
      )}
    </div>
  );
}
