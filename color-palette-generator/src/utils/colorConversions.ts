import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB, ColorLCH } from '../types/color';
import { createColorRGBA, createColorHSL, createColorHSV, createColorLAB, createColorLCH, clampValue, ALPHA_THRESHOLD } from './colorClasses';

// Color format conversions
export function formatColorValue(color: ColorRGBA): string {
  return `rgba(${Math.round(color.red * 100)}%, ${Math.round(color.green * 100)}%, ${Math.round(color.blue * 100)}%, ${color.alpha})`;
}

export function convertToHex(value: number): string {
  const hex = Math.round(value).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export function getHexValue(color: ColorRGBA): string {
  const alphaHex = 1 - color.alpha < ALPHA_THRESHOLD ? '' : convertToHex(Math.round(255 * color.alpha));
  return '#' + convertToHex(Math.round(255 * color.red)) + 
         convertToHex(Math.round(255 * color.green)) + 
         convertToHex(Math.round(255 * color.blue)) + alphaHex;
}

export function parseHexColor(hexString: string): ColorRGBA {
  const cleanHex = hexString.startsWith('#') ? hexString.substring(1) : hexString;
  
  if (!/^[a-fA-F0-9]{3,8}$/.test(cleanHex)) {
    throw new Error('Invalid hex color string: ' + hexString);
  }

  let hexParts: string[];
  if (cleanHex.length === 3 || cleanHex.length === 4) {
    hexParts = cleanHex.split('').map(part => part + part);
    if (cleanHex.length === 3) hexParts.push('ff');
  } else if (cleanHex.length === 6 || cleanHex.length === 8) {
    hexParts = [cleanHex.substring(0, 2), cleanHex.substring(2, 4), cleanHex.substring(4, 6)];
    if (cleanHex.length === 8) hexParts.push(cleanHex.substring(6, 8));
    else hexParts.push('ff');
  } else {
    throw new Error('Invalid hex color string length: ' + cleanHex);
  }

  const red = parseInt(hexParts[0], 16) / 255;
  const green = parseInt(hexParts[1], 16) / 255;
  const blue = parseInt(hexParts[2], 16) / 255;
  const alpha = parseInt(hexParts[3], 16) / 255;

  return createColorRGBA(red, green, blue, alpha);
}

// Gamma correction functions
export function linearizeColorValue(value: number): number {
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

export function delinearizeColorValue(value: number): number {
  return value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

// LAB normalization functions
export function normalizeLab(value: number): number {
  const threshold = 6 / 29;
  return value > Math.pow(threshold, 3) ? Math.pow(value, 1 / 3) : (1 / (3 * Math.pow(threshold, 2))) * value + 4 / 29;
}

export function denormalizeLab(value: number): number {
  const threshold = 6 / 29;
  return value > threshold ? Math.pow(value, 3) : (3 * Math.pow(threshold, 2)) * (value - 4 / 29);
}

// Color space conversions
export function convertRgbToHsl(rgbColor: ColorRGBA): ColorHSL {
  const maxValue = Math.max(rgbColor.red, rgbColor.green, rgbColor.blue);
  const minValue = Math.min(rgbColor.red, rgbColor.green, rgbColor.blue);
  let hue = 0;
  let saturation = 0;
  const lightness = clampValue(0.5 * (maxValue + minValue), 0, 1);

  if (maxValue - minValue > ALPHA_THRESHOLD) {
    if (maxValue === rgbColor.red) {
      hue = 60 * ((rgbColor.green - rgbColor.blue) / (maxValue - minValue));
    } else if (maxValue === rgbColor.green) {
      hue = 60 * ((rgbColor.blue - rgbColor.red) / (maxValue - minValue)) + 120;
    } else {
      hue = 60 * ((rgbColor.red - rgbColor.green) / (maxValue - minValue)) + 240;
    }

    saturation = lightness > 0 && lightness <= 0.5 ? 
      clampValue((maxValue - minValue) / (2 * lightness), 0, 1) : 
      clampValue((maxValue - minValue) / (2 - 2 * lightness), 0, 1);
  }
  hue = Math.round(hue + 360) % 360;
  return createColorHSL(hue, saturation, lightness, rgbColor.alpha);
}

export function convertHslToRgb(hslColor: ColorHSL): ColorRGBA {
  const chroma = (1 - Math.abs(2 * hslColor.lightness - 1)) * hslColor.saturation;
  const m = hslColor.lightness - chroma / 2;
  let r: number, g: number, b: number;
  const h_prime = hslColor.hue / 60;
  const x = chroma * (1 - Math.abs(h_prime % 2 - 1));

  if (0 <= h_prime && h_prime < 1) { r = chroma; g = x; b = 0; }
  else if (1 <= h_prime && h_prime < 2) { r = x; g = chroma; b = 0; }
  else if (2 <= h_prime && h_prime < 3) { r = 0; g = chroma; b = x; }
  else if (3 <= h_prime && h_prime < 4) { r = 0; g = x; b = chroma; }
  else if (4 <= h_prime && h_prime < 5) { r = x; g = 0; b = chroma; }
  else if (5 <= h_prime && h_prime < 6) { r = chroma; g = 0; b = x; }
  else { r = 0; g = 0; b = 0; }

  return createColorRGBA(r + m, g + m, b + m, hslColor.alpha);
}

export function convertRgbToHsv(rgbColor: ColorRGBA): ColorHSV {
  const maxValue = Math.max(rgbColor.red, rgbColor.green, rgbColor.blue);
  const minValue = Math.min(rgbColor.red, rgbColor.green, rgbColor.blue);
  let hue = 0;
  let saturation = 0;
  
  if (maxValue - minValue > ALPHA_THRESHOLD) {
    saturation = (maxValue - minValue) / maxValue;
    if (maxValue === rgbColor.red) {
      hue = 60 * ((rgbColor.green - rgbColor.blue) / (maxValue - minValue));
    } else if (maxValue === rgbColor.green) {
      hue = 60 * ((rgbColor.blue - rgbColor.red) / (maxValue - minValue)) + 120;
    } else {
      hue = 60 * ((rgbColor.red - rgbColor.green) / (maxValue - minValue)) + 240;
    }
  }
  hue = Math.round(hue + 360) % 360;
  return createColorHSV(hue, saturation, maxValue, rgbColor.alpha);
}

export function convertHsvToRgb(hsvColor: ColorHSV): ColorRGBA {
  const chroma = hsvColor.value * hsvColor.saturation;
  const m = hsvColor.value - chroma;
  let r: number, g: number, b: number;
  const h_prime = hsvColor.hue / 60;
  const x = chroma * (1 - Math.abs(h_prime % 2 - 1));

  if (0 <= h_prime && h_prime < 1) { r = chroma; g = x; b = 0; }
  else if (1 <= h_prime && h_prime < 2) { r = x; g = chroma; b = 0; }
  else if (2 <= h_prime && h_prime < 3) { r = 0; g = chroma; b = x; }
  else if (3 <= h_prime && h_prime < 4) { r = 0; g = x; b = chroma; }
  else if (4 <= h_prime && h_prime < 5) { r = x; g = 0; b = chroma; }
  else if (5 <= h_prime && h_prime < 6) { r = chroma; g = 0; b = x; }
  else { r = 0; g = 0; b = 0; }

  return createColorRGBA(r + m, g + m, b + m, hsvColor.alpha);
}

export function convertRgbToLab(rgbColor: ColorRGBA): ColorLAB {
  const linearRed = linearizeColorValue(rgbColor.red);
  const linearGreen = linearizeColorValue(rgbColor.green);
  const linearBlue = linearizeColorValue(rgbColor.blue);

  // Convert to XYZ first (D65 illuminant, 2-degree observer)
  const X = 0.4124564 * linearRed + 0.3575761 * linearGreen + 0.1804375 * linearBlue;
  const Y = 0.2126729 * linearRed + 0.7151522 * linearGreen + 0.072175 * linearBlue;
  const Z = 0.0193339 * linearRed + 0.119192 * linearGreen + 0.9503041 * linearBlue;

  // Reference White D65
  const Xn = 0.95047;
  const Yn = 1.00000;
  const Zn = 1.08883;

  const fX = normalizeLab(X / Xn);
  const fY = normalizeLab(Y / Yn);
  const fZ = normalizeLab(Z / Zn);

  const L = 116 * fY - 16;
  const a = 500 * (fX - fY);
  const b = 200 * (fY - fZ);

  return createColorLAB(L, a, b, rgbColor.alpha);
}

export function convertLabToLch(labColor: ColorLAB): ColorLCH {
  return createColorLCH(
    labColor.lightness,
    Math.sqrt(Math.pow(labColor.a, 2) + Math.pow(labColor.b, 2)),
    (180 * Math.atan2(labColor.b, labColor.a) / Math.PI + 360) % 360,
    labColor.alpha
  );
}

export function convertHsvToHsl(hsvColor: ColorHSV): ColorHSL {
  const lightness = clampValue((2 - hsvColor.saturation) * hsvColor.value / 2, 0, 1);
  let saturation = 0;
  if (0 < lightness && 1 > lightness) {
    saturation = hsvColor.saturation * hsvColor.value / (0.5 > lightness ? 2 * lightness : 2 - 2 * lightness);
  }
  saturation = clampValue(saturation, 0, 1);
  return createColorHSL(hsvColor.hue, saturation, lightness, hsvColor.alpha);
}

export function adjustHue(hslColor: ColorHSL, hueDelta: number): ColorHSL {
  return createColorHSL((hslColor.hue + hueDelta + 360) % 360, hslColor.saturation, hslColor.lightness, hslColor.alpha);
}

export function getOpaqueColor(color: ColorRGBA): ColorRGBA {
  return 1 - color.alpha < ALPHA_THRESHOLD ? color : createColorRGBA(color.red, color.green, color.blue);
}