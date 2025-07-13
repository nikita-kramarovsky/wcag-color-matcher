import type { ColorOption } from '../../ColorDropdown.types';

export interface ColorDropdownOptionProps {
  option: ColorOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}
