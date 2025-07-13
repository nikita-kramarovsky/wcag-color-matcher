import type { ColorOption } from '../../ColorDropdown.types';

export interface ColorDropdownMenuProps {
  options: ColorOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder: string;
}