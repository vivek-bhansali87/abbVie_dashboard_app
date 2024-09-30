import { useQuery } from "@tanstack/react-query";
import * as dbTypes from "../../types/dbTypes";
import * as types from "../../types";

function parseUserRole(role: string): types.UserRole {
  if (Object.values(types.UserRole).includes(role as types.UserRole)) {
    return role as types.UserRole;
  }
  throw new Error(`Invalid UserRole: ${role}`);
}

function parseKPIAccessLevel(level: string): types.KPIAccessLevel {
  if (
    Object.values(types.KPIAccessLevel).includes(level as types.KPIAccessLevel)
  ) {
    return level as types.KPIAccessLevel;
  }
  throw new Error(`Invalid KPI access level: ${level}`);
}

async function fetchKPIs(
  search: string = "",
  featured: boolean = false
): Promise<types.KPI[]> {
  const response = await fetch(
    `/api/kpis?search=${encodeURIComponent(search)}&featured=${featured}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  // Parse JSON strings to objects/arrays
  return data.map(
    (kpi: dbTypes.KPI): types.KPI => ({
      ...kpi,
      accessLevel: parseKPIAccessLevel(kpi.accessLevel),
      authorizedRoles: JSON.parse(kpi.authorizedRoles).map(parseUserRole),
      authorizedDepartments: JSON.parse(kpi.authorizedDepartments),
      metricIds: JSON.parse(kpi.metricIds),
      visualizations: JSON.parse(kpi.visualizations),
      businessQuestions: JSON.parse(kpi.businessQuestions),
      affiliateApplicability: JSON.parse(kpi.affiliateApplicability),
      createdAt: new Date(kpi.createdAt),
      updatedAt: new Date(kpi.updatedAt),
    })
  );
}

export const useKPIs = (search: string = "", featured: boolean = false) => {
  return useQuery<types.KPI[], Error>({
    queryKey: ["kpis", search, featured],
    queryFn: () => fetchKPIs(search, featured),
  });
};
