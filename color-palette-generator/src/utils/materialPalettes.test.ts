import { describe, it, expect } from 'vitest';
import { findClosestPalette, generateBackgroundColorPalette, MATERIAL_PALETTES } from './materialPalettes';
import { createColorLAB, createColorRGBA } from './colorClasses';

describe('materialPalettes', () => {
  describe('findClosestPalette', () => {
    it('should throw an error for empty palettes array', () => {
      expect(() => findClosestPalette(createColorLAB(0, 0, 0), [])).toThrow('Invalid golden palettes');
    });

    it('should throw an error for palettes array with empty sub-array', () => {
      expect(() => findClosestPalette(createColorLAB(0, 0, 0), [[]])).toThrow('Invalid golden palettes');
    });

    it('should find the exact closest palette and color index for a known color', () => {
      const targetColor = createColorLAB(55.603951071861374, 66.01287384845483, 47.67169313982772);
      const result = findClosestPalette(targetColor);
      expect(result.closestPalette).toEqual(MATERIAL_PALETTES[0]);
      expect(result.colorIndex).toBe(5);
    });

    it('should find the closest palette and color index for a slightly off color', () => {
      const slightlyOffColor = createColorLAB(56, 65, 48);
      const result = findClosestPalette(slightlyOffColor);
      expect(result.closestPalette).toEqual(MATERIAL_PALETTES[0]);
      expect(result.colorIndex).toBe(5);
    });

    it('should find the closest palette and color index for a color closer to a different palette', () => {
      const targetColor = createColorLAB(92.68053776327665, 9.515385232804263, -0.8994072969754852);
      const result = findClosestPalette(targetColor);
      expect(result.closestPalette).toEqual(MATERIAL_PALETTES[1]);
      expect(result.colorIndex).toBe(0);
    });
  });

  describe('generateBackgroundColorPalette', () => {
    it('should generate a palette of 10 colors', () => {
      const baseColor = createColorRGBA(1, 0, 0, 1); // Red
      const palette = generateBackgroundColorPalette(baseColor);
      expect(palette).toHaveLength(10);
    });

    it('should generate colors with high lightness', () => {
      const baseColor = createColorRGBA(0.5, 0.2, 0.8, 1); // Purple-ish
      const palette = generateBackgroundColorPalette(baseColor);
      const minLightness = 0.7; // Normalized

      palette.forEach(color => {
        expect(color.red).toBeGreaterThanOrEqual(minLightness);
        expect(color.green).toBeGreaterThanOrEqual(minLightness);
        expect(color.blue).toBeGreaterThanOrEqual(minLightness);
      });
    });

    it('should generate colors with low saturation', () => {
      const baseColor = createColorRGBA(0.5, 0.2, 0.8, 1); // Purple-ish
      const palette = generateBackgroundColorPalette(baseColor);
      const maxSaturation = 0.3; // Normalized

      palette.forEach(color => {
        const rgbValues = [color.red, color.green, color.blue];
        const minRgb = Math.min(...rgbValues);
        const maxRgb = Math.max(...rgbValues);
        const saturation = (maxRgb - minRgb) / maxRgb; // Simplified saturation for RGB
        expect(saturation).toBeLessThanOrEqual(maxSaturation);
      });
    });
  });
});