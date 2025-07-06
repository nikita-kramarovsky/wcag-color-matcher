import { useState, useCallback, useMemo } from 'react';
import type { ColorRGBA, ColorSet } from '../types/color';
import { generateColorPalette } from '../utils/materialPalettes';
import { parseHexColor, convertRgbToHsl, convertHslToRgb, adjustHue } from '../utils/colorConversions';
import { createColorRGBA } from '../utils/colorClasses';

export function useColorPalette(initialColor: string = '#6200EE') {
  const [baseColorHex, setBaseColorHex] = useState(initialColor);
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

    const allGeneratedPalettes = allColors.map(color => generateColorPalette(color));

    const colorSets: ColorSet[] = [
      { colors: [baseColor], title: 'Primary Colour', paletteIndex: 0 },
      { colors: [complementaryColor], title: 'Complementary Colours', paletteIndex: 1 },
      { colors: splitComplementaryColors, title: 'Split Complementary Colours', paletteIndex: 2 },
      { colors: analogousColors, title: 'Analogous Colours', paletteIndex: 4 },
      { colors: triadicColors, title: 'Triadic Colours', paletteIndex: 6 },
      { colors: [whiteColor], title: 'White Colour', paletteIndex: 10 },
      { colors: [blackColor], title: 'Black Colour', paletteIndex: 11 }
    ];

    return { colorSets, allGeneratedPalettes };
  }, []);

  const { colorSets, allGeneratedPalettes, suggestedStep } = useMemo(() => {
    try {
      const baseColor = parseHexColor(baseColorHex);
      setError(null);
      const result = generatePalettes(baseColor);
      
      // Calculate suggested step based on lightness
      const hsl = convertRgbToHsl(baseColor);
      const lightness = hsl.lightness;
      
      // Map lightness to step index (0-9 for steps 50-900)
      let stepIndex = 5; // Default to 500
      if (lightness >= 0.9) stepIndex = 0;      // 50
      else if (lightness >= 0.8) stepIndex = 1; // 100
      else if (lightness >= 0.7) stepIndex = 2; // 200
      else if (lightness >= 0.6) stepIndex = 3; // 300
      else if (lightness >= 0.5) stepIndex = 4; // 400
      else if (lightness >= 0.4) stepIndex = 5; // 500
      else if (lightness >= 0.3) stepIndex = 6; // 600
      else if (lightness >= 0.2) stepIndex = 7; // 700
      else if (lightness >= 0.1) stepIndex = 8; // 800
      else stepIndex = 9;                       // 900
      
      return { ...result, suggestedStep: stepIndex };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid color format');
      return { colorSets: [], allGeneratedPalettes: [], suggestedStep: 5 };
    }
  }, [baseColorHex, generatePalettes]);

  const updateBaseColor = useCallback((newColor: string) => {
    setBaseColorHex(newColor);
  }, []);

  return {
    baseColorHex,
    colorSets,
    allGeneratedPalettes,
    suggestedStep,
    error,
    updateBaseColor
  };
}