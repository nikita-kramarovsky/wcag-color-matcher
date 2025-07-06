import { useState, useCallback, useMemo } from 'react';
import { parseHexColor } from '../utils/colorConversions';
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
  const { colorSets, allGeneratedPalettes, suggestedStep, error } = useColorPaletteGeneration(baseColor);

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