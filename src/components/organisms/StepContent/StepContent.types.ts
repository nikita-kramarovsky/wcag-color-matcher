import type { ColorSet, ColorRGBA } from '../../../types/color';

export interface StepContentProps {
  colorSets: ColorSet[];
  selectedStep: number;
  currentPalettes: ColorRGBA[][];
  allGeneratedPalettes: ColorRGBA[][];
  selectedPalette: number | null;
}
