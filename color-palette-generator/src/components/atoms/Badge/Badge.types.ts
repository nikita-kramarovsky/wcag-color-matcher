import type { CSSProperties, ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'dot';
  style?: CSSProperties;
}
