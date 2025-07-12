import './Button.css';
import type { ButtonProps } from './Button.types';

export function Button({ onClick, children, variant = 'primary', style, className }: ButtonProps) {
  return (
    <button
      className={`sample-button ${variant} ${className || ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
