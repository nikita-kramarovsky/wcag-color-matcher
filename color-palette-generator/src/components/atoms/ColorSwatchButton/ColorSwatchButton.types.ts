import type React from 'react';

export interface ColorSwatchButtonProps {
  onClick: () => void;
  color: string;
  title?: string;
  style?: React.CSSProperties;
}