import type { ColorRGBA } from '../types/color';
import { PALETTE_STEPS } from '../types/color';
import { ColorStep } from './ColorStep';
import './ColorRamp.css';

interface ColorRampProps {
  palette: ColorRGBA[];
  allPalettes: ColorRGBA[][];
}

export function ColorRamp({ palette, allPalettes }: ColorRampProps) {
  return (
    <div className="color-ramp">
      {palette.map((color, index) => (
        <ColorStep
          key={index}
          color={color}
          step={PALETTE_STEPS[index]}
          allPalettes={allPalettes}
        />
      ))}
    </div>
  );
}