import { HexColorPicker } from 'react-colorful';
import './ColorPickerPopup.css';
import type { ColorPickerPopupProps } from './ColorPickerPopup.types';

export function ColorPickerPopup({ color, onChange }: ColorPickerPopupProps) {
  return (
    <div className="color-picker-popup">
      <HexColorPicker color={color} onChange={onChange} />
    </div>
  );
}
