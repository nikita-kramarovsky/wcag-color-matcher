import type { ColorOption } from '../ColorDropdown.types';

export interface ColorDropdownMenuProps {
  options: ColorOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

export interface ColorDropdownMenuPresenterProps {
  options: ColorOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder: string;
}

export interface ColorDropdownMenuPresenterHook {
  handlePlaceholderClick: () => void;
  options: ColorOption[];
  value: string;
  onSelect: (value: string) => void;
  placeholder: string;
}
