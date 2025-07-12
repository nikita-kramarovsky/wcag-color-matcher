import { useState, useCallback, useMemo } from 'react';
import { parseHexColor } from '../utils/colorConversions';
import { useColorPaletteGeneration } from './useColorPaletteGeneration';

export function useColorPalette(initialColor: string = '#6200EE') {
  const [baseColorHex, setBaseColorHex] = useState(initialColor);
  const baseColor = useMemo(() => {
    try {
      return parseHexColor(baseColorHex);
    } catch {
      return undefined;
    }
  }, [baseColorHex]);
  const basePalette = useColorPaletteGeneration(baseColor);

  const updateBaseColor = useCallback((newColor: string) => {
    setBaseColorHex(newColor);
  }, []);

  return {
    baseColorHex,
    basePalette,
    updateBaseColor
  };
}