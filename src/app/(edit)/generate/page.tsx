"use client";
import { hslToHex } from "@/lib/utils";
import ColorPaletteCard from "../../components/ColorPaletteCard";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/ui/popover";
import {
  TbCopy,
  TbDragDrop,
  TbArrowsMoveHorizontal,
  TbPlus,
  TbCross,
  TbX,
} from "react-icons/tb";
import { useCopyToClipboard } from "react-use";

const colors: Array<COLOR> = [
  { type: "hsl", a: 1, h: 1, l: 45, s: 80 },
  { type: "hsl", a: 1, h: 100, l: 35, s: 50 },
  { type: "hsl", a: 0.4, h: 20, l: 45, s: 40 },
  { type: "hsl", a: 1, h: 75, l: 15, s: 100 },
  { type: "hsl", a: 1, h: 350, l: 85, s: 70 },
];
const GeneratePage = () => {
  const [isOpenColorpicker, setIsOpenColorpicker] = useState(false);
  const openColorPicker = () => {
    setIsOpenColorpicker((p) => !p);
  };

  const [hexColorArrState, setHexColorArrState] = useState<Array<HEX>>([]);

  useEffect(() => {
    const hexColors = colors.map((c) => {
      let obj: HEX = {
        type: "hex",
        code: "",
      };
      if (c.type === "hex") {
        obj.code = c.code;
      } else if (c.type === "hsl") {
        obj.code = hslToHex(c);
      }
      return obj;
    });
    setHexColorArrState(hexColors);
  }, []);

  const onModifyColor = (idx: number, code: string) => {
    setHexColorArrState((c) => {
      c[idx].code = code;
      return [...c];
    });
  };

  const [copiedText, copy] = useCopyToClipboard();

  const createNew = () => {
    if (hexColorArrState.length > 7) return;
    const obj: HEX = {
      code: "#ffffff",
      type: "hex",
    };
    setHexColorArrState((p) => [...p, obj]);
  };

  const removeColorFromArr = (i: number, c: HEX) => {
    const arrAfterRemoval = hexColorArrState.filter(
      (item, itemIdx) => item !== c
    );
    setHexColorArrState(arrAfterRemoval);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="py-2 border-b-2 flex gap-5 px-5">
        <button
          onClick={() => {
            createNew();
          }}
          className="p-4 rounded-lg bg-white shadow-md ml-auto">
          <TbPlus />
        </button>
        <button className="p-4 rounded-lg bg-white shadow-md">save me</button>
      </header>
      <main className="flex h-full bg-red-500">
        <div className="relative flex-1 flex">
          {hexColorArrState.map((color, colorIdx) => {
            return (
              <div
                key={colorIdx}
                className="flex-1 h-full flex flex-col items-center justify-end"
                style={{
                  backgroundColor: color.code,
                }}>
                {/* icon column */}
                <div className="grid gap-4 mb-10">
                  {/* remove */}
                  <button
                    className="hover:cursor-pointer bg-white p-2 rounded-full"
                    onClick={() => {
                      removeColorFromArr(colorIdx, color);
                    }}>
                    <TbX className="w-6 h-6" />
                  </button>

                  {/* copy */}
                  <button
                    className="hover:cursor-pointer bg-white p-2 rounded-full"
                    onClick={() => {
                      copy(color.code);
                    }}>
                    <TbCopy className="w-6 h-6" />
                  </button>
                  {/* drag */}
                  <button className="hover:cursor-pointer bg-white p-2 rounded-full">
                    <TbArrowsMoveHorizontal className="w-6 h-6" />
                  </button>
                </div>

                <ColorPicker
                  color={color}
                  onModify={onModifyColor}
                  index={colorIdx}
                />
                <p className="text-lg py-5 font-bold uppercase">color</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

interface ColorPickerProps {
  color: HEX;
  onModify: (i: number, c: string) => void;
  index: number;
}
const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onModify,
  index,
}) => {
  const onColorChange = (str: string) => {
    onModify(index, str);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-3xl rounded-xl font-bold hover:bg-neutral-300 py-3 px-4 hover:bg-opacity-30">
          {color.code}
        </button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <input
          autoFocus
          value={color.code}
          onChange={(evt) => {
            onColorChange(evt.target.value);
          }}
          type="color"
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
};

export default GeneratePage;
