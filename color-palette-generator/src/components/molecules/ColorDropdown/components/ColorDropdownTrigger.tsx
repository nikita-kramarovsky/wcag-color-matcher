import './ColorDropdownTrigger.css';
import { formatColorValue } from '../../../../utils/colorConversions';
import type { ColorOption } from '../ColorDropdown.types';

interface ColorDropdownTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  selectedOption: ColorOption | undefined;
  placeholder: string;
}

export function ColorDropdownTrigger({ isOpen, onClick, selectedOption, placeholder }: ColorDropdownTriggerProps) {
  return (
    <div 
      className="dropdown-trigger"
      onClick={onClick}
    >
      <div className="trigger-content">
        {selectedOption ? (
          <>
            <span 
              className="color-swatch"
              style={{ backgroundColor: formatColorValue(selectedOption.color) }}
            />
            <div className="selected-info">
              <div className="selected-main">
                <span className="selected-hex">{selectedOption.hex}</span>
                <span className="selected-ratio">{selectedOption.ratio.toFixed(1)}:1</span>
              </div>
              <div className="selected-source">{selectedOption.source}</div>
            </div>
          </>
        ) : (
          <span className="placeholder-text">{placeholder}</span>
        )}
      </div>
      <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
    </div>
  );
}
