import { useState, useCallback, useMemo } from 'react';
import { parseHexColor, convertRgbToHsl, convertHslToRgb } from '../utils/colorConversions';
import { useColorPaletteGeneration } from './useColorPaletteGeneration';

export function useColorPalette(initialColor: string = '#6200EE') {
  const [baseColorHex, setBaseColorHex] = useState(initialColor);
  const baseColor = useMemo(() => {
    try {
      return parseHexColor(baseColorHex);
    } catch (err) {
      return undefined;
    }
  }, [baseColorHex]);
  const basePalette = useColorPaletteGeneration(baseColor);

  const lighterColor = useMemo(() => {
    if (!baseColor) return undefined;
    const baseHsl = convertRgbToHsl(baseColor);
    return convertHslToRgb({
      ...baseHsl,
      lightness: Math.min(baseHsl.lightness + 0.2, 1)
    });
  }, [baseColor]);
  const lighterPalette = useColorPaletteGeneration(lighterColor);

  const darkerColor = useMemo(() => {
    if (!baseColor) return undefined;
    const baseHsl = convertRgbToHsl(baseColor);
    return convertHslToRgb({
      ...baseHsl,
      lightness: Math.max(baseHsl.lightness - 0.2, 0)
    });
  }, [baseColor]);
  const darkerPalette = useColorPaletteGeneration(darkerColor);

  const updateBaseColor = useCallback((newColor: string) => {
    setBaseColorHex(newColor);
  }, []);

  return {
    baseColorHex,
    basePalette,
    lighterPalette,
    darkerPalette,
    updateBaseColor
  };
}