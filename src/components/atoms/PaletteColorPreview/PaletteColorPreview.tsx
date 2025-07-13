import './PaletteColorPreview.css';
import type { PaletteColorPreviewProps } from './PaletteColorPreview.types';

export function PaletteColorPreview({ backgroundColor, title, onClick, isSelected }: PaletteColorPreviewProps) {
  return (
    <div
      className={`palette-color-preview ${isSelected ? 'selected' : ''}`}
      style={{ backgroundColor }}
      title={title}
      onClick={onClick}
    />
  );
}
