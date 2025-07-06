import type { ColorHSL, ColorRGBA } from '../types/color';
import { ColorSlider } from './ColorSlider';
import { convertRgbToHsl, convertHslToRgb, formatColorValue } from '../utils/colorConversions';
import './ColorSlider.css';

interface HSLSlidersProps {
  color: ColorRGBA;
  onChange: (color: ColorRGBA) => void;
}

export function HSLSliders({ color, onChange }: HSLSlidersProps) {
  const hsl = convertRgbToHsl(color);

  const handleHueChange = (value: number) => {
    const newHsl: ColorHSL = { ...hsl, hue: value };
    onChange(convertHslToRgb(newHsl));
  };

  const handleSaturationChange = (value: number) => {
    const newHsl: ColorHSL = { ...hsl, saturation: value };
    onChange(convertHslToRgb(newHsl));
  };

  const handleLightnessChange = (value: number) => {
    const newHsl: ColorHSL = { ...hsl, lightness: value };
    onChange(convertHslToRgb(newHsl));
  };

  // Generate gradient backgrounds for visual feedback
  const hueGradient = 'linear-gradient(to right, ' +
    '#ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, ' +
    '#00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)';

  const saturationGradient = `linear-gradient(to right, 
    ${formatColorValue(convertHslToRgb({ ...hsl, saturation: 0 }))}, 
    ${formatColorValue(convertHslToRgb({ ...hsl, saturation: 1 }))})`;

  const lightnessGradient = `linear-gradient(to right, 
    ${formatColorValue(convertHslToRgb({ ...hsl, lightness: 0 }))}, 
    ${formatColorValue(convertHslToRgb({ ...hsl, lightness: 0.5 }))}, 
    ${formatColorValue(convertHslToRgb({ ...hsl, lightness: 1 }))})`;

  return (
    <div className="hsl-sliders">
      <h3 className="sliders-title">HSL Controls</h3>
      
      <ColorSlider
        label="Hue"
        value={hsl.hue}
        min={0}
        max={359}
        step={1}
        unit="°"
        onChange={handleHueChange}
        gradientBackground={hueGradient}
      />
      
      <ColorSlider
        label="Saturation"
        value={hsl.saturation}
        min={0}
        max={1}
        step={0.01}
        unit="%"
        onChange={handleSaturationChange}
        gradientBackground={saturationGradient}
      />
      
      <ColorSlider
        label="Lightness"
        value={hsl.lightness}
        min={0}
        max={1}
        step={0.01}
        unit="%"
        onChange={handleLightnessChange}
        gradientBackground={lightnessGradient}
      />
    </div>
  );
}