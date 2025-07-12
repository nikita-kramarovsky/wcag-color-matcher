import type { ColorOption } from '../../ColorDropdown.types';

export interface ColorDropdownTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  selectedOption: ColorOption | undefined;
  placeholder: string;
}
