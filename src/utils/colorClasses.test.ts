import { describe, it, expect } from 'vitest';
import {
  clampValue,
  createColorRGBA,
  createColorHSL,
  createColorHSV,
  createColorLAB,
  createColorLCH,
  areColorsEqual,
  createColorFromString,
  interpolateColors,
  WHITE_COLOR,
  BLACK_COLOR,
} from './colorClasses';

describe('colorClasses', () => {
  describe('clampValue', () => {
    it('should return the value if it is within the range', () => {
      expect(clampValue(5, 0, 10)).toBe(5);
    });

    it('should return the minimum value if the value is below the minimum', () => {
      expect(clampValue(-5, 0, 10)).toBe(0);
    });

    it('should return the maximum value if the value is above the maximum', () => {
      expect(clampValue(15, 0, 10)).toBe(10);
    });

    it('should return the value if min and max are equal to the value', () => {
      expect(clampValue(0, 0, 0)).toBe(0);
    });
  });

  describe('createColorRGBA', () => {
    it('should create ColorRGBA with specified alpha', () => {
      const color = createColorRGBA(0.5, 0.25, 0.75, 0.5);
      expect(color.red).toBeCloseTo(0.5);
      expect(color.green).toBeCloseTo(0.25);
      expect(color.blue).toBeCloseTo(0.75);
      expect(color.alpha).toBeCloseTo(0.5);
    });

    it('should create ColorRGBA with default alpha of 1', () => {
      const defaultAlphaColor = createColorRGBA(0.1, 0.2, 0.3);
      expect(defaultAlphaColor.alpha).toBeCloseTo(1);
    });
  });

  describe('createColorHSL', () => {
    it('should create ColorHSL with specified alpha', () => {
      const color = createColorHSL(180, 0.5, 0.5, 0.7);
      expect(color.hue).toBeCloseTo(180);
      expect(color.saturation).toBeCloseTo(0.5);
      expect(color.lightness).toBeCloseTo(0.5);
      expect(color.alpha).toBeCloseTo(0.7);
    });

    it('should create ColorHSL with default alpha of 1', () => {
      const defaultAlphaColor = createColorHSL(0, 0, 0);
      expect(defaultAlphaColor.alpha).toBeCloseTo(1);
    });

    it('should handle achromatic color for ColorHSL', () => {
      const achromatic = createColorHSL(NaN, 0, 0.5);
      expect(achromatic.hue).toBe(0);
      expect(achromatic.saturation).toBeCloseTo(0);
      expect(achromatic.lightness).toBeCloseTo(0.5);
    });
  });

  describe('createColorHSV', () => {
    it('should create ColorHSV with specified alpha', () => {
      const color = createColorHSV(240, 0.8, 0.9, 0.6);
      expect(color.hue).toBeCloseTo(240);
      expect(color.saturation).toBeCloseTo(0.8);
      expect(color.value).toBeCloseTo(0.9);
      expect(color.alpha).toBeCloseTo(0.6);
    });

    it('should create ColorHSV with default alpha of 1', () => {
      const defaultAlphaColor = createColorHSV(0, 0, 0);
      expect(defaultAlphaColor.alpha).toBeCloseTo(1);
    });

    it('should handle achromatic color for ColorHSV', () => {
      const achromatic = createColorHSV(NaN, 0, 0.5);
      expect(achromatic.hue).toBe(0);
      expect(achromatic.saturation).toBeCloseTo(0);
      expect(achromatic.value).toBeCloseTo(0.5);
    });
  });

  describe('createColorLAB', () => {
    it('should create ColorLAB with specified alpha', () => {
      const color = createColorLAB(50, 20, -30, 0.8);
      expect(color.lightness).toBeCloseTo(50);
      expect(color.a).toBeCloseTo(20);
      expect(color.b).toBeCloseTo(-30);
      expect(color.alpha).toBeCloseTo(0.8);
    });

    it('should create ColorLAB with default alpha of 1', () => {
      const defaultAlphaColor = createColorLAB(0, 0, 0);
      expect(defaultAlphaColor.alpha).toBeCloseTo(1);
    });
  });

  describe('createColorLCH', () => {
    it('should create ColorLCH with specified alpha', () => {
      const color = createColorLCH(70, 30, 120, 0.9);
      expect(color.lightness).toBeCloseTo(70);
      expect(color.chroma).toBeCloseTo(30);
      expect(color.hue).toBeCloseTo(120);
      expect(color.alpha).toBeCloseTo(0.9);
    });

    it('should create ColorLCH with default alpha of 1', () => {
      const defaultAlphaColor = createColorLCH(0, 0, 0);
      expect(defaultAlphaColor.alpha).toBeCloseTo(1);
    });

    it('should handle achromatic color for ColorLCH', () => {
      const achromatic = createColorLCH(50, 0, NaN);
      expect(achromatic.lightness).toBeCloseTo(50);
      expect(achromatic.chroma).toBeCloseTo(0);
      expect(achromatic.hue).toBe(0);
    });
  });

  describe('areColorsEqual', () => {
    it('should return true for identical colors', () => {
      const color1 = createColorRGBA(0.5, 0.5, 0.5, 1);
      const color2 = createColorRGBA(0.5, 0.5, 0.5, 1);
      expect(areColorsEqual(color1, color2)).toBe(true);
    });

    it('should return false for different colors', () => {
      const color1 = createColorRGBA(0.5, 0.5, 0.5, 1);
      const color3 = createColorRGBA(0.6, 0.5, 0.5, 1);
      expect(areColorsEqual(color1, color3)).toBe(false);
    });

    it('should return false for colors with different alpha values', () => {
      const color1 = createColorRGBA(0.5, 0.5, 0.5, 1);
      const color4 = createColorRGBA(0.5, 0.5, 0.5, 0.5);
      expect(color1.alpha).not.toBeCloseTo(color4.alpha);
    });

    it('should return true for colors within the given threshold', () => {
      const color1 = createColorRGBA(0.5, 0.5, 0.5, 1);
      const color5 = createColorRGBA(0.500001, 0.5, 0.5, 1);
      expect(areColorsEqual(color1, color5, 0.00001)).toBe(true);
    });
  });

  describe('createColorFromString', () => {
    it('should create color from named string correctly', () => {
      const red = createColorFromString('red');
      expect(red.red).toBeCloseTo(1);
      expect(red.green).toBeCloseTo(0);
      expect(red.blue).toBeCloseTo(0);
    });

    it('should create color from hex string correctly', () => {
      const hex = createColorFromString('#00FF00');
      expect(hex.red).toBeCloseTo(0);
      expect(hex.green).toBeCloseTo(1);
      expect(hex.blue).toBeCloseTo(0);
    });

    it('should create color from rgb string correctly', () => {
      const rgb = createColorFromString('rgb(0, 0, 255)');
      expect(rgb.red).toBeCloseTo(0);
      expect(rgb.green).toBeCloseTo(0);
      expect(rgb.blue).toBeCloseTo(1);
    });

    it('should throw an error for invalid color string', () => {
      expect(() => createColorFromString('invalid color')).toThrow();
    });
  });

  describe('interpolateColors', () => {
    it('should interpolate between black and white at midpoint', () => {
      const colorA = createColorRGBA(0, 0, 0, 1); // Black
      const colorB = createColorRGBA(1, 1, 1, 1); // White
      const midColor = interpolateColors(colorA, colorB, 0.5);
      expect(midColor.red).toBeCloseTo(0.5, 1);
      expect(midColor.green).toBeCloseTo(0.5, 1);
      expect(midColor.blue).toBeCloseTo(0.5, 1);
    });

    it('should interpolate between black and white at quarter point', () => {
      const colorA = createColorRGBA(0, 0, 0, 1); // Black
      const colorB = createColorRGBA(1, 1, 1, 1); // White
      const quarterColor = interpolateColors(colorA, colorB, 0.25);
      expect(quarterColor.red).toBeCloseTo(0.25, 1);
    });

    it('should interpolate between black and white at three-quarter point', () => {
      const colorA = createColorRGBA(0, 0, 0, 1); // Black
      const colorB = createColorRGBA(1, 1, 1, 1); // White
      const threeQuarterColor = interpolateColors(colorA, colorB, 0.75);
      expect(threeQuarterColor.red).toBeCloseTo(0.75, 1);
    });

    it('should interpolate between red and blue in LAB color space', () => {
      const red = createColorRGBA(1, 0, 0, 1);
      const blue = createColorRGBA(0, 0, 1, 1);
      const interpolatedLab = interpolateColors(red, blue, 0.5, 'lab');
      expect(interpolatedLab.red).not.toBeCloseTo(0);
      expect(interpolatedLab.blue).not.toBeCloseTo(0);
    });
  });

  describe('Color constants', () => {
    it('should have correct WHITE_COLOR constant', () => {
      expect(WHITE_COLOR.red).toBeCloseTo(1);
      expect(WHITE_COLOR.green).toBeCloseTo(1);
      expect(WHITE_COLOR.blue).toBeCloseTo(1);
      expect(WHITE_COLOR.alpha).toBeCloseTo(1);
    });

    it('should have correct BLACK_COLOR constant', () => {
      expect(BLACK_COLOR.red).toBeCloseTo(0);
      expect(BLACK_COLOR.green).toBeCloseTo(0);
      expect(BLACK_COLOR.blue).toBeCloseTo(0);
      expect(BLACK_COLOR.alpha).toBeCloseTo(1);
    });
  });
});