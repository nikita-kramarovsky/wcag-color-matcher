import chroma from 'chroma-js';
import type { ColorRGBA, ColorHSL, ColorLAB } from '../types/color';

/**
 * Converts a chroma.js Color object to our ColorRGBA interface.
 * @param color - The chroma.js Color object
 * @returns A ColorRGBA object with normalized values (0-1)
 */
export function chromaToColorRGBA(color: chroma.Color): ColorRGBA {
  const [r, g, b, a] = color.rgba();
  return { 
    red: r / 255, 
    green: g / 255, 
    blue: b / 255, 
    alpha: a ?? 1 
  };
}

/**
 * Converts our ColorRGBA interface to a chroma.js Color object.
 * @param color - The ColorRGBA object with normalized values (0-1)
 * @returns A chroma.js Color object
 */
export function colorRGBAToChroma(color: ColorRGBA): chroma.Color {
  return chroma.rgb(
    color.red * 255, 
    color.green * 255, 
    color.blue * 255, 
    color.alpha
  );
}

/**
 * Converts a chroma.js Color object to our ColorHSL interface.
 * @param color - The chroma.js Color object
 * @returns A ColorHSL object
 */
export function chromaToColorHSL(color: chroma.Color): ColorHSL {
  const [h, s, l] = color.hsl();
  const a = color.alpha();
  return {
    hue: h || 0, // Handle NaN for achromatic colors
    saturation: s,
    lightness: l,
    alpha: a
  };
}

/**
 * Converts our ColorHSL interface to a chroma.js Color object.
 * @param color - The ColorHSL object
 * @returns A chroma.js Color object
 */
export function colorHSLToChroma(color: ColorHSL): chroma.Color {
  return chroma.hsl(color.hue, color.saturation, color.lightness, color.alpha);
}

/**
 * Converts a chroma.js Color object to our ColorLAB interface.
 * @param color - The chroma.js Color object
 * @returns A ColorLAB object
 */
export function chromaToColorLAB(color: chroma.Color): ColorLAB {
  const [l, a, b] = color.lab();
  const alpha = color.alpha();
  return {
    lightness: l,
    a: a,
    b: b,
    alpha: alpha
  };
}

/**
 * Converts our ColorLAB interface to a chroma.js Color object.
 * @param color - The ColorLAB object
 * @returns A chroma.js Color object
 */
export function colorLABToChroma(color: ColorLAB): chroma.Color {
  return chroma.lab(color.lightness, color.a, color.b, color.alpha);
}

/**
 * Creates a ColorRGBA from a hex string using chroma.js.
 * @param hexString - Hex color string (e.g., "#FF0000", "#F00")
 * @returns A ColorRGBA object
 * @throws {Error} When the hex string is invalid
 */
export function parseHexColorWithChroma(hexString: string): ColorRGBA {
  try {
    const color = chroma(hexString);
    return chromaToColorRGBA(color);
  } catch {
    throw new Error(`Invalid hex color string: ${hexString}`);
  }
}

/**
 * Converts a ColorRGBA to a hex string using chroma.js.
 * @param color - The ColorRGBA object to convert
 * @returns A hex color string (e.g., "#FF0000" or "#FF0000FF" with alpha)
 */
export function getHexValueWithChroma(color: ColorRGBA): string {
  const chromaColor = colorRGBAToChroma(color);
  return color.alpha < 1 ? chromaColor.hex('rgba') : chromaColor.hex();
}

/**
 * Formats a ColorRGBA as a CSS color string using chroma.js.
 * @param color - The ColorRGBA object to format
 * @returns A CSS color string (e.g., "rgba(255, 0, 0, 1)")
 */
export function formatColorValueWithChroma(color: ColorRGBA): string {
  return colorRGBAToChroma(color).css();
}