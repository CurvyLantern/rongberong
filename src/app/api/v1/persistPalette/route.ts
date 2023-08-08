import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Palette from "@/lib/Palette.model";

export async function POST(req: Request) {
  const paletteBody = await req.json();

  const dataToPersist = {
    paletteName: String(paletteBody.paletteName) || "palette name",
    palette: paletteBody.palette.map((item: any) => {
      return {
        type: String(item.type) || "hex",
        code: String(item.code) || "",
        name: String(item.name) || "name",
      };
    }),
  };
  try {
    await connectToDatabase();
    console.log(dataToPersist, "dataToPersist");
    const palette = new Palette(dataToPersist);
    await palette.save();

    return NextResponse.json({ palette });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req: Request) {
  await connectToDatabase();

  const cursor = await Palette.find();

  return NextResponse.json({ data: cursor });
}
