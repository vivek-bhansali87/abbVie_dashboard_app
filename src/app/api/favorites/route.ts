import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
  });

  return NextResponse.json(favorites);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, kpiId } = body;

  if (!userId || !kpiId) {
    return NextResponse.json(
      { error: "User ID and KPI ID are required" },
      { status: 400 }
    );
  }

  const existingFavorite = await prisma.favorite.findFirst({
    where: { userId, kpiId },
  });

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: { id: existingFavorite.id },
    });
  } else {
    await prisma.favorite.create({
      data: { userId, kpiId },
    });
  }

  return NextResponse.json({ success: true });
}
