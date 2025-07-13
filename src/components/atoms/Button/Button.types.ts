import type { CSSProperties, ReactNode } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  style?: CSSProperties;
  className?: string;
}
