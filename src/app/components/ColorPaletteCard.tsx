"use client";
import { useState } from "react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

interface ColorPaletteCardProps {
  paletteData: Palette;
}
const ColorPaletteCard: React.FC<ColorPaletteCardProps> = ({ paletteData }) => {
  console.log({ paletteData });
  const colors: Array<COLOR> = [
    { type: "hsl", a: 1, h: 1, l: 45, s: 80 },
    { type: "hsl", a: 1, h: 100, l: 35, s: 50 },
    { type: "hsl", a: 0.4, h: 20, l: 45, s: 40 },
    { type: "hsl", a: 1, h: 75, l: 15, s: 100 },
    { type: "hsl", a: 1, h: 350, l: 85, s: 70 },
  ];
  // this will come from the database later
  const [iLove, setILove] = useState(false);
  const iLoveThis = () => {
    setILove((p) => !p);
  };
  return (
    <div className="flex flex-col">
      <div className="aspect-video overflow-hidden rounded-md flex bg-white w-full ">
        {/* color columns */}
        {paletteData.palette.map((color, colorIdx) => {
          return (
            <ColorPaletteCardColumn
              color={color}
              key={colorIdx}
            />
          );
        })}
      </div>
      {/* contents */}
      <div className="flex items-center ">
        <p className="text-sm font-semibold py-2">{paletteData.paletteName}</p>

        <button
          onClick={iLoveThis}
          className="flex gap-2 items-center justify-center ml-auto">
          {iLove ? <TbHeartFilled className="text-red-500" /> : <TbHeart />}{" "}
          <p className="text-sm">10k</p>
        </button>
      </div>
    </div>
  );
};

interface ColorPaletteCardColumnProps {
  color: HEX_WITH_NAME;
}
const ColorPaletteCardColumn: React.FC<ColorPaletteCardColumnProps> = ({
  color,
}) => {
  // let colorStr = "";
  // if (color.type === "hsl") {
  //   colorStr = hslToHex(color);
  // }

  return (
    <div
      className="flex items-center justify-center flex-1 hover:cursor-pointer transition-all group relative"
      style={{
        backgroundColor: color.code,
      }}>
      {/* group-hover:opacity-100 opacity-0  */}
      <p className="text-sm font-semibold w-0 group-hover:w-auto px-2 hidden group-hover:block transition-all">
        {color.code}
      </p>
    </div>
  );
};

export default ColorPaletteCard;
