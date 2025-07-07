import chroma from 'chroma-js';
import type { ColorRGBA } from '../types/color';
import { colorRGBAToChroma } from './chromaIntegration';
import { WHITE_COLOR, BLACK_COLOR } from './colorClasses';

/**
 * Calculates the contrast ratio between two colors using chroma.js WCAG implementation.
 * @param foregroundColor - The foreground color
 * @param backgroundColor - The background color
 * @returns The contrast ratio (1:1 to 21:1)
 */
export function calculateContrastRatio(foregroundColor: ColorRGBA, backgroundColor: ColorRGBA): number {
  const fgChroma = colorRGBAToChroma(foregroundColor);
  const bgChroma = colorRGBAToChroma(backgroundColor);
  return chroma.contrast(fgChroma, bgChroma);
}

/**
 * Determines whether to use light (0) or dark (1) text on a given background color.
 * @param color - The background color to test
 * @returns 0 for light text, 1 for dark text
 */
export function getColorLightness(color: ColorRGBA): number {
  const minContrastRatio = 4.5; // WCAG AA for normal text
  const whiteContrast = calculateContrastRatio(WHITE_COLOR, color);
  if (whiteContrast >= minContrastRatio) return 0; // Use white text
  const blackContrast = calculateContrastRatio(BLACK_COLOR, color);
  return blackContrast >= minContrastRatio ? 1 : (whiteContrast > blackContrast ? 0 : 1);
}