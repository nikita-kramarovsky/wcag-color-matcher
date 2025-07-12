import type { HexColorPicker } from 'react-colorful';
import type React from 'react';

export interface ColorPickerPopupProps {
  color: React.ComponentProps<typeof HexColorPicker>['color'];
  onChange: React.ComponentProps<typeof HexColorPicker>['onChange'];
}