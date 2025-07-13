import { useCallback, useMemo, useState } from 'react';
import type { ColorRGBA, ColorSet } from '../types/color';
import { generateColorPalette, generateBackgroundColorPalette } from '../utils/materialPalettes';
import { convertRgbToHsl, convertHslToRgb, adjustHue } from '../utils/colorConversions';
import { createColorRGBA } from '../utils/colorClasses';

export function useColorPaletteGeneration(baseColor?: ColorRGBA) {
  const [error, setError] = useState<string | null>(null);

  const generatePalettes = useCallback((baseColor: ColorRGBA) => {
    const baseHsl = convertRgbToHsl(baseColor);
    
    const complementaryColor = convertHslToRgb(adjustHue(baseHsl, 180));
    const splitComplementaryColors = [
      convertHslToRgb(adjustHue(baseHsl, 180 - 22.5)),
      convertHslToRgb(adjustHue(baseHsl, 180 + 22.5)),
    ];

    const analogousColors = [
      convertHslToRgb(adjustHue(baseHsl, -30)),
      convertHslToRgb(adjustHue(baseHsl, 30))
    ];

    const triadicColors = [
      convertHslToRgb(adjustHue(baseHsl, 60)),
      convertHslToRgb(adjustHue(baseHsl, 120)),
      convertHslToRgb(adjustHue(baseHsl, -60)),
      convertHslToRgb(adjustHue(baseHsl, -120))
    ];

    const whiteColor = createColorRGBA(1, 1, 1, 1);
    const blackColor = createColorRGBA(0, 0, 0, 1);

    const allColors = [
      baseColor,
      complementaryColor,
      ...splitComplementaryColors,
      ...analogousColors,
      ...triadicColors,
      whiteColor,
      blackColor
    ];

    const allBasePalettes = allColors.map(color => generateColorPalette(color));
    const allBackgroundPalettes = allColors.map(color => generateBackgroundColorPalette(color));

    const colorSets: ColorSet[] = [
      { colors: [baseColor], title: 'Primary Colour', paletteIndex: 0 },
      { colors: [complementaryColor], title: 'Complementary Colours', paletteIndex: 1 },
      { colors: splitComplementaryColors, title: 'Split Complementary Colours', paletteIndex: 2 },
      { colors: analogousColors, title: 'Analogous Colours', paletteIndex: 4 },
      { colors: triadicColors, title: 'Triadic Colours', paletteIndex: 6 },
      { colors: [whiteColor], title: 'White Colour', paletteIndex: 10 },
      { colors: [blackColor], title: 'Black Colour', paletteIndex: 11 }
    ];

    // Calculate suggested step based on lightness
    const lightness = baseHsl.lightness;
    
    // Map lightness to step index (0-9 for steps 50-900)
    let suggestedStep = 5; // Default to 500
    if (lightness >= 0.9) suggestedStep = 0;      // 50
    else if (lightness >= 0.8) suggestedStep = 1; // 100
    else if (lightness >= 0.7) suggestedStep = 2; // 200
    else if (lightness >= 0.6) suggestedStep = 3; // 300
    else if (lightness >= 0.5) suggestedStep = 4; // 400
    else if (lightness >= 0.4) suggestedStep = 5; // 500
    else if (lightness >= 0.3) suggestedStep = 6; // 600
    else if (lightness >= 0.2) suggestedStep = 7; // 700
    else if (lightness >= 0.1) suggestedStep = 8; // 800
    else suggestedStep = 9;                       // 900

    return { colorSets, allBasePalettes, allBackgroundPalettes, suggestedStep };
  }, []);

  const { colorSets, allBasePalettes, allBackgroundPalettes, suggestedStep } = useMemo(() => {
    try {
      if (!baseColor) {
        throw Error();
      }
      setError(null);
      return generatePalettes(baseColor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid color format');
      return { colorSets: [], allBasePalettes: [], allBackgroundPalettes: [], suggestedStep: 5 };
    }
  }, [baseColor, generatePalettes]);

  return { 
    error,
    colorSets,
    allBasePalettes,
    allBackgroundPalettes,
    suggestedStep
  };
}