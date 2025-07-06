import { useState } from 'react';
import type { ColorSet, ColorRGBA } from '../types/color';
import { formatColorValue, getHexValue } from '../utils/colorConversions';
import { calculateContrastRatio } from '../utils/colorContrast';
import { ColorDropdown } from './ColorDropdown';
import './StepContent.css';

interface StepContentProps {
  colorSets: ColorSet[];
  selectedStep: number;
  allGeneratedPalettes: ColorRGBA[][];
  selectedPalette: number | null;
}

export function StepContent({ colorSets, selectedStep, allGeneratedPalettes, selectedPalette }: StepContentProps) {
  const [selectedTextColor, setSelectedTextColor] = useState<string>('');
  const [selectedElementColor, setSelectedElementColor] = useState<string>('');

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

  const currentStepColor = selectedPaletteColors[selectedStep];
  if (!currentStepColor) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Color not available for this step</div>
      </div>
    );
  }

  // Calculate compatible colors for text (4.5:1 ratio)
  const textCompatibleColors: Array<{
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  }> = [];
  // Calculate compatible colors for elements (3:1 ratio)
  const elementCompatibleColors: Array<{
    hex: string;
    ratio: number;
    source: string;
    color: ColorRGBA;
  }> = [];

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

  const selectedTextColorObj = textCompatibleColors.find(c => c.hex === selectedTextColor);
  const selectedElementColorObj = elementCompatibleColors.find(c => c.hex === selectedElementColor);

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Step {selectedStep} - Color Combinations</h2>
        <div className="current-color">
          <div 
            className="color-swatch"
            style={{ backgroundColor: formatColorValue(currentStepColor) }}
          />
          <span>Background: {getHexValue(currentStepColor)}</span>
        </div>
      </div>
      
      <div className="color-columns">
        <div className="text-column">
          <h3>Text Colors (4.5:1 contrast)</h3>
          <ColorDropdown
            options={textCompatibleColors}
            value={selectedTextColor}
            onChange={setSelectedTextColor}
            placeholder="Select a text color..."
          />
          
          {selectedTextColorObj && (
            <div className="selected-example">
              <h4>
                Selected: 
                <span 
                  className="color-preview-swatch"
                  style={{ backgroundColor: formatColorValue(selectedTextColorObj.color) }}
                />
                {selectedTextColorObj.hex} - {selectedTextColorObj.source}
              </h4>
              <div 
                className="text-example"
                style={{ 
                  backgroundColor: formatColorValue(currentStepColor),
                  color: formatColorValue(selectedTextColorObj.color)
                }}
              >
                <h4>Sample Heading</h4>
                <p>This is sample body text to demonstrate readability with this color combination. The contrast ratio is {selectedTextColorObj.ratio.toFixed(1)}:1.</p>
                <small>Small text example</small>
              </div>
            </div>
          )}
        </div>

        <div className="element-column">
          <h3>Element Colors (3:1 contrast)</h3>
          <ColorDropdown
            options={elementCompatibleColors}
            value={selectedElementColor}
            onChange={setSelectedElementColor}
            placeholder="Select an element color..."
          />
          
          {selectedElementColorObj && (
            <div className="selected-example">
              <h4>
                Selected: 
                <span 
                  className="color-preview-swatch"
                  style={{ backgroundColor: formatColorValue(selectedElementColorObj.color) }}
                />
                {selectedElementColorObj.hex} - {selectedElementColorObj.source}
              </h4>
              <div 
                className="element-examples"
                style={{ backgroundColor: formatColorValue(currentStepColor) }}
              >
                <button 
                  className="sample-button"
                  style={{ backgroundColor: formatColorValue(selectedElementColorObj.color) }}
                >
                  Button Example
                </button>
                <div 
                  className="sample-card"
                  style={{ backgroundColor: formatColorValue(selectedElementColorObj.color) }}
                >
                  Card Element
                </div>
                <div 
                  className="sample-border"
                  style={{ borderColor: formatColorValue(selectedElementColorObj.color) }}
                >
                  Border Element
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}