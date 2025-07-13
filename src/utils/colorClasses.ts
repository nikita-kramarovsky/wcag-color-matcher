import chroma from 'chroma-js';
import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB, ColorLCH } from '../types/color';
import { chromaToColorRGBA, chromaToColorHSL, chromaToColorLAB, colorRGBAToChroma } from './chromaIntegration';

const ALPHA_THRESHOLD = Math.pow(2, -16);

/**
 * Clamps a value between a minimum and maximum range.
 * @param value - The value to clamp
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns The clamped value
 */
export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}


/**
 * Creates a new ColorRGBA object with validated values using chroma.js.
 * @param red - Red component (0-1)
 * @param green - Green component (0-1)
 * @param blue - Blue component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorRGBA object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorRGBA(red: number, green: number, blue: number, alpha: number = 1): ColorRGBA {
  const chromaColor = chroma.rgb(red * 255, green * 255, blue * 255, alpha);
  return chromaToColorRGBA(chromaColor);
}

/**
 * Creates a new ColorHSL object with validated values using chroma.js.
 * @param hue - Hue component (0-360)
 * @param saturation - Saturation component (0-1)
 * @param lightness - Lightness component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorHSL object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorHSL(hue: number, saturation: number, lightness: number, alpha: number = 1): ColorHSL {
  const chromaColor = chroma.hsl(hue, saturation, lightness, alpha);
  return chromaToColorHSL(chromaColor);
}

/**
 * Creates a new ColorHSV object with validated values using chroma.js.
 * @param hue - Hue component (0-360)
 * @param saturation - Saturation component (0-1)
 * @param value - Value component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorHSV object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorHSV(hue: number, saturation: number, value: number, alpha: number = 1): ColorHSV {
  // Use chroma.js to create and normalize the HSV color
  const chromaColor = chroma.hsv(hue, saturation, value, alpha);
  const [h, s, v] = chromaColor.hsv();
  return { hue: h || 0, saturation: s, value: v, alpha: alpha };
}

/**
 * Creates a new ColorLAB object with validated values using chroma.js.
 * @param lightness - Lightness component (0-100)
 * @param a - Green-red axis component
 * @param b - Blue-yellow axis component
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorLAB object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorLAB(lightness: number, a: number, b: number, alpha: number = 1): ColorLAB {
  const chromaColor = chroma.lab(lightness, a, b, alpha);
  return chromaToColorLAB(chromaColor);
}

/**
 * Creates a new ColorLCH object with validated values using chroma.js.
 * @param lightness - Lightness component (0-100)
 * @param chroma - Chroma component (0-100+)
 * @param hue - Hue component (0-360)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorLCH object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorLCH(lightness: number, _chroma: number, hue: number, alpha: number = 1): ColorLCH {
  // Use chroma.js to create and normalize the LCH color
  const chromaColor = chroma.lch(lightness, _chroma, hue, alpha);
  const [l, c, h] = chromaColor.lch();
  return { lightness: l, chroma: c, hue: h || 0, alpha: alpha };
}

/**
 * Compares two ColorRGBA objects for equality using chroma.js distance calculation.
 * @param colorA - First color to compare
 * @param colorB - Second color to compare
 * @param threshold - Distance threshold for equality (defaults to ALPHA_THRESHOLD)
 * @returns True if colors are equal within the threshold, false otherwise
 */
export function areColorsEqual(colorA: ColorRGBA, colorB: ColorRGBA, threshold: number = ALPHA_THRESHOLD): boolean {
  const chromaA = colorRGBAToChroma(colorA);
  const chromaB = colorRGBAToChroma(colorB);
  return chroma.distance(chromaA, chromaB, 'rgb') < threshold * 255; // Convert threshold to 0-255 range
}

/** White color constant created with chroma.js */
export const WHITE_COLOR = createColorFromString('#ffffff');

/** Black color constant created with chroma.js */
export const BLACK_COLOR = createColorFromString('#000000');

/**
 * Creates a ColorRGBA from any valid color string using chroma.js.
 * @param colorString - Any valid color string (hex, rgb, hsl, named colors, etc.)
 * @returns A ColorRGBA object
 * @throws {Error} When the color string is invalid
 */
export function createColorFromString(colorString: string): ColorRGBA {
  try {
    const color = chroma(colorString);
    return chromaToColorRGBA(color);
  } catch {
    throw new Error(`Invalid color string: ${colorString}`);
  }
}

/**
 * Interpolates between two colors using chroma.js.
 * @param colorA - First color
 * @param colorB - Second color
 * @param factor - Interpolation factor (0-1)
 * @param colorSpace - Color space for interpolation ('rgb', 'hsl', 'lab', etc.)
 * @returns Interpolated ColorRGBA
 */
export function interpolateColors(
  colorA: ColorRGBA, 
  colorB: ColorRGBA, 
  factor: number, 
  colorSpace: 'rgb' | 'hsl' | 'lab' | 'lch' = 'lab'
): ColorRGBA {
  const chromaA = colorRGBAToChroma(colorA);
  const chromaB = colorRGBAToChroma(colorB);
  const interpolated = chroma.mix(chromaA, chromaB, factor, colorSpace);
  return chromaToColorRGBA(interpolated);
}