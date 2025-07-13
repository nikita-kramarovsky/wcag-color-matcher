import './ColorSwatchButton.css';
import type { ColorSwatchButtonProps } from './ColorSwatchButton.types';

export function ColorSwatchButton({ onClick, color, title }: ColorSwatchButtonProps) {
  return (
    <button
      type="button"
      className="color-swatch"
      onClick={onClick}
      style={{ backgroundColor: color }}
      title={title}
    />
  );
}
