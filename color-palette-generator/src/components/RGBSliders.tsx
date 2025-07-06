import type { ColorRGBA } from '../types/color';
import { ColorSlider } from './ColorSlider';
import { createColorRGBA } from '../utils/colorClasses';
import { formatColorValue } from '../utils/colorConversions';
import './ColorSlider.css';

interface RGBSlidersProps {
  color: ColorRGBA;
  onChange: (color: ColorRGBA) => void;
}

export function RGBSliders({ color, onChange }: RGBSlidersProps) {
  const handleRedChange = (value: number) => {
    onChange(createColorRGBA(value, color.green, color.blue, color.alpha));
  };

  const handleGreenChange = (value: number) => {
    onChange(createColorRGBA(color.red, value, color.blue, color.alpha));
  };

  const handleBlueChange = (value: number) => {
    onChange(createColorRGBA(color.red, color.green, value, color.alpha));
  };

  // Generate gradient backgrounds for visual feedback
  const redGradient = `linear-gradient(to right, 
    ${formatColorValue(createColorRGBA(0, color.green, color.blue, 1))}, 
    ${formatColorValue(createColorRGBA(1, color.green, color.blue, 1))})`;

  const greenGradient = `linear-gradient(to right, 
    ${formatColorValue(createColorRGBA(color.red, 0, color.blue, 1))}, 
    ${formatColorValue(createColorRGBA(color.red, 1, color.blue, 1))})`;

  const blueGradient = `linear-gradient(to right, 
    ${formatColorValue(createColorRGBA(color.red, color.green, 0, 1))}, 
    ${formatColorValue(createColorRGBA(color.red, color.green, 1, 1))})`;

  return (
    <div className="rgb-sliders">
      <h3 className="sliders-title">RGB Controls</h3>
      
      <ColorSlider
        label="Red"
        value={color.red}
        min={0}
        max={1}
        step={0.01}
        onChange={handleRedChange}
        gradientBackground={redGradient}
      />
      
      <ColorSlider
        label="Green"
        value={color.green}
        min={0}
        max={1}
        step={0.01}
        onChange={handleGreenChange}
        gradientBackground={greenGradient}
      />
      
      <ColorSlider
        label="Blue"
        value={color.blue}
        min={0}
        max={1}
        step={0.01}
        onChange={handleBlueChange}
        gradientBackground={blueGradient}
      />
    </div>
  );
}