import type { ColorSet, ColorRGBA } from '../types/color';
import { PaletteSection } from './PaletteSection';
import './PaletteDisplay.css';

interface PaletteDisplayProps {
  colorSets: ColorSet[];
  allGeneratedPalettes: ColorRGBA[][];
}

export function PaletteDisplay({ colorSets, allGeneratedPalettes }: PaletteDisplayProps) {
  if (colorSets.length === 0) {
    return <div className="palette-display empty">No palettes to display</div>;
  }

  return (
    <div className="palette-display">
      {colorSets.map((colorSet, index) => (
        <PaletteSection
          key={index}
          colorSet={colorSet}
          allGeneratedPalettes={allGeneratedPalettes}
        />
      ))}
    </div>
  );
}