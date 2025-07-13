import type { PaletteType } from '../../../types/color';

export interface PaletteTypeTabsProps {
  selectedPaletteType: PaletteType;
  onPaletteTypeChange: (paletteType: PaletteType) => void;
}
