import type { PALETTE_STEPS, ColorRGBA } from '../types/color';
import { formatColorValue } from '../utils/colorConversions';
import { getColorLightness } from '../utils/colorContrast';
import './StepTabs.css';

interface StepTabsProps {
  steps: typeof PALETTE_STEPS;
  selectedStep: number;
  onStepChange: (stepIndex: number) => void;
  selectedPalette: number | null;
  allGeneratedPalettes: ColorRGBA[][];
}

export function StepTabs({ steps, selectedStep, onStepChange, selectedPalette, allGeneratedPalettes }: StepTabsProps) {
  const selectedPaletteColors = selectedPalette !== null ? allGeneratedPalettes[selectedPalette] : null;

  return (
    <div className="step-tabs">
      {steps.map((step, index) => {
        const color = selectedPaletteColors?.[index];
        const backgroundColor = color ? formatColorValue(color) : '#f0f0f0';
        const isActive = selectedStep === index;
        
        // Determine text color based on background lightness
        const textColor = color && getColorLightness(color) === 0 ? '#ffffff' : '#000000';
        
        return (
          <button
            key={step}
            className={`step-tab ${isActive ? 'active' : ''}`}
            onClick={() => onStepChange(index)}
            style={{ backgroundColor }}
          >
            <span className="step-label" style={{ color: textColor }}>{step}</span>
          </button>
        );
      })}
    </div>
  );
}