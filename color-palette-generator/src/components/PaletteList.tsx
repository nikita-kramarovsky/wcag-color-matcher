import type { ColorSet, ColorRGBA } from '../types/color';
import { formatColorValue } from '../utils/colorConversions';
import './PaletteList.css';

interface PaletteListProps {
  colorSets: ColorSet[];
  selectedStep: number;
  currentPalettes: ColorRGBA[][];
  selectedPalette: number | null;
  onPaletteSelect: (paletteIndex: number) => void;
}

export function PaletteList({ colorSets, selectedStep, currentPalettes: allGeneratedPalettes, selectedPalette, onPaletteSelect }: PaletteListProps) {
  if (colorSets.length === 0) {
    return (
      <div className="palette-list empty">
        <div className="empty-message">No palettes generated</div>
      </div>
    );
  }

  return (
    <div className="palette-list">
      {colorSets.map((colorSet, setIndex) => (
        <div key={setIndex} className="palette-item">
          <div className="palette-name">{colorSet.title}</div>
          <div className="palette-colors">
            {colorSet.colors.map((_, colorIndex) => {
              const paletteIndex = colorSet.paletteIndex + colorIndex;
              const palette = allGeneratedPalettes[paletteIndex];
              
              if (!palette || !palette[selectedStep]) return null;
              
              const color = palette[selectedStep];
              const isSelected = selectedPalette === paletteIndex;
              
              return (
                <div
                  key={colorIndex}
                  className={`palette-color-preview ${isSelected ? 'selected' : ''}`}
                  style={{ backgroundColor: formatColorValue(color) }}
                  title={formatColorValue(color)}
                  onClick={() => onPaletteSelect(paletteIndex)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}