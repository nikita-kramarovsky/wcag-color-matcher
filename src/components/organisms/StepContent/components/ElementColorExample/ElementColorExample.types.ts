import type { ColorRGBA } from '../../../../../types/color';

export interface ElementColorExampleProps {
  currentStepColor: ColorRGBA;
  selectedElementColorObj: {
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  };
  getBackgroundColor: (color: ColorRGBA) => string;
  getForegroundColor: (color: ColorRGBA) => string;
}
