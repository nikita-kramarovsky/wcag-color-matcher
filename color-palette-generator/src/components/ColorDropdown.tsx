import { useState, useRef, useEffect } from 'react';
import { formatColorValue } from '../utils/colorConversions';
import './ColorDropdown.css';

interface ColorOption {
  hex: string;
  ratio: number;
  source: string;
  color: { red: number; green: number; blue: number; alpha: number };
}

interface ColorDropdownProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function ColorDropdown({ options, value, onChange, placeholder }: ColorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.hex === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="color-dropdown" ref={dropdownRef}>
      <div 
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="trigger-content">
          {selectedOption ? (
            <>
              <span 
                className="color-swatch"
                style={{ backgroundColor: formatColorValue(selectedOption.color) }}
              />
              <span className="selected-text">
                {selectedOption.hex} - {selectedOption.ratio.toFixed(1)}:1
              </span>
            </>
          ) : (
            <span className="placeholder-text">{placeholder}</span>
          )}
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div 
            className="dropdown-option placeholder-option"
            onClick={() => handleOptionSelect('')}
          >
            {placeholder}
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-option ${value === option.hex ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option.hex)}
            >
              <span 
                className="color-swatch"
                style={{ backgroundColor: formatColorValue(option.color) }}
              />
              <div className="option-content">
                <div className="option-main">
                  <span className="hex-value">{option.hex}</span>
                  <span className="contrast-ratio">{option.ratio.toFixed(1)}:1</span>
                </div>
                <div className="option-source">{option.source}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}