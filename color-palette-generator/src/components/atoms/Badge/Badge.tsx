import './Badge.css';
import type { BadgeProps } from './Badge.types';

export function Badge({ children, variant = 'default', style }: BadgeProps) {
  return (
    <span
      className={`badge ${variant}`}
      style={style}
    >
      {children}
    </span>
  );
}
