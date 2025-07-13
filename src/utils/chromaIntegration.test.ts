import { describe, it, expect } from 'vitest';
import {
  chromaToColorRGBA,
  colorRGBAToChroma,
  chromaToColorHSL,
  colorHSLToChroma,
  chromaToColorLAB,
  colorLABToChroma,
  parseHexColorWithChroma,
  getHexValueWithChroma,
  formatColorValueWithChroma,
} from './chromaIntegration';
import type { ColorRGBA, ColorHSL, ColorLAB } from '../types/color';

describe('chromaIntegration', () => {
  describe('ColorRGBA conversions', () => {
    it('should convert between ColorRGBA and chroma.Color correctly', () => {
      const rgba: ColorRGBA = { red: 0.5, green: 0.25, blue: 0.75, alpha: 0.5 };
      const chromaColor = colorRGBAToChroma(rgba);
      const convertedRgba = chromaToColorRGBA(chromaColor);

      expect(convertedRgba.red).toBeCloseTo(rgba.red);
      expect(convertedRgba.green).toBeCloseTo(rgba.green);
      expect(convertedRgba.blue).toBeCloseTo(rgba.blue);
      expect(convertedRgba.alpha).toBeCloseTo(rgba.alpha);
    });
  });

  describe('ColorHSL conversions', () => {
    it('should convert between ColorHSL and chroma.Color correctly for a chromatic color', () => {
      const hsl: ColorHSL = { hue: 180, saturation: 0.5, lightness: 0.5, alpha: 1 };
      const chromaColor = colorHSLToChroma(hsl);
      const convertedHsl = chromaToColorHSL(chromaColor);

      expect(convertedHsl.hue).toBeCloseTo(hsl.hue);
      expect(convertedHsl.saturation).toBeCloseTo(hsl.saturation);
      expect(convertedHsl.lightness).toBeCloseTo(hsl.lightness);
      expect(convertedHsl.alpha).toBeCloseTo(hsl.alpha);
    });

    it('should convert between ColorHSL and chroma.Color correctly for an achromatic color', () => {
      const achromaticHsl: ColorHSL = { hue: NaN, saturation: 0, lightness: 0.5, alpha: 1 };
      const achromaticChroma = colorHSLToChroma(achromaticHsl);
      const convertedAchromaticHsl = chromaToColorHSL(achromaticChroma);
      expect(convertedAchromaticHsl.hue).toBe(0); // hue should be 0 for achromatic
      expect(convertedAchromaticHsl.saturation).toBeCloseTo(achromaticHsl.saturation);
      expect(convertedAchromaticHsl.lightness).toBeCloseTo(achromaticHsl.lightness);
      expect(convertedAchromaticHsl.alpha).toBeCloseTo(achromaticHsl.alpha);
    });
  });

  describe('ColorLAB conversions', () => {
    it('should convert between ColorLAB and chroma.Color correctly', () => {
      const lab: ColorLAB = { lightness: 50, a: 20, b: -30, alpha: 1 };
      const chromaColor = colorLABToChroma(lab);
      const convertedLab = chromaToColorLAB(chromaColor);

      expect(convertedLab.lightness).toBeCloseTo(lab.lightness);
      expect(convertedLab.a).toBeCloseTo(lab.a);
      expect(convertedLab.b).toBeCloseTo(lab.b);
      expect(convertedLab.alpha).toBeCloseTo(lab.alpha);
    });
  });

  describe('Hex color parsing', () => {
    it('should parse full hex color strings correctly', () => {
      const hex = '#FF0000';
      const rgba = parseHexColorWithChroma(hex);
      expect(rgba.red).toBeCloseTo(1);
      expect(rgba.green).toBeCloseTo(0);
      expect(rgba.blue).toBeCloseTo(0);
      expect(rgba.alpha).toBeCloseTo(1);
    });

    it('should parse short hex color strings correctly', () => {
      const shortHex = '#F00';
      const shortRgba = parseHexColorWithChroma(shortHex);
      expect(shortRgba.red).toBeCloseTo(1);
      expect(shortRgba.green).toBeCloseTo(0);
      expect(shortRgba.blue).toBeCloseTo(0);
      expect(shortRgba.alpha).toBeCloseTo(1);
    });

    it('should parse hex color strings with alpha correctly', () => {
      const hexWithAlpha = '#0000FF80';
      const rgbaWithAlpha = parseHexColorWithChroma(hexWithAlpha);
      expect(rgbaWithAlpha.red).toBeCloseTo(0);
      expect(rgbaWithAlpha.green).toBeCloseTo(0);
      expect(rgbaWithAlpha.blue).toBeCloseTo(1);
      expect(rgbaWithAlpha.alpha).toBeCloseTo(0.5);
    });

    it('should throw an error for invalid hex color strings', () => {
      expect(() => parseHexColorWithChroma('invalid')).toThrow('Invalid hex color string: invalid');
    });
  });

  describe('Hex value retrieval', () => {
    it('should get hex value from ColorRGBA without alpha correctly', () => {
      const rgba: ColorRGBA = { red: 1, green: 0, blue: 0, alpha: 1 };
      expect(getHexValueWithChroma(rgba)).toBe('#ff0000');
    });

    it('should get hex value from ColorRGBA with alpha correctly', () => {
      const rgbaWithAlpha: ColorRGBA = { red: 0, green: 0, blue: 1, alpha: 0.5 };
      expect(getHexValueWithChroma(rgbaWithAlpha)).toBe('#0000ff80');
    });
  });

  describe('CSS color string formatting', () => {
    it('should format ColorRGBA to CSS color string without alpha correctly', () => {
      const rgba: ColorRGBA = { red: 1, green: 0, blue: 0, alpha: 1 };
      expect(formatColorValueWithChroma(rgba)).toBe('rgb(255 0 0)');
    });

    it('should format ColorRGBA to CSS color string with alpha correctly', () => {
      const rgbaWithAlpha: ColorRGBA = { red: 0, green: 1, blue: 0, alpha: 0.75 };
      expect(formatColorValueWithChroma(rgbaWithAlpha)).toBe('rgb(0 255 0 / 0.75)');
    });
  });
});