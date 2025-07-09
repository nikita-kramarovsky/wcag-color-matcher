import { useState } from 'react';
import type { ColorSet, ColorRGBA } from '../types/color';
import { formatColorValue, getHexValue } from '../utils/colorConversions';
import { calculateContrastRatio, getColorLightness } from '../utils/colorContrast';
import { ColorDropdown } from './ColorDropdown';
import './StepContent.css';

interface StepContentProps {
  colorSets: ColorSet[];
  selectedStep: number;
  currentPalettes: ColorRGBA[][];
  allGeneratedPalettes: ColorRGBA[][];
  selectedPalette: number | null;
}

export function StepContent({ colorSets, selectedStep, currentPalettes, allGeneratedPalettes, selectedPalette }: StepContentProps) {
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

  const selectedPaletteColors = currentPalettes[selectedPalette];
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
              <div 
                className="text-example"
                style={{ 
                  backgroundColor: formatColorValue(currentStepColor),
                  color: formatColorValue(selectedTextColorObj.color)
                }}
              >
                <h1 style={{ color: formatColorValue(selectedTextColorObj.color) }}>Main Heading (H1)</h1>
                <h2 style={{ color: formatColorValue(selectedTextColorObj.color) }}>Section Heading (H2)</h2>
                <h3 style={{ color: formatColorValue(selectedTextColorObj.color) }}>Subsection Heading (H3)</h3>
                <p>This is sample body text to demonstrate readability with this color combination. The contrast ratio is {selectedTextColorObj.ratio.toFixed(1)}:1.</p>
                <p><strong>Bold text example</strong> and <em>italic text example</em></p>
                <small>Small text and fine print</small>
                <div style={{ marginTop: '10px' }}>
                  <code style={{ 
                    backgroundColor: formatColorValue(selectedTextColorObj.color), 
                    color: formatColorValue(currentStepColor),
                    padding: '2px 4px',
                    borderRadius: '3px'
                  }}>
                    Code snippet
                  </code>
                </div>
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
              <div 
                className="element-examples"
                style={{ backgroundColor: formatColorValue(currentStepColor) }}
              >
                <div className="form-elements">
                  <div className="form-group">
                    <label style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <input 
                        type="checkbox" 
                        style={{ accentColor: formatColorValue(selectedElementColorObj.color) }}
                      />
                      Checkbox with label
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <input 
                        type="radio" 
                        name="sample-radio"
                        style={{ accentColor: formatColorValue(selectedElementColorObj.color) }}
                      />
                      Radio button option
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Input field"
                      style={{ 
                        borderColor: formatColorValue(selectedElementColorObj.color),
                        backgroundColor: 'transparent',
                        color: formatColorValue(selectedElementColorObj.color)
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <select style={{ 
                      borderColor: formatColorValue(selectedElementColorObj.color),
                      backgroundColor: formatColorValue(currentStepColor),
                      color: formatColorValue(selectedElementColorObj.color)
                    }}>
                      <option>Select option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                </div>
                
                <div className="button-group">
                  <button 
                    className="sample-button primary"
                    style={{ 
                      backgroundColor: formatColorValue(selectedElementColorObj.color),
                      color: getColorLightness(selectedElementColorObj.color) < 0.5 ? '#ffffff' : '#000000'
                    }}
                  >
                    Primary Button
                  </button>
                  
                  <button 
                    className="sample-button secondary"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: formatColorValue(selectedElementColorObj.color),
                      color: formatColorValue(selectedElementColorObj.color)
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
                
                <div className="icon-examples">
                  <div className="icon-group">
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
                      </svg>
                      Settings
                    </span>
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                      </svg>
                      Search
                    </span>
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                      </svg>
                      Document
                    </span>
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                      </svg>
                      Success
                    </span>
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,7H13V9H11V7M11,11H13V17H11V11Z"/>
                      </svg>
                      Info
                    </span>
                    <span style={{ color: formatColorValue(selectedElementColorObj.color) }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H5V21H19V9Z"/>
                      </svg>
                      Profile
                    </span>
                  </div>
                </div>
                
                <div 
                  className="sample-card"
                  style={{ 
                    backgroundColor: formatColorValue(selectedElementColorObj.color),
                    color: getColorLightness(selectedElementColorObj.color) < 0.5 ? '#ffffff' : '#000000'
                  }}
                >
                  <h4>Card Component</h4>
                  <p>Card content with contrast ratio {selectedElementColorObj.ratio.toFixed(1)}:1</p>
                </div>
                
                <div 
                  className="sample-border"
                  style={{ 
                    borderColor: formatColorValue(selectedElementColorObj.color),
                    color: getColorLightness(currentStepColor) < 0.5 ? '#ffffff' : '#000000'
                  }}
                >
                  <div className="border-content">
                    <strong>Border Element</strong>
                    <p>Content with colored border</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}