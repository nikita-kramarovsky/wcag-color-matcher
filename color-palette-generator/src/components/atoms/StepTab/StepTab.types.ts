import type React from 'react';


export interface StepTabProps {
  step: string;
  index: number;
  onStepChange: (index: number) => void;
  backgroundColor: string;
  hexValue: string;
  isActive: boolean;
  textColor: string;
  style?: React.CSSProperties;
}