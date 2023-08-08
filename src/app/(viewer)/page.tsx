"use client";

// import { hslToHex, hslToRgb } from "@/lib/utils";
import styles from "@/styles/gradient.module.css";
import { useEffect, useRef, useState } from "react";
import { useMouse } from "react-use";
import ColorPaletteCard from "../components/ColorPaletteCard";

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { posX, posY } = useMouse(ref);
  useEffect(() => {
    ref.current?.style.setProperty("--mousex", posX + "%");
    ref.current?.style.setProperty("--mousey", posY + "%");
  }, [posX, posY]);
  const getMouseCoords = (x: number, y: number) => {
    const bounds = ref.current?.getBoundingClientRect()!;
    const myX = x - bounds.left;
    const myY = y - bounds.top;
    const px = (myX / bounds.width) * 100;
    const py = (myY / bounds.height) * 100;

    ref.current?.style.setProperty("--mousex", px + "%");
    ref.current?.style.setProperty("--mousey", py + "%");
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!ref.current) return;
      const computedStyle = getComputedStyle(ref.current);
      let angle = parseFloat(computedStyle.getPropertyValue("--angle"));
      if (!angle) {
        ref.current?.style.setProperty("--angle", Math.random() * 5 + "deg");
      } else {
        angle += 1;
        ref.current?.style.setProperty("--angle", angle + "deg");
      }
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [palettes, setPalettes] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const { data: serverPalettes } = await fetch(
        "api/v1/persistPalette"
      ).then((res) => res.json());

      console.log({ serverPalettes });
      const _palette = serverPalettes.map((sp: any) => ({
        id: sp._id,
        paletteName: sp.paletteName,
        palette: sp.palette,
      }));
      setPalettes(_palette);
    };

    fetcher();
  }, []);

  return (
    <main className="flex flex-col mb-40">
      {/* hero section */}
      <section
        onPointerMove={(evt) => {
          getMouseCoords(evt.clientX, evt.clientY);
        }}
        ref={ref}
        className={`${styles.gradient} pt-20 mb-40 h-screen flex justify-center`}>
        <h1 className="text-center text-7xl font-semibold uppercase max-w-4xl mx-auto leading-normal  tracking-widest mt-20">
          Completely free fast Color palette finder and generator
        </h1>
      </section>

      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {palettes.map((palette, idx) => {
          return (
            <ColorPaletteCard
              key={idx}
              paletteData={palette}
            />
          );
        })}
      </div>
    </main>
  );
}
