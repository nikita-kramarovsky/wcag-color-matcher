import React from 'react';
import './ColorInput.css';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function ColorInput({ value, onChange, error }: ColorInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="color-input-container">
      <h1>Material-Inspired Color Palette Generator</h1>
      
      <form onSubmit={handleSubmit} className="input-section">
        <div className="input-group">
          <label htmlFor="baseColorInput">Enter Base Color (Hex):</label>
          <input
            type="text"
            id="baseColorInput"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#RRGGBB"
            className={error ? 'error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
      </form>
    </div>
  );
}