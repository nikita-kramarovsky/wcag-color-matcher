import type { CSSProperties, ReactNode } from 'react';

export interface AlertProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  style?: CSSProperties;
}
