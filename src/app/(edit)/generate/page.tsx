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
import { cp } from "fs";

const colors: Array<COLOR> = [
  { type: "hsl", a: 1, h: 1, l: 45, s: 80 },
  { type: "hsl", a: 1, h: 100, l: 35, s: 50 },
  { type: "hsl", a: 0.4, h: 20, l: 45, s: 40 },
  { type: "hsl", a: 1, h: 75, l: 15, s: 100 },
  { type: "hsl", a: 1, h: 350, l: 85, s: 70 },
];
const GeneratePage = () => {
  const [hexColorArrState, setHexColorArrState] = useState<
    Array<HEX_WITH_NAME>
  >([]);

  useEffect(() => {
    const hexColors = colors.map((c) => {
      let obj: HEX_WITH_NAME = {
        type: "hex",
        code: "",
        name: "",
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
    const obj: HEX_WITH_NAME = {
      code: "#ffffff",
      type: "hex",
      name: "",
    };
    setHexColorArrState((p) => [...p, obj]);
  };

  const removeColorFromArr = (i: number, c: HEX) => {
    const arrAfterRemoval = hexColorArrState.filter(
      (item, itemIdx) => item !== c
    );
    setHexColorArrState(arrAfterRemoval);
  };

  const saveThisPalette = async () => {
    console.log(hexColorArrState);
    const res = await fetch("/api/v1/persistPalette", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hexColorArrState),
    });
    const data = await res.json();
    console.log({ data }, "from server");
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
        <button
          onClick={() => {
            saveThisPalette();
          }}
          className="p-4 rounded-lg bg-white shadow-md">
          save me
        </button>
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

                <NameChanger
                  color={color}
                  onChange={(v) => {
                    setHexColorArrState((arr) => {
                      arr[colorIdx].name = v;
                      return [...arr];
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

interface NameChangerProps {
  onChange: (v: string) => void;
  color: {
    code: string;
    name: string;
    type: "hex";
  };
}
const NameChanger: React.FC<NameChangerProps> = ({ onChange, color }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <p className="text-xl font-semibold py-5">
          {color.name ? color.name : "name"}
        </p>
      </PopoverTrigger>
      <PopoverContent className="p-0 flex">
        <input
          autoFocus
          className="w-full p-3 rounded-lg text-xl"
          type="text"
          value={color.name}
          onChange={(evt) => {
            onChange(evt.target.value);
          }}
        />
      </PopoverContent>
    </Popover>
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
