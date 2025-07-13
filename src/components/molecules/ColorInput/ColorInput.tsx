import './ColorInput.css';
import { useColorInputPresenter } from './ColorInput.presenter';
import type { ColorInputProps } from './ColorInput.types';
import { ColorSwatchButton } from '../../atoms/ColorSwatchButton';
import { ColorPickerPopup } from '../../molecules/ColorPickerPopup';

export function ColorInput(props: ColorInputProps) {
  const { showPicker, pickerRef, handleSubmit, handleColorChange, togglePicker, value, onChange, error, label } = useColorInputPresenter(props);

  return (
    <div className="color-input-container">
      <form onSubmit={handleSubmit} className="input-section">
        <div className="input-group">
          {label && <label htmlFor="baseColorInput">{label}:</label>}
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
              <ColorSwatchButton
              onClick={togglePicker}
              color={value.length === 7 && value.startsWith('#') ? value : '#6200EE'}
              title="Pick a color"
            />
              {showPicker && (
                <ColorPickerPopup color={value} onChange={handleColorChange} />
              )}
            </div>
          </div>
          {error && <span className="error-message">{error}</span>}
        </div>
      </form>
    </div>
  );
}
