import { Button } from "@/ui/ui/button";
import Link from "next/link";

const BaseHeader = () => {
  return (
    <div className="py-5 px-5 shadow-md flex justify-between">
      <Logo />

      <Button
        asChild
        className="uppercase">
        <Link href="/generate">Generate your own palette</Link>
      </Button>
    </div>
  );
};

const Logo = () => {
  const styles = [
    {
      r: "red",
    },
    {
      o: "orange",
    },
    {
      n: "navy",
    },
    {
      g: "green",
    },
    {
      b: "blue",
    },
    {
      e: "emerald",
    },
    {
      r: "rose",
    },
    {
      o: "olive",
    },
    {
      n: "neon",
    },
    {
      g: "gold",
    },
  ];
  return (
    <div className="flex text-4xl">
      {styles.map((l, idx) => {
        const [name, color] = Object.entries(l)[0];
        return (
          <div
            key={idx}
            className={`${idx % 3 === 0 ? "font-bold" : ""}`}
            style={{
              color,
            }}>
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default BaseHeader;
