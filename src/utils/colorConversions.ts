import chroma from 'chroma-js';
import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB, ColorLCH } from '../types/color';
import { chromaToColorRGBA, colorRGBAToChroma, chromaToColorHSL, chromaToColorLAB } from './chromaIntegration';
import { createColorHSV, createColorLCH, createColorFromString } from './colorClasses';

/**
 * Formats a ColorRGBA object as a CSS rgba() string.
 * @param color - The ColorRGBA object to format
 * @returns A CSS rgba() string representation
 */
export function formatColorValue(color: ColorRGBA): string {
  return colorRGBAToChroma(color).css();
}

/**
 * Converts a ColorRGBA object to a hexadecimal color string.
 * @param color - The ColorRGBA object to convert
 * @returns A hexadecimal color string (e.g., #FF0000 or #FF0000FF with alpha)
 */
export function getHexValue(color: ColorRGBA): string {
  const chromaColor = colorRGBAToChroma(color);
  return color.alpha < 1 ? chromaColor.hex('rgba') : chromaColor.hex();
}

/**
 * Parses a hexadecimal color string into a ColorRGBA object.
 * @param hexString - The hexadecimal color string to parse (e.g., #FF0000, #F00, #FF0000FF)
 * @returns A ColorRGBA object
 * @throws {Error} When the hex string format is invalid
 */
export function parseHexColor(hexString: string): ColorRGBA {
  return createColorFromString(hexString);
}

/**
 * Converts a sRGB color value to linear RGB using gamma correction.
 * @param value - The sRGB color value (0-1)
 * @returns The linear RGB value (0-1)
 */
export function linearizeColorValue(value: number): number {
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

/**
 * Converts a linear RGB color value to sRGB using gamma correction.
 * @param value - The linear RGB color value (0-1)
 * @returns The sRGB value (0-1)
 */
export function delinearizeColorValue(value: number): number {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

/**
 * Normalizes a value for LAB color space conversion.
 * @param value - The value to normalize
 * @returns The normalized value
 */
export function normalizeLab(value: number): number {
  const threshold = 6 / 29;
  return value > Math.pow(threshold, 3) ? Math.pow(value, 1 / 3) : (1 / (3 * Math.pow(threshold, 2))) * value + 4 / 29;
}

/**
 * Denormalizes a value from LAB color space conversion.
 * @param value - The value to denormalize
 * @returns The denormalized value
 */
export function denormalizeLab(value: number): number {
  const threshold = 6 / 29;
  return value > threshold ? Math.pow(value, 3) : (3 * Math.pow(threshold, 2)) * (value - 4 / 29);
}

/**
 * Converts a ColorRGBA object to ColorHSL (Hue, Saturation, Lightness).
 * @param rgbColor - The ColorRGBA object to convert
 * @returns A ColorHSL object
 */
export function convertRgbToHsl(rgbColor: ColorRGBA): ColorHSL {
  const chromaColor = colorRGBAToChroma(rgbColor);
  return chromaToColorHSL(chromaColor);
}

/**
 * Converts a ColorHSL object to ColorRGBA (Red, Green, Blue, Alpha).
 * @param hslColor - The ColorHSL object to convert
 * @returns A ColorRGBA object
 */
export function convertHslToRgb(hslColor: ColorHSL): ColorRGBA {
  const chromaColor = chroma.hsl(hslColor.hue, hslColor.saturation, hslColor.lightness, hslColor.alpha);
  return chromaToColorRGBA(chromaColor);
}

/**
 * Converts a ColorRGBA object to ColorHSV (Hue, Saturation, Value).
 * @param rgbColor - The ColorRGBA object to convert
 * @returns A ColorHSV object
 */
export function convertRgbToHsv(rgbColor: ColorRGBA): ColorHSV {
  const chromaColor = colorRGBAToChroma(rgbColor);
  const [h, s, v] = chromaColor.hsv();
  return createColorHSV(h || 0, s, v, rgbColor.alpha);
}

/**
 * Converts a ColorHSV object to ColorRGBA (Red, Green, Blue, Alpha).
 * @param hsvColor - The ColorHSV object to convert
 * @returns A ColorRGBA object
 */
export function convertHsvToRgb(hsvColor: ColorHSV): ColorRGBA {
  const chromaColor = chroma.hsv(hsvColor.hue, hsvColor.saturation, hsvColor.value, hsvColor.alpha);
  return chromaToColorRGBA(chromaColor);
}

/**
 * Converts a ColorRGBA object to ColorLAB (L*a*b*) color space.
 * @param rgbColor - The ColorRGBA object to convert
 * @returns A ColorLAB object
 */
export function convertRgbToLab(rgbColor: ColorRGBA): ColorLAB {
  const chromaColor = colorRGBAToChroma(rgbColor);
  return chromaToColorLAB(chromaColor);
}

/**
 * Converts a ColorLAB object to ColorLCH (Lightness, Chroma, Hue).
 * @param labColor - The ColorLAB object to convert
 * @returns A ColorLCH object
 */
export function convertLabToLch(labColor: ColorLAB): ColorLCH {
  const chromaColor = chroma.lab(labColor.lightness, labColor.a, labColor.b, labColor.alpha);
  const [l, c, h] = chromaColor.lch();
  return createColorLCH(l, c, h || 0, labColor.alpha);
}

/**
 * Converts a ColorHSV object to ColorHSL (Hue, Saturation, Lightness).
 * @param hsvColor - The ColorHSV object to convert
 * @returns A ColorHSL object
 */
export function convertHsvToHsl(hsvColor: ColorHSV): ColorHSL {
  const chromaColor = chroma.hsv(hsvColor.hue, hsvColor.saturation, hsvColor.value, hsvColor.alpha);
  return chromaToColorHSL(chromaColor);
}

/**
 * Adjusts the hue of a ColorHSL object by a given delta value.
 * @param hslColor - The ColorHSL object to adjust
 * @param hueDelta - The amount to adjust the hue by (in degrees)
 * @returns A new ColorHSL object with adjusted hue
 */
export function adjustHue(hslColor: ColorHSL, hueDelta: number): ColorHSL {
  const chromaColor = chroma.hsl(hslColor.hue, hslColor.saturation, hslColor.lightness, hslColor.alpha);
  const adjustedColor = chromaColor.set('hsl.h', (hslColor.hue + hueDelta + 360) % 360);
  return chromaToColorHSL(adjustedColor);
}