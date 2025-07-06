export interface ColorRGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ColorHSL {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export interface ColorHSV {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

export interface ColorLAB {
  lightness: number;
  a: number;
  b: number;
  alpha: number;
}

export interface ColorLCH {
  lightness: number;
  chroma: number;
  hue: number;
  alpha: number;
}

export interface PaletteMatch {
  closestPalette: ColorLAB[];
  colorIndex: number;
}

export interface ContrastSample {
  textColor?: ColorRGBA;
  elementColor?: ColorRGBA;
  label: string;
  ratio: number;
  passes: boolean;
}

export interface ColorSet {
  colors: ColorRGBA[];
  title: string;
  paletteIndex: number;
}

export const PALETTE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type PaletteStep = typeof PALETTE_STEPS[number];