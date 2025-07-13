import type { ColorSet, ColorRGBA } from '../../../types/color';

export interface PaletteListProps {
  colorSets: ColorSet[];
  selectedStep: number;
  currentPalettes: ColorRGBA[][];
  selectedPalette: number | null;
  onPaletteSelect: (paletteIndex: number) => void;
}
