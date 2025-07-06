import type { ColorSet, ColorRGBA } from '../types/color';
import { ColorRamp } from './ColorRamp';
import './PaletteSection.css';

interface PaletteSectionProps {
  colorSet: ColorSet;
  allGeneratedPalettes: ColorRGBA[][];
}

export function PaletteSection({ colorSet, allGeneratedPalettes }: PaletteSectionProps) {
  return (
    <div className="palette-section">
      <h2 className="palette-title">{colorSet.title}</h2>
      {colorSet.colors.map((_, colorIndex) => {
        const paletteIndex = colorSet.paletteIndex + colorIndex;
        const generatedPalette = allGeneratedPalettes[paletteIndex];
        
        if (!generatedPalette) return null;
        
        return (
          <ColorRamp
            key={colorIndex}
            palette={generatedPalette}
            allPalettes={allGeneratedPalettes}
          />
        );
      })}
    </div>
  );
}