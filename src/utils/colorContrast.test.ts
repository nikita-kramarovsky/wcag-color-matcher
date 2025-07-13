import { describe, it, expect } from 'vitest';
import { calculateContrastRatio, getColorLightness } from './colorContrast';
import { colorRGBAToChroma } from './chromaIntegration';
import chroma from 'chroma-js';

describe('colorContrast', () => {
  describe('calculateContrastRatio', () => {
    it('should calculate contrast ratio for white on black', () => {
      const white = { red: 1, green: 1, blue: 1, alpha: 1 };
      const black = { red: 0, green: 0, blue: 0, alpha: 1 };
      expect(calculateContrastRatio(white, black)).toBeCloseTo(21);
    });

    it('should calculate contrast ratio for black on white', () => {
      const white = { red: 1, green: 1, blue: 1, alpha: 1 };
      const black = { red: 0, green: 0, blue: 0, alpha: 1 };
      expect(calculateContrastRatio(black, white)).toBeCloseTo(21);
    });

    it('should calculate contrast ratio for red on black', () => {
      const red = { red: 1, green: 0, blue: 0, alpha: 1 };
      const black = { red: 0, green: 0, blue: 0, alpha: 1 };
      expect(calculateContrastRatio(red, black)).toBeCloseTo(5.25);
    });

    it('should calculate contrast ratio for red on white', () => {
      const red = { red: 1, green: 0, blue: 0, alpha: 1 };
      const white = { red: 1, green: 1, blue: 1, alpha: 1 };
      const redChroma = colorRGBAToChroma(red);
      const whiteChroma = colorRGBAToChroma(white);
      expect(calculateContrastRatio(red, white)).toBeCloseTo(chroma.contrast(redChroma, whiteChroma));
    });
  });

  describe('getColorLightness', () => {
    it('should return 1 for white background (dark text)', () => {
      const white = { red: 1, green: 1, blue: 1, alpha: 1 };
      expect(getColorLightness(white)).toBe(1);
    });

    it('should return 0 for black background (light text)', () => {
      const black = { red: 0, green: 0, blue: 0, alpha: 1 };
      expect(getColorLightness(black)).toBe(0);
    });

    it('should return 1 for red background (dark text)', () => {
      const red = { red: 1, green: 0, blue: 0, alpha: 1 };
      expect(getColorLightness(red)).toBe(1);
    });

    it('should return 0 for dark blue background (light text)', () => {
      const darkBlue = { red: 0, green: 0, blue: 139 / 255, alpha: 1 };
      expect(getColorLightness(darkBlue)).toBe(0);
    });

    it('should return 1 for light gray background (dark text)', () => {
      const lightGray = { red: 200 / 255, green: 200 / 255, blue: 200 / 255, alpha: 1 };
      expect(getColorLightness(lightGray)).toBe(1);
    });
  });
});