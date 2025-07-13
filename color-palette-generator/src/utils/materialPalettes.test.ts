import { describe, it, expect } from 'vitest';
import { findClosestPalette, generateBackgroundColorPalette, MATERIAL_PALETTES } from './materialPalettes';
import { createColorLAB, createColorRGBA } from './colorClasses';

describe('materialPalettes', () => {
  describe('findClosestPalette', () => {
    it('should throw an error for invalid golden palettes', () => {
      expect(() => findClosestPalette(createColorLAB(0, 0, 0), [])).toThrow('Invalid golden palettes');
      expect(() => findClosestPalette(createColorLAB(0, 0, 0), [[]])).toThrow('Invalid golden palettes');
    });

    it('should find the closest palette and color index', () => {
      // A known color from MATERIAL_PALETTES[0][5]
      const targetColor = createColorLAB(55.603951071861374, 66.01287384845483, 47.67169313982772);
      const result = findClosestPalette(targetColor);
      expect(result.closestPalette).toEqual(MATERIAL_PALETTES[0]);
      expect(result.colorIndex).toBe(5);

      // A color slightly different from MATERIAL_PALETTES[0][5]
      const slightlyOffColor = createColorLAB(56, 65, 48);
      const result2 = findClosestPalette(slightlyOffColor);
      expect(result2.closestPalette).toEqual(MATERIAL_PALETTES[0]);
      expect(result2.colorIndex).toBe(5);

      // A color closer to a different palette (e.g., MATERIAL_PALETTES[1][0])
      const targetColor2 = createColorLAB(92.68053776327665, 9.515385232804263, -0.8994072969754852);
      const result3 = findClosestPalette(targetColor2);
      expect(result3.closestPalette).toEqual(MATERIAL_PALETTES[1]);
      expect(result3.colorIndex).toBe(0);
    });
  });

  describe('generateBackgroundColorPalette', () => {
    it('should generate a palette of 10 colors', () => {
      const baseColor = createColorRGBA(1, 0, 0, 1); // Red
      const palette = generateBackgroundColorPalette(baseColor);
      expect(palette).toHaveLength(10);
    });

    it('should generate colors with high lightness and low saturation', () => {
      const baseColor = createColorRGBA(0.5, 0.2, 0.8, 1); // Purple-ish
      const palette = generateBackgroundColorPalette(baseColor);

      palette.forEach(color => {
        // Convert to HSL to check lightness and saturation
        // Note: This is a simplified check. A more robust test might convert to LCH and check those ranges.
        // For now, we'll check that lightness is generally high and saturation is generally low.
        const maxLightness = 1; // Normalized
        const minLightness = 0.7; // Normalized
        const maxSaturation = 0.3; // Normalized

        // Simple check for lightness (assuming RGB values are somewhat indicative)
        expect(color.red).toBeGreaterThanOrEqual(minLightness);
        expect(color.green).toBeGreaterThanOrEqual(minLightness);
        expect(color.blue).toBeGreaterThanOrEqual(minLightness);

        // This is a very rough check for saturation. A proper check would involve color space conversion.
        // For now, we'll just ensure colors are not too vibrant.
        const rgbValues = [color.red, color.green, color.blue];
        const minRgb = Math.min(...rgbValues);
        const maxRgb = Math.max(...rgbValues);
        const saturation = (maxRgb - minRgb) / maxRgb; // Simplified saturation for RGB
        expect(saturation).toBeLessThanOrEqual(maxSaturation);
      });
    });
  });
});
