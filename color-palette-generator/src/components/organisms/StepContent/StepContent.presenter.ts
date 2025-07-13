import { useState, useEffect } from 'react';
import { formatColorValue, getHexValue, parseHexColor } from '../../../utils/colorConversions';
import { calculateContrastRatio, getColorLightness } from '../../../utils/colorContrast';
import type { ColorRGBA } from '../../../types/color';
import type { StepContentProps } from './StepContent.types';

export const useStepContentPresenter = ({ colorSets, selectedStep, currentPalettes, allGeneratedPalettes, selectedPalette }: StepContentProps) => {
  const [selectedTextColor, setSelectedTextColor] = useState<string>('');
  const [selectedElementColor, setSelectedElementColor] = useState<string>('');

  useEffect(() => {
    setSelectedTextColor('');
    setSelectedElementColor('');
  }, [selectedPalette, selectedStep]);

  const selectedPaletteColors = selectedPalette !== null ? currentPalettes[selectedPalette] : null;
  const currentStepColor = selectedPaletteColors ? selectedPaletteColors[selectedStep] : null;

  // Function to get palette name from index
  const getPaletteName = (paletteIndex: number): string => {
    const colorSet = colorSets.find(set => 
      paletteIndex >= set.paletteIndex && 
      paletteIndex < set.paletteIndex + set.colors.length
    );
    
    if (!colorSet) {
      return `Colour ${paletteIndex}`;
    }
    
    // If palette has multiple colors, add the color number
    if (colorSet.colors.length > 1) {
      const colorNumber = paletteIndex - colorSet.paletteIndex + 1;
      return `${colorSet.title} #${colorNumber}`;
    }
    
    return colorSet.title;
  };

  const textCompatibleColors: Array<{
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  }> = [];
  const elementCompatibleColors: Array<{
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  }> = [];

  if (currentStepColor) {
    allGeneratedPalettes.forEach((palette, paletteIndex) => {
      palette.forEach((color, stepIndex) => {
        const contrast = calculateContrastRatio(color, currentStepColor);
        const hex = getHexValue(color);
        const paletteName = getPaletteName(paletteIndex);
        const source = `${paletteName} - Step ${stepIndex}`;

        if (contrast >= 4.5) {
          textCompatibleColors.push({ color, hex, ratio: contrast, source });
        }
        if (contrast >= 3.0) {
          elementCompatibleColors.push({ color, hex, ratio: contrast, source });
        }
      });
    });

    // Sort by contrast ratio (highest first)
    textCompatibleColors.sort((a, b) => b.ratio - a.ratio);
    elementCompatibleColors.sort((a, b) => b.ratio - a.ratio);
  }

  const getCustomColorObj = (hexColor: string) => {
    try {
      if (!currentStepColor) throw new Error("Current step color is null");
      const color = parseHexColor(hexColor);
      const ratio = calculateContrastRatio(color, currentStepColor);
      return { hex: hexColor, color, ratio, source: 'Custom' };
    } catch {
      // For partial/invalid hex values, return a placeholder object so input still works
      return { 
        hex: hexColor, 
        color: { red: 0, green: 0, blue: 0, alpha: 1 }, 
        ratio: 0, 
        source: 'Invalid' 
      };
    }
  };

  const selectedTextColorObj = textCompatibleColors.find(c => c.hex === selectedTextColor) || 
    (selectedTextColor ? getCustomColorObj(selectedTextColor) : null);
  const selectedElementColorObj = elementCompatibleColors.find(c => c.hex === selectedElementColor) || 
    (selectedElementColor ? getCustomColorObj(selectedElementColor) : null);

  const getTextColorLabel = () => {
    if (selectedTextColorObj && selectedTextColorObj.source !== 'Invalid') {
      return `Text (${selectedTextColorObj.ratio.toFixed(1)}:1 ${selectedTextColorObj.ratio >= 4.5 ? 'PASS' : 'FAIL'})`;
    }
    return 'Text';
  };

  const getElementColorLabel = () => {
    if (selectedElementColorObj && selectedElementColorObj.source !== 'Invalid') {
      return `Element (${selectedElementColorObj.ratio.toFixed(1)}:1 ${selectedElementColorObj.ratio >= 3.0 ? 'PASS' : 'FAIL'})`;
    }
    return 'Element';
  };

  const getBackgroundColor = (color: ColorRGBA) => formatColorValue(color);
  const getForegroundColor = (color: ColorRGBA) => getColorLightness(color) < 0.5 ? '#ffffff' : '#000000';

  return {
    selectedStep,
    selectedPalette,
    colorSets,
    currentStepColor,
    textCompatibleColors,
    elementCompatibleColors,
    selectedTextColor,
    setSelectedTextColor,
    selectedElementColor,
    setSelectedElementColor,
    selectedTextColorObj,
    selectedElementColorObj,
    getTextColorLabel,
    getElementColorLabel,
    getBackgroundColor,
    getForegroundColor,
    getHexValue,
    formatColorValue,
  };
};
