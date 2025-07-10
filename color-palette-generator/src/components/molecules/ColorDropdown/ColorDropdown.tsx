import { ColorDropdownTrigger } from './components/ColorDropdownTrigger';
import { ColorDropdownMenu } from './components';
import { useColorDropdownPresenter } from './ColorDropdown.presenter';
import type { ColorDropdownProps } from './ColorDropdown.types';
import './ColorDropdown.css';

export function ColorDropdown({ options, value, onChange, placeholder }: ColorDropdownProps) {
  const {
    isOpen,
    setIsOpen,
    dropdownRef,
    selectedOption,
    handleOptionSelect,
  } = useColorDropdownPresenter({ options, value, onChange, placeholder });

  return (
    <div className="color-dropdown" ref={dropdownRef}>
      <ColorDropdownTrigger
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        selectedOption={selectedOption}
        placeholder={placeholder}
      />

      {isOpen && (
        <ColorDropdownMenu
          options={options}
          value={value}
          onSelect={handleOptionSelect}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
