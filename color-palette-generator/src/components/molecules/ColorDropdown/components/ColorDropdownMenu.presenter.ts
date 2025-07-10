import type { ColorDropdownMenuProps } from './ColorDropdownMenu.types';

export const useColorDropdownMenuPresenter = ({ options, value, onSelect, placeholder }: ColorDropdownMenuProps) => {
  const handlePlaceholderClick = () => {
    onSelect('');
  };

  return {
    handlePlaceholderClick,
    options,
    value,
    onSelect,
    placeholder,
  };
};
