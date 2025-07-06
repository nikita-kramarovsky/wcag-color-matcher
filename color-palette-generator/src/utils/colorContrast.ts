import type { ColorRGBA } from '../types/color';
import { linearizeColorValue, getOpaqueColor } from './colorConversions';
import { createColorRGBA, WHITE_COLOR, BLACK_COLOR, ALPHA_THRESHOLD } from './colorClasses';

export function calculateContrastRatio(foregroundColor: ColorRGBA, backgroundColor: ColorRGBA): number {
  const backgroundOpaque = getOpaqueColor(backgroundColor);
  let foreground = foregroundColor;
  
  if (!(1 - foregroundColor.alpha < ALPHA_THRESHOLD)) {
    // If foreground is transparent, blend it with the background
    const blendedAlpha = backgroundOpaque.alpha * (1 - foregroundColor.alpha);
    foreground = createColorRGBA(
      foregroundColor.red * foregroundColor.alpha + backgroundOpaque.red * blendedAlpha,
      foregroundColor.green * foregroundColor.alpha + backgroundOpaque.green * blendedAlpha,
      foregroundColor.blue * foregroundColor.alpha + backgroundOpaque.blue * blendedAlpha,
      foregroundColor.alpha + blendedAlpha
    );
  }
  
  const foregroundLuminance = 0.2126 * linearizeColorValue(foreground.red) + 
                             0.7152 * linearizeColorValue(foreground.green) + 
                             0.0722 * linearizeColorValue(foreground.blue);
  const backgroundLuminance = 0.2126 * linearizeColorValue(backgroundColor.red) + 
                             0.7152 * linearizeColorValue(backgroundColor.green) + 
                             0.0722 * linearizeColorValue(backgroundColor.blue);
  
  return foregroundLuminance >= backgroundLuminance ? 
    (foregroundLuminance + 0.05) / (backgroundLuminance + 0.05) : 
    (backgroundLuminance + 0.05) / (foregroundLuminance + 0.05);
}

export function getColorLightness(color: ColorRGBA): number {
  const minContrastRatio = 4.5; // WCAG AA for normal text
  const whiteContrast = calculateContrastRatio(WHITE_COLOR, color);
  if (whiteContrast >= minContrastRatio) return 0; // Use white text
  const blackContrast = calculateContrastRatio(BLACK_COLOR, color);
  return blackContrast >= minContrastRatio ? 1 : (whiteContrast > blackContrast ? 0 : 1);
}

export const HighContrastColors = {
  HIGH: createColorRGBA(1, 1, 1, 1),      // White
  MEDIUM: createColorRGBA(1, 1, 1, 0.6),  // White 60% opacity
  DISABLED: createColorRGBA(1, 1, 1, 0.38) // White 38% opacity
};

export const DefaultContrastColors = {
  HIGH: createColorRGBA(0, 0, 0, 0.87),   // Black 87% opacity
  MEDIUM: createColorRGBA(0, 0, 0, 0.6),  // Black 60% opacity
  DISABLED: createColorRGBA(0, 0, 0, 0.38) // Black 38% opacity
};