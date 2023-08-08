import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// hsl to hex
export function hslToHex(hsl: HSL) {
  let { h, s, l } = hsl;
  h = Math.max(0, Math.min(360, h)); // Ensure h is between 0 and 360
  s = Math.max(0, Math.min(100, s)); // Ensure s is between 0 and 100
  l = Math.max(0, Math.min(100, l)); // Ensure l is between 0 and 100

  // Convert h, s, and l to their decimal fractions
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    // Achromatic (gray)
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexColor;
}

// hsl to rgb
export function hslToRgb(hsl: HSL) {
  let { h, s, l } = hsl;
  h = Math.max(0, Math.min(360, h)); // Ensure h is between 0 and 360
  s = Math.max(0, Math.min(100, s)); // Ensure s is between 0 and 100
  l = Math.max(0, Math.min(100, l)); // Ensure l is between 0 and 100

  // Convert h, s, and l to their decimal fractions
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    // Achromatic (gray)
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const to255 = (x: number) => Math.round(x * 255);

  return {
    r: to255(r),
    g: to255(g),
    b: to255(b),
  };
}

// hsl average color
export function avgHsl(hslArr: Array<HSL>) {
  const _avg = hslArr.reduce(
    (acc, hsl) => {
      acc.h += hsl.h;
      acc.s += hsl.s;
      acc.l += hsl.l;
      return acc;
    },
    { h: 0, s: 0, l: 0 }
  );

  const h = _avg.h / hslArr.length;
  const s = (_avg.s / hslArr.length) % 100;
  const l = (_avg.l / hslArr.length) % 100;
  return { h, s, l };
}