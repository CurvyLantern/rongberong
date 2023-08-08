import { hslToHex } from "@/lib/utils";
import ColorPaletteCard from "../../components/ColorPaletteCard";

const DetailsPage = () => {
  const colors: Array<COLOR> = [
    { type: "hsl", a: 1, h: 1, l: 45, s: 80 },
    { type: "hsl", a: 1, h: 100, l: 35, s: 50 },
    { type: "hsl", a: 0.4, h: 20, l: 45, s: 40 },
    { type: "hsl", a: 1, h: 75, l: 15, s: 100 },
    { type: "hsl", a: 1, h: 350, l: 85, s: 70 },
  ];
  return (
    <div className="container">
      {/* title */}
      <h1 className="text-center text-3xl font-semibold my-10">
        Raw green platter
      </h1>

      <div className="flex flex-col w-full mb-40">
        <div className="aspect-video overflow-hidden rounded-2xl flex bg-white w-full ">
          {/* color columns */}
          {colors.map((color, colorIdx) => {
            let colorStr = "";
            if (color.type === "hsl") {
              colorStr = hslToHex(color);
            }
            return (
              <div
                key={colorIdx}
                className="flex items-center justify-center flex-1  hover:cursor-pointer transition-all group relative"
                style={{
                  backgroundColor: colorStr,
                }}>
                <p className="text-sm font-bold">{colorStr}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* more simillar palettes */}

      <h2 className="text-center text-2xl font-semibold uppercase my-10">
        Simillar palettes
      </h2>

      <div className="container grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array(100)
          .fill(0)
          .map((_, idx) => {
            return <ColorPaletteCard key={idx} />;
          })}
      </div>
    </div>
  );
};

export default DetailsPage;
