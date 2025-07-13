import type React from 'react';

export interface ProgressBarProps {
  progress: number;
  color: string;
  textColor: string;
  style?: React.CSSProperties;
}