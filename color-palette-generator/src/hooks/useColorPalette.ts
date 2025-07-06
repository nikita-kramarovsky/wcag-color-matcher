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
      { colors: [baseColor], title: 'Primary Palette', paletteIndex: 0 },
      { colors: [complementaryColor], title: 'Complementary Palette', paletteIndex: 1 },
      { colors: splitComplementaryColors, title: 'Split Complementary Palette', paletteIndex: 2 },
      { colors: analogousColors, title: 'Analogous Palette', paletteIndex: 4 },
      { colors: triadicColors, title: 'Triadic Palette', paletteIndex: 6 },
      { colors: [whiteColor], title: 'White Palette', paletteIndex: 10 },
      { colors: [blackColor], title: 'Black Palette', paletteIndex: 11 }
    ];

    return { colorSets, allGeneratedPalettes };
  }, []);

  const { colorSets, allGeneratedPalettes } = useMemo(() => {
    try {
      const baseColor = parseHexColor(baseColorHex);
      setError(null);
      return generatePalettes(baseColor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid color format');
      return { colorSets: [], allGeneratedPalettes: [] };
    }
  }, [baseColorHex, generatePalettes]);

  const updateBaseColor = useCallback((newColor: string) => {
    setBaseColorHex(newColor);
  }, []);

  return {
    baseColorHex,
    colorSets,
    allGeneratedPalettes,
    error,
    updateBaseColor
  };
}