import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const featured = searchParams.get("featured") === "true";

  const kpis = await prisma.kPI.findMany({
    where: {
      name: { contains: search },
      ...(featured ? { highlights: { some: { type: "FEATURED" } } } : {}),
    },
    include: { highlights: true },
  });

  return NextResponse.json(kpis);
}
