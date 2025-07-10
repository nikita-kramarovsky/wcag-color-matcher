import './ColorDropdownMenu.css';
import { ColorDropdownOption } from './ColorDropdownOption';
import { useColorDropdownMenuPresenter } from './ColorDropdownMenu.presenter';
import type { ColorDropdownMenuProps } from './ColorDropdownMenu.types';

export function ColorDropdownMenu(props: ColorDropdownMenuProps) {
  const { handlePlaceholderClick, options, value, onSelect, placeholder } = useColorDropdownMenuPresenter(props);

  return (
    <div className="dropdown-menu">
      <div 
        className="dropdown-option placeholder-option"
        onClick={handlePlaceholderClick}
      >
        {placeholder}
      </div>
      {options.map((option, index) => (
        <ColorDropdownOption
          key={index}
          option={option}
          isSelected={value === option.hex}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
