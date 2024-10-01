/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const kpis = await prisma.kPI.findMany();

    // Parse JSON strings in KPI data
    const parsedKPIs = kpis.map((kpi) => ({
      ...kpi,
      authorizedRoles: JSON.parse(kpi.authorizedRoles),
      authorizedDepartments: JSON.parse(kpi.authorizedDepartments),
      metricIds: JSON.parse(kpi.metricIds),
      visualizations: JSON.parse(kpi.visualizations),
      businessQuestions: JSON.parse(kpi.businessQuestions),
      affiliateApplicability: JSON.parse(kpi.affiliateApplicability),
    }));

    return NextResponse.json(parsedKPIs);
  } catch (error) {
    console.error("Error fetching user KPIs:", error);
    return NextResponse.json(
      { error: "Failed to fetch KPIs" },
      { status: 500 }
    );
  }
}
