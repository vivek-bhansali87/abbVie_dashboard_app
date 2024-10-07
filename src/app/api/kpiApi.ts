import { useQuery } from "@tanstack/react-query";
import * as dbTypes from "../../types/dbTypes";
import * as types from "../../types";

const getCurrentUserId = (): string | null => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user = JSON.parse(userString);
      return user.id;
    }
  }
  return null;
};

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

export async function fetchKPIs(
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

async function fetchUserKPIs(): Promise<types.KPI[]> {
  const userId = getCurrentUserId();

  if (!userId) {
    throw new Error("No user selected");
  }

  const response = await fetch(`/api/kpis/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch User KPIs");
  }
  return response.json();
}

export const useUserKPIs = () => {
  return useQuery<types.KPI[], Error>({
    queryKey: ["userKPIs"],
    queryFn: fetchUserKPIs,
  });
};
