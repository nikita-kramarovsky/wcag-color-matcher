import type { ColorRGBA, ContrastSample, PALETTE_STEPS } from '../types/color';
import { formatColorValue, getHexValue } from '../utils/colorConversions';
import { getColorLightness, calculateContrastRatio } from '../utils/colorContrast';
import './ColorStep.css';

interface ColorStepProps {
  color: ColorRGBA;
  step: typeof PALETTE_STEPS[number];
  allPalettes: ColorRGBA[][];
}

export function ColorStep({ color, step, allPalettes }: ColorStepProps) {
  const isLightText = getColorLightness(color) === 0;
  const hexValue = getHexValue(color).toUpperCase();

  // Generate contrast samples from all palettes
  const textContrastSamples: ContrastSample[] = [];
  const elementContrastSamples: ContrastSample[] = [];

  allPalettes.forEach((palette, palIdx) => {
    if (palIdx < 10) { // Exclude white and black palettes for element samples
      palette.forEach((paletteColor) => {
        const contrast = calculateContrastRatio(paletteColor, color);
        const hexValue = getHexValue(paletteColor).replace('#', '');
        
        if (contrast >= 4.5) {
          textContrastSamples.push({
            textColor: paletteColor,
            label: hexValue,
            ratio: contrast,
            passes: true
          });
        }
        
        if (contrast >= 3.0 && palIdx < 10) {
          elementContrastSamples.push({
            elementColor: paletteColor,
            label: hexValue,
            ratio: contrast,
            passes: true
          });
        }
      });
    }
  });

  // Sort by contrast ratio (highest first)
  textContrastSamples.sort((a, b) => b.ratio - a.ratio);
  elementContrastSamples.sort((a, b) => b.ratio - a.ratio);

  return (
    <div 
      className="color-step"
      style={{ 
        backgroundColor: formatColorValue(color),
        color: isLightText ? '#FFFFFF' : '#000000'
      }}
    >
      <span className="step-label">{step}</span>
      <span className="hex-label">{hexValue}</span>
      
      <div className="contrast-info">
        <div className="contrast-section">
          <div className="contrast-title">Text (4.5:1)</div>
          {textContrastSamples.slice(0, 10).map((sample, idx) => (
            <div 
              key={idx}
              className="contrast-sample"
              style={{
                backgroundColor: formatColorValue(color),
                color: formatColorValue(sample.textColor!)
              }}
            >
              {sample.label}: {sample.ratio.toFixed(2)}:1
            </div>
          ))}
        </div>
        
        <div className="contrast-section">
          <div className="contrast-title">Elements (3:1)</div>
          {elementContrastSamples.slice(0, 8).map((sample, idx) => {
            const elementTextColor = getColorLightness(sample.elementColor!) === 0 ? '#FFFFFF' : '#000000';
            return (
              <div key={idx} className="element-sample">
                <div 
                  className="element-box"
                  style={{
                    backgroundColor: formatColorValue(sample.elementColor!),
                    color: elementTextColor
                  }}
                >
                  <div>{sample.label}</div>
                  <div>{sample.ratio.toFixed(1)}:1</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}