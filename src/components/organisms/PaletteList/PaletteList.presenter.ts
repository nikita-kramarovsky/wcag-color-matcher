import { formatColorValue } from '../../../utils/colorConversions';
import type { PaletteListProps } from './PaletteList.types';

export const usePaletteListPresenter = ({ colorSets, selectedStep, currentPalettes: allGeneratedPalettes, selectedPalette, onPaletteSelect }: PaletteListProps) => {

  const getPaletteColorPreviewProps = (colorSetIndex: number, colorIndex: number) => {
    const paletteIndex = colorSets[colorSetIndex].paletteIndex + colorIndex;
    const palette = allGeneratedPalettes[paletteIndex];
    
    if (!palette || !palette[selectedStep]) return null;
    
    const color = palette[selectedStep];
    const isSelected = selectedPalette === paletteIndex;
    
    return {
      backgroundColor: formatColorValue(color),
      title: formatColorValue(color),
      onClick: () => onPaletteSelect(paletteIndex),
      isSelected,
    };
  };

  return {
    colorSets,
    getPaletteColorPreviewProps,
  };
};
