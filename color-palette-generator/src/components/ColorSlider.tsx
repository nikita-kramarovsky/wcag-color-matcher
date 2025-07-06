interface ColorSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  gradientBackground?: string;
}

export function ColorSlider({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  unit = '', 
  onChange, 
  gradientBackground 
}: ColorSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const displayValue = unit === '%' ? Math.round(value * 100) : Math.round(value);

  return (
    <div className="color-slider">
      <div className="slider-header">
        <label className="slider-label">{label}</label>
        <span className="slider-value">{displayValue}{unit}</span>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="slider-input"
          style={gradientBackground ? { background: gradientBackground } : undefined}
        />
      </div>
    </div>
  );
}