import type { PALETTE_STEPS, ColorRGBA } from '../types/color';
import { formatColorValue, getHexValue } from '../utils/colorConversions';
import { getColorLightness } from '../utils/colorContrast';
import './StepTabs.css';

interface StepTabsProps {
  steps: typeof PALETTE_STEPS;
  selectedStep: number;
  onStepChange: (stepIndex: number) => void;
  selectedPalette: number | null;
  currentPalettes: ColorRGBA[][];
}

export function StepTabs({ steps, selectedStep, onStepChange, selectedPalette, currentPalettes: allGeneratedPalettes }: StepTabsProps) {
  const selectedPaletteColors = selectedPalette !== null ? allGeneratedPalettes[selectedPalette] : null;

  return (
    <div className="step-tabs">
      {steps.map((step, index) => {
        const color = selectedPaletteColors?.[index];
        const backgroundColor = color ? formatColorValue(color) : '#f0f0f0';
        const hexValue = color ? getHexValue(color) : '';
        const isActive = selectedStep === index;
        
        // Determine text color based on background lightness
        // getColorLightness returns 0 for white text (dark background), 1 for black text (light background)
        const shouldUseWhiteText = color ? getColorLightness(color) === 0 : false;
        const textColor = shouldUseWhiteText ? '#ffffff' : '#000000';
        
        return (
          <button
            key={step}
            className={`step-tab ${isActive ? 'active' : ''}`}
            onClick={() => onStepChange(index)}
            style={{ backgroundColor }}
          >
            <div className="step-tab-content" style={{ color: textColor }}>
              <span className="step-tab-number">{step}</span>
              {hexValue && <span className="step-tab-hex">{hexValue}</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
}