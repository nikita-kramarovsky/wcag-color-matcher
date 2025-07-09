import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import './ColorInput.css';

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export function ColorInput({ value, onChange, error }: ColorInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleColorChange = (color: string) => {
    onChange(color);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="color-input-container">
      <form onSubmit={handleSubmit} className="input-section">
        <div className="input-group">
          <label htmlFor="baseColorInput">Enter Base Color (Hex):</label>
          <div className="color-input-wrapper">
            <input
              type="text"
              id="baseColorInput"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#RRGGBB"
              className={error ? 'error' : ''}
            />
            <div className="color-picker-container" ref={pickerRef}>
              <button
                type="button"
                className="color-swatch"
                onClick={togglePicker}
                style={{ backgroundColor: value.length === 7 && value.startsWith('#') ? value : '#6200EE' }}
                title="Pick a color"
              />
              {showPicker && (
                <div className="color-picker-popup">
                  <HexColorPicker color={value} onChange={handleColorChange} />
                </div>
              )}
            </div>
          </div>
          {error && <span className="error-message">{error}</span>}
        </div>
      </form>
    </div>
  );
}