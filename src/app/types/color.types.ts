type COLOR = RGB | HSL | HSB | HEX;

interface RGB {
  type: "rgb";
  r: number;
  g: number;
  b: number;
}
interface HSL {
  type: "hsl";
  h: number;
  s: number;
  l: number;
  a?: number;
}
interface HSB {
  type: "hsb";
  h: number;
  s: number;
  b: number;
}
interface HEX {
  type: "hex";
  code: string;
}
