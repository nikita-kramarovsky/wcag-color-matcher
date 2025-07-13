import './ProgressBar.css';
import type { ProgressBarProps } from './ProgressBar.types';

export function ProgressBar({ progress, color, textColor }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill"
        style={{ 
          backgroundColor: color,
          width: `${progress}%`
        }}
      ></div>
      <div className="progress-text" style={{ color: textColor }}>
        {progress}% Complete
      </div>
    </div>
  );
}
