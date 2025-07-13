import { describe, it, expect } from 'vitest';
import {
  formatColorValue,
  getHexValue,
  parseHexColor,
  linearizeColorValue,
  delinearizeColorValue,
  normalizeLab,
  denormalizeLab,
  convertRgbToHsl,
  convertHslToRgb,
  convertRgbToHsv,
  convertHsvToRgb,
  convertRgbToLab,
  convertLabToLch,
  convertHsvToHsl,
  adjustHue,
} from './colorConversions';
import type { ColorRGBA, ColorHSL, ColorHSV, ColorLAB } from '../types/color';

describe('colorConversions', () => {
  describe('formatColorValue', () => {
    it('should format ColorRGBA to CSS color string without alpha correctly', () => {
      const rgba: ColorRGBA = { red: 1, green: 0, blue: 0, alpha: 1 };
      expect(formatColorValue(rgba)).toBe('rgb(255 0 0)');
    });

    it('should format ColorRGBA to CSS color string with alpha correctly', () => {
      const rgbaWithAlpha: ColorRGBA = { red: 0, green: 1, blue: 0, alpha: 0.75 };
      expect(formatColorValue(rgbaWithAlpha)).toBe('rgb(0 255 0 / 0.75)');
    });
  });

  describe('getHexValue', () => {
    it('should get hex value from ColorRGBA without alpha correctly', () => {
      const rgba: ColorRGBA = { red: 1, green: 0, blue: 0, alpha: 1 };
      expect(getHexValue(rgba)).toBe('#ff0000');
    });

    it('should get hex value from ColorRGBA with alpha correctly', () => {
      const rgbaWithAlpha: ColorRGBA = { red: 0, green: 0, blue: 1, alpha: 0.5 };
      expect(getHexValue(rgbaWithAlpha)).toBe('#0000ff80');
    });
  });

  describe('parseHexColor', () => {
    it('should parse full hex color strings correctly', () => {
      const hex = '#FF0000';
      const rgba = parseHexColor(hex);
      expect(rgba.red).toBeCloseTo(1);
      expect(rgba.green).toBeCloseTo(0);
      expect(rgba.blue).toBeCloseTo(0);
      expect(rgba.alpha).toBeCloseTo(1);
    });

    it('should parse short hex color strings correctly', () => {
      const shortHex = '#F00';
      const shortRgba = parseHexColor(shortHex);
      expect(shortRgba.red).toBeCloseTo(1);
      expect(shortRgba.green).toBeCloseTo(0);
      expect(shortRgba.blue).toBeCloseTo(0);
      expect(shortRgba.alpha).toBeCloseTo(1);
    });

    it('should parse hex color strings with alpha correctly', () => {
      const hexWithAlpha = '#0000FF80';
      const rgbaWithAlpha = parseHexColor(hexWithAlpha);
      expect(rgbaWithAlpha.red).toBeCloseTo(0);
      expect(rgbaWithAlpha.green).toBeCloseTo(0);
      expect(rgbaWithAlpha.blue).toBeCloseTo(1);
      expect(rgbaWithAlpha.alpha).toBeCloseTo(0.5);
    });

    it('should throw an error for invalid hex color strings', () => {
      expect(() => parseHexColor('invalid')).toThrow();
    });
  });

  describe('linearizeColorValue and delinearizeColorValue', () => {
    it('should linearize and delinearize normal color values correctly', () => {
      const value = 0.5;
      const linearized = linearizeColorValue(value);
      const delinearized = delinearizeColorValue(linearized);
      expect(delinearized).toBeCloseTo(value);
    });

    it('should linearize and delinearize small color values correctly', () => {
      const smallValue = 0.01;
      const linearizedSmall = linearizeColorValue(smallValue);
      const delinearizedSmall = delinearizeColorValue(linearizedSmall);
      expect(delinearizedSmall).toBeCloseTo(smallValue);
    });

    it('should linearize and delinearize color values around threshold correctly', () => {
      const thresholdValueLinearize = 0.04045;
      const linearizedThreshold = linearizeColorValue(thresholdValueLinearize);
      const delinearizedThreshold = delinearizeColorValue(linearizedThreshold);
      expect(delinearizedThreshold).toBeCloseTo(thresholdValueLinearize);
    });

    it('should linearize and delinearize color values below threshold correctly', () => {
      const valueBelowThresholdLinearize = 0.03;
      const linearizedBelowThreshold = linearizeColorValue(valueBelowThresholdLinearize);
      const delinearizedBelowThreshold = delinearizeColorValue(linearizedBelowThreshold);
      expect(delinearizedBelowThreshold).toBeCloseTo(valueBelowThresholdLinearize);
    });

    it('should delinearize and linearize color values around threshold correctly', () => {
      const thresholdValueDelinearize = 0.0031308;
      const delinearizedThresholdDelinearize = delinearizeColorValue(thresholdValueDelinearize);
      const linearizedThresholdDelinearize = linearizeColorValue(delinearizedThresholdDelinearize);
      expect(linearizedThresholdDelinearize).toBeCloseTo(thresholdValueDelinearize);
    });

    it('should delinearize and linearize color values below threshold correctly', () => {
      const valueBelowThresholdDelinearize = 0.002;
      const delinearizedBelowThresholdDelinearize = delinearizeColorValue(valueBelowThresholdDelinearize);
      const linearizedBelowThresholdDelinearize = linearizeColorValue(delinearizedBelowThresholdDelinearize);
      expect(linearizedBelowThresholdDelinearize).toBeCloseTo(valueBelowThresholdDelinearize);
    });
  });

  describe('normalizeLab and denormalizeLab', () => {
    it('should normalize and denormalize normal LAB values correctly', () => {
      const value = 0.5;
      const normalized = normalizeLab(value);
      const denormalized = denormalizeLab(normalized);
      expect(denormalized).toBeCloseTo(value);
    });

    it('should normalize and denormalize small LAB values correctly', () => {
      const smallValue = 0.001;
      const normalizedSmall = normalizeLab(smallValue);
      const denormalizedSmall = denormalizeLab(normalizedSmall);
      expect(denormalizedSmall).toBeCloseTo(smallValue);
    });
  });

  describe('RGB to HSL and back conversion', () => {
    it('should convert RGB to HSL and back correctly', () => {
      const rgba: ColorRGBA = { red: 0.5, green: 0.25, blue: 0.75, alpha: 1 };
      const hsl = convertRgbToHsl(rgba);
      const convertedRgba = convertHslToRgb(hsl);

      expect(convertedRgba.red).toBeCloseTo(rgba.red);
      expect(convertedRgba.green).toBeCloseTo(rgba.green);
      expect(convertedRgba.blue).toBeCloseTo(rgba.blue);
      expect(convertedRgba.alpha).toBeCloseTo(rgba.alpha);
    });
  });

  describe('RGB to HSV and back conversion', () => {
    it('should convert RGB to HSV and back correctly', () => {
      const rgba: ColorRGBA = { red: 0.5, green: 0.25, blue: 0.75, alpha: 1 };
      const hsv = convertRgbToHsv(rgba);
      const convertedRgba = convertHsvToRgb(hsv);

      expect(convertedRgba.red).toBeCloseTo(rgba.red);
      expect(convertedRgba.green).toBeCloseTo(rgba.green);
      expect(convertedRgba.blue).toBeCloseTo(rgba.blue);
      expect(convertedRgba.alpha).toBeCloseTo(rgba.alpha);
    });
  });

  describe('RGB to LAB conversion', () => {
    it('should convert RGB to LAB correctly', () => {
      const rgba: ColorRGBA = { red: 0.5, green: 0.25, blue: 0.75, alpha: 1 };
      const lab = convertRgbToLab(rgba);
      expect(lab.lightness).toBeGreaterThan(0);
      expect(lab.lightness).toBeLessThan(100);
    });
  });

  describe('LAB to LCH conversion', () => {
    it('should convert LAB to LCH correctly', () => {
      const lab: ColorLAB = { lightness: 50, a: 20, b: -30, alpha: 1 };
      const lch = convertLabToLch(lab);
      expect(lch.lightness).toBeCloseTo(lab.lightness);
      expect(lch.chroma).toBeGreaterThan(0);
      expect(lch.hue).toBeGreaterThanOrEqual(0);
      expect(lch.hue).toBeLessThan(360);
    });
  });

  describe('HSV to HSL conversion', () => {
    it('should convert HSV to HSL correctly', () => {
      const hsv: ColorHSV = { hue: 180, saturation: 0.5, value: 0.5, alpha: 1 };
      const hsl = convertHsvToHsl(hsv);
      expect(hsl.hue).toBeCloseTo(hsv.hue);
      expect(hsl.saturation).toBeGreaterThanOrEqual(0);
      expect(hsl.lightness).toBeGreaterThanOrEqual(0);
    });
  });

  describe('adjustHue', () => {
    it('should adjust hue by a positive delta correctly', () => {
      const hsl: ColorHSL = { hue: 180, saturation: 0.5, lightness: 0.5, alpha: 1 };
      const adjusted = adjustHue(hsl, 90);
      expect(adjusted.hue).toBeCloseTo(270);
    });

    it('should adjust hue by a negative delta correctly', () => {
      const hsl: ColorHSL = { hue: 180, saturation: 0.5, lightness: 0.5, alpha: 1 };
      const adjustedNegative = adjustHue(hsl, -200);
      expect(adjustedNegative.hue).toBeCloseTo(340); // 180 - 200 = -20, +360 = 340
    });

    it('should wrap hue around 360 degrees correctly', () => {
      const hsl: ColorHSL = { hue: 180, saturation: 0.5, lightness: 0.5, alpha: 1 };
      const adjustedWrap = adjustHue(hsl, 200);
      expect(adjustedWrap.hue).toBeCloseTo(20); // 180 + 200 = 380, %360 = 20
    });
  });
});