import type React from 'react';

export interface PaletteColorPreviewProps {
  backgroundColor: string;
  title: string;
  onClick: () => void;
  isSelected: boolean;
  style?: React.CSSProperties;
}