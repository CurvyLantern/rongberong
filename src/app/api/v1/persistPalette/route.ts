import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Palette from "@/lib/Palette.model";
connectToDatabase();

export async function POST(req: Request) {
  const _palette = await req.json();
  console.log({ palette: _palette });

  const palette = await Palette.create({
    paletteName: "",
    palette: _palette,
  });

  return NextResponse.json({ palette });
}
