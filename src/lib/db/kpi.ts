import prisma from "../prisma";
import * as dbTypes from "@/types/dbTypes";
import { KPI, LibraryHighlightType, KPIAccessLevel, UserRole } from "@/types";

function parseUserRole(role: string): UserRole {
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }
  throw new Error(`Invalid UserRole: ${role}`);
}

function parseKPIAccessLevel(level: string): KPIAccessLevel {
  if (Object.values(KPIAccessLevel).includes(level as KPIAccessLevel)) {
    return level as KPIAccessLevel;
  }
  throw new Error(`Invalid KPI access level: ${level}`);
}

function convertLibraryHighlightKPI(highlight: dbTypes.LibraryHighlight): KPI {
  return {
    id: highlight.kpi.id,
    name: highlight.kpi.name,
    description: highlight.kpi.description,
    accessLevel: parseKPIAccessLevel(highlight.kpi.accessLevel),
    authorizedRoles: JSON.parse(highlight.kpi.authorizedRoles).map(
      parseUserRole
    ),
    authorizedDepartments: JSON.parse(highlight.kpi.authorizedDepartments),
    metricIds: JSON.parse(highlight.kpi.metricIds),
    visualizations: JSON.parse(highlight.kpi.visualizations),
    businessQuestions: JSON.parse(highlight.kpi.businessQuestions),
    calculations: highlight.kpi.calculations,
    affiliateApplicability: JSON.parse(highlight.kpi.affiliateApplicability),
    createdAt: new Date(highlight.kpi.createdAt),
    updatedAt: new Date(highlight.kpi.updatedAt),
  };
}

async function getHighlightedKPIs(type: LibraryHighlightType): Promise<KPI[]> {
  const currentDate = new Date();
  const highlights = await prisma.libraryHighlight.findMany({
    where: {
      type: type.toString(),
      endDate: {
        gte: currentDate,
      },
    },
    include: {
      kpi: true,
    },
  });

  return highlights.map(convertLibraryHighlightKPI);
}

export async function getFeaturedKPIs(): Promise<KPI[]> {
  console.log("in here");
  return getHighlightedKPIs(LibraryHighlightType.FEATURED);
}

export async function getTrendingKPIs(): Promise<KPI[]> {
  return getHighlightedKPIs(LibraryHighlightType.TRENDING);
}
