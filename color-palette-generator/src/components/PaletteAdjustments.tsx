import { ColorSlider } from './ColorSlider';
import './ColorSlider.css';

interface PaletteAdjustmentsProps {
  lightnessShift: number;
  chromaShift: number;
  onLightnessShiftChange: (value: number) => void;
  onChromaShiftChange: (value: number) => void;
}

export function PaletteAdjustments({ 
  lightnessShift, 
  chromaShift,
  onLightnessShiftChange,
  onChromaShiftChange 
}: PaletteAdjustmentsProps) {
  
  // Generate gradient for lightness shift visualization
  const lightnessGradient = 'linear-gradient(to right, #000000, #808080, #ffffff)';
  const chromaGradient = 'linear-gradient(to right, #808080, #ff0080)';

  return (
    <div className="palette-adjustments">
      <h3 className="sliders-title">Palette Adjustments</h3>
      
      <ColorSlider
        label="Lightness Shift"
        value={lightnessShift}
        min={-30}
        max={30}
        step={1}
        onChange={onLightnessShiftChange}
        gradientBackground={lightnessGradient}
      />
      
      <ColorSlider
        label="Chroma Shift"
        value={chromaShift}
        min={-20}
        max={20}
        step={1}
        onChange={onChromaShiftChange}
        gradientBackground={chromaGradient}
      />
      
      <div className="adjustment-info">
        <p className="info-text">
          <strong>Lightness Shift:</strong> Makes the entire palette lighter (+) or darker (-)
        </p>
        <p className="info-text">
          <strong>Chroma Shift:</strong> Makes colors more vivid (+) or more muted (-)
        </p>
      </div>
    </div>
  );
}