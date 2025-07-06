import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB, ColorLCH } from '../types/color';

const ALPHA_THRESHOLD = Math.pow(2, -16);

// Helper functions
export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function validateColorValue(value: number, maxValue: number, colorName: string): void {
  if (isNaN(value) || 0 > value || value > maxValue) {
    throw new RangeError(`${value} for ${colorName} is not between 0 and ${maxValue}`);
  }
}

// Color constructors
export function createColorRGBA(red: number, green: number, blue: number, alpha: number = 1): ColorRGBA {
  validateColorValue(red, 1, 'red');
  validateColorValue(green, 1, 'green');
  validateColorValue(blue, 1, 'blue');
  validateColorValue(alpha, 1, 'alpha');
  return { red, green, blue, alpha };
}

export function createColorHSL(hue: number, saturation: number, lightness: number, alpha: number = 1): ColorHSL {
  validateColorValue(hue, 360, 'hue');
  validateColorValue(saturation, 1, 'saturation');
  validateColorValue(lightness, 1, 'lightness');
  validateColorValue(alpha, 1, 'alpha');
  return { hue, saturation, lightness, alpha };
}

export function createColorHSV(hue: number, saturation: number, value: number, alpha: number = 1): ColorHSV {
  validateColorValue(hue, 360, 'hue');
  validateColorValue(saturation, 1, 'saturation');
  validateColorValue(value, 1, 'value');
  validateColorValue(alpha, 1, 'alpha');
  return { hue, saturation, value, alpha };
}

export function createColorLAB(lightness: number, a: number, b: number, alpha: number = 1): ColorLAB {
  validateColorValue(lightness, Number.MAX_VALUE, 'lightness');
  validateColorValue(alpha, 1, 'alpha');
  return { lightness, a, b, alpha };
}

export function createColorLCH(lightness: number, chroma: number, hue: number, alpha: number = 1): ColorLCH {
  validateColorValue(lightness, Number.MAX_VALUE, 'lightness');
  validateColorValue(chroma, Number.MAX_VALUE, 'chroma');
  validateColorValue(hue, 360, 'hue');
  validateColorValue(alpha, 1, 'alpha');
  return { lightness, chroma, hue, alpha };
}

// Utility functions
export function areColorsEqual(colorA: ColorRGBA, colorB: ColorRGBA): boolean {
  return Math.abs(colorA.red - colorB.red) < ALPHA_THRESHOLD &&
         Math.abs(colorA.green - colorB.green) < ALPHA_THRESHOLD &&
         Math.abs(colorA.blue - colorB.blue) < ALPHA_THRESHOLD &&
         Math.abs(colorA.alpha - colorB.alpha) < ALPHA_THRESHOLD;
}


export const WHITE_COLOR = createColorRGBA(1, 1, 1);
export const BLACK_COLOR = createColorRGBA(0, 0, 0);
export { ALPHA_THRESHOLD };