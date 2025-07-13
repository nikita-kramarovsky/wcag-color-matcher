import './Alert.css';
import type { AlertProps } from './Alert.types';

export function Alert({ children, variant = 'default', style }: AlertProps) {
  return (
    <div
      className={`alert ${variant}`}
      style={style}
    >
      {children}
    </div>
  );
}
