import type { ColorRGBA } from '../../../../../types/color';

export interface TextColorExampleProps {
  currentStepColor: ColorRGBA;
  selectedTextColorObj: {
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  };
  getBackgroundColor: (color: ColorRGBA) => string;
}
