import { describe, it, expect } from 'vitest';
import { calculateContrastRatio, getColorLightness } from './colorContrast';
import { colorRGBAToChroma } from './chromaIntegration';
import chroma from 'chroma-js';

describe('colorContrast', () => {
  it('should calculate contrast ratio correctly', () => {
    const white = { red: 1, green: 1, blue: 1, alpha: 1 };
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    const red = { red: 1, green: 0, blue: 0, alpha: 1 };

    expect(calculateContrastRatio(white, black)).toBeCloseTo(21);
    expect(calculateContrastRatio(black, white)).toBeCloseTo(21);
    expect(calculateContrastRatio(red, black)).toBeCloseTo(5.25);
    const redChroma = colorRGBAToChroma(red);
    const whiteChroma = colorRGBAToChroma(white);
    expect(calculateContrastRatio(red, white)).toBeCloseTo(chroma.contrast(redChroma, whiteChroma));
  });

  it('should determine color lightness correctly', () => {
    const white = { red: 1, green: 1, blue: 1, alpha: 1 };
    const black = { red: 0, green: 0, blue: 0, alpha: 1 };
    const red = { red: 1, green: 0, blue: 0, alpha: 1 };
    const darkBlue = { red: 0, green: 0, blue: 139 / 255, alpha: 1 };
    const lightGray = { red: 200 / 255, green: 200 / 255, blue: 200 / 255, alpha: 1 };

    expect(getColorLightness(white)).toBe(1); // Should use dark text on white
    expect(getColorLightness(black)).toBe(0); // Should use light text on black
    expect(getColorLightness(red)).toBe(1); // Should use dark text on red
    expect(getColorLightness(darkBlue)).toBe(0); // Should use light text on dark blue
    expect(getColorLightness(lightGray)).toBe(1); // Should use dark text on light gray
  });
});
