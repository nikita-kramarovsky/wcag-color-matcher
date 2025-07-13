import './PaletteTypeTabs.css';
import { Tab } from '../../atoms/Tab';
import { PALETTE_TYPES } from '../../../types/color';
import type { PaletteTypeTabsProps } from './PaletteTypeTabs.types';

export function PaletteTypeTabs({ selectedPaletteType, onPaletteTypeChange }: PaletteTypeTabsProps) {
  return (
    <div className="palette-type-tabs">
      {PALETTE_TYPES.map((type) => (
        <Tab
          key={type}
          label={type.charAt(0).toUpperCase() + type.slice(1)}
          isActive={selectedPaletteType === type}
          onClick={() => onPaletteTypeChange(type)}
        />
      ))}
    </div>
  );
}
