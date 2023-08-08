// import { hslToHex, hslToRgb } from "@/lib/utils";
import Image from "next/image";
import ColorPaletteCard from "../components/ColorPaletteCard";

export default function HomePage() {
  return (
    <main>
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {Array(100)
          .fill(0)
          .map((_, idx) => {
            return <ColorPaletteCard key={idx} />;
          })}
      </div>
    </main>
  );
}
