import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const featured = searchParams.get("featured") === "true";

  try {
    const kpis = await prisma.kPI.findMany({
      where: {
        name: { contains: search },
        ...(featured ? { highlights: { some: { type: "FEATURED" } } } : {}),
      },
      include: { highlights: true },
    });
    return NextResponse.json(kpis);
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    return NextResponse.json(
      { error: "Failed to fetch KPIs" },
      { status: 500 }
    );
  }
}
