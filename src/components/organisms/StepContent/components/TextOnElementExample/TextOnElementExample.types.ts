import type { ColorRGBA } from '../../../../../types/color';

export interface TextOnElementExampleProps {
  currentStepColor: ColorRGBA;
  selectedElementColorObj: {
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  };
  selectedTextOnElementColorObj: {
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  };
  getBackgroundColor: (color: ColorRGBA) => string;
  getForegroundColor: (color: ColorRGBA) => string;
}