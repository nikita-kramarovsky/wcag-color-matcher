import type { PALETTE_STEPS, ColorRGBA } from '../../../types/color';

export interface StepTabsProps {
  steps: typeof PALETTE_STEPS;
  selectedStep: number;
  onStepChange: (stepIndex: number) => void;
  selectedPalette: number | null;
  currentPalettes: ColorRGBA[][];
}
