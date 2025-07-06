import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB, ColorLCH } from '../types/color';

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
 * Validates that a color value is within the acceptable range.
 * @param value - The value to validate
 * @param maxValue - The maximum allowed value
 * @param colorName - The name of the color component for error messages
 * @throws {RangeError} When the value is outside the valid range
 */
export function validateColorValue(value: number, maxValue: number, colorName: string): void {
  if (isNaN(value) || 0 > value || value > maxValue) {
    throw new RangeError(`${value} for ${colorName} is not between 0 and ${maxValue}`);
  }
}

/**
 * Creates a new ColorRGBA object with validated values.
 * @param red - Red component (0-1)
 * @param green - Green component (0-1)
 * @param blue - Blue component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorRGBA object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorRGBA(red: number, green: number, blue: number, alpha: number = 1): ColorRGBA {
  validateColorValue(red, 1, 'red');
  validateColorValue(green, 1, 'green');
  validateColorValue(blue, 1, 'blue');
  validateColorValue(alpha, 1, 'alpha');
  return { red, green, blue, alpha };
}

/**
 * Creates a new ColorHSL object with validated values.
 * @param hue - Hue component (0-360)
 * @param saturation - Saturation component (0-1)
 * @param lightness - Lightness component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorHSL object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorHSL(hue: number, saturation: number, lightness: number, alpha: number = 1): ColorHSL {
  validateColorValue(hue, 360, 'hue');
  validateColorValue(saturation, 1, 'saturation');
  validateColorValue(lightness, 1, 'lightness');
  validateColorValue(alpha, 1, 'alpha');
  return { hue, saturation, lightness, alpha };
}

/**
 * Creates a new ColorHSV object with validated values.
 * @param hue - Hue component (0-360)
 * @param saturation - Saturation component (0-1)
 * @param value - Value component (0-1)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorHSV object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorHSV(hue: number, saturation: number, value: number, alpha: number = 1): ColorHSV {
  validateColorValue(hue, 360, 'hue');
  validateColorValue(saturation, 1, 'saturation');
  validateColorValue(value, 1, 'value');
  validateColorValue(alpha, 1, 'alpha');
  return { hue, saturation, value, alpha };
}

/**
 * Creates a new ColorLAB object with validated values.
 * @param lightness - Lightness component (0-100)
 * @param a - Green-red axis component
 * @param b - Blue-yellow axis component
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorLAB object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorLAB(lightness: number, a: number, b: number, alpha: number = 1): ColorLAB {
  validateColorValue(lightness, Number.MAX_VALUE, 'lightness');
  validateColorValue(alpha, 1, 'alpha');
  return { lightness, a, b, alpha };
}

/**
 * Creates a new ColorLCH object with validated values.
 * @param lightness - Lightness component (0-100)
 * @param chroma - Chroma component (0-100+)
 * @param hue - Hue component (0-360)
 * @param alpha - Alpha component (0-1), defaults to 1
 * @returns A new ColorLCH object
 * @throws {RangeError} When any component is outside the valid range
 */
export function createColorLCH(lightness: number, chroma: number, hue: number, alpha: number = 1): ColorLCH {
  validateColorValue(lightness, Number.MAX_VALUE, 'lightness');
  validateColorValue(chroma, Number.MAX_VALUE, 'chroma');
  validateColorValue(hue, 360, 'hue');
  validateColorValue(alpha, 1, 'alpha');
  return { lightness, chroma, hue, alpha };
}

/**
 * Compares two ColorRGBA objects for equality within a small threshold.
 * @param colorA - First color to compare
 * @param colorB - Second color to compare
 * @returns True if colors are equal within the threshold, false otherwise
 */
export function areColorsEqual(colorA: ColorRGBA, colorB: ColorRGBA): boolean {
  return Math.abs(colorA.red - colorB.red) < ALPHA_THRESHOLD &&
         Math.abs(colorA.green - colorB.green) < ALPHA_THRESHOLD &&
         Math.abs(colorA.blue - colorB.blue) < ALPHA_THRESHOLD &&
         Math.abs(colorA.alpha - colorB.alpha) < ALPHA_THRESHOLD;
}

/** White color constant */
export const WHITE_COLOR = createColorRGBA(1, 1, 1);

/** Black color constant */
export const BLACK_COLOR = createColorRGBA(0, 0, 0);

/** Threshold for floating-point comparison operations */
export { ALPHA_THRESHOLD };