import './ColorDropdownOption.css';
import { formatColorValue } from '../../../../utils/colorConversions';
import type { ColorOption } from '../ColorDropdown.types';

interface ColorDropdownOptionProps {
  option: ColorOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export function ColorDropdownOption({ option, isSelected, onSelect }: ColorDropdownOptionProps) {
  return (
    <div
      className={`dropdown-option ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(option.hex)}
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
  );
}
