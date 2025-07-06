import type { ColorSet, ColorRGBA } from '../types/color';
import './StepContent.css';

interface StepContentProps {
  colorSets: ColorSet[];
  selectedStep: number;
  allGeneratedPalettes: ColorRGBA[][];
  selectedPalette: number | null;
}

export function StepContent({ colorSets, selectedStep, allGeneratedPalettes, selectedPalette }: StepContentProps) {
  if (colorSets.length === 0) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Enter a base color to generate palettes</div>
      </div>
    );
  }

  if (selectedPalette === null) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Select a palette to view details</div>
      </div>
    );
  }

  const selectedPaletteColors = allGeneratedPalettes[selectedPalette];
  if (!selectedPaletteColors) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Palette not found</div>
      </div>
    );
  }

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Selected Palette - Step {selectedStep}</h2>
        <div className="palette-info">Palette {selectedPalette}</div>
      </div>
      
      <div className="palette-preview">
        
      </div>
    </div>
  );
}