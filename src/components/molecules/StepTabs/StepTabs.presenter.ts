import { formatColorValue, getHexValue } from '../../../utils/colorConversions';
import { getColorLightness } from '../../../utils/colorContrast';
import type { StepTabsProps } from './StepTabs.types';

export const useStepTabsPresenter = ({ steps, selectedStep, onStepChange, selectedPalette, currentPalettes: allGeneratedPalettes }: StepTabsProps) => {
  const selectedPaletteColors = selectedPalette !== null ? allGeneratedPalettes[selectedPalette] : null;

  const getTabProps = (index: number) => {
    const color = selectedPaletteColors?.[index];
    const backgroundColor = color ? formatColorValue(color) : '#f0f0f0';
    const hexValue = color ? getHexValue(color) : '';
    const isActive = selectedStep === index;
    
    // Determine text color based on background lightness
    // getColorLightness returns 0 for white text (dark background), 1 for black text (light background)
    const shouldUseWhiteText = color ? getColorLightness(color) === 0 : false;
    const textColor = shouldUseWhiteText ? '#ffffff' : '#000000';

    return {
      color,
      backgroundColor,
      hexValue,
      isActive,
      textColor,
    };
  };

  return {
    steps,
    selectedStep,
    onStepChange,
    getTabProps,
  };
};
