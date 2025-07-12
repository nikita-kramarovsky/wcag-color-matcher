import './StepTab.css';
import type { StepTabProps } from './StepTab.types';

export function StepTab({ step, index, onStepChange, backgroundColor, hexValue, isActive, textColor }: StepTabProps) {
  return (
    <button
      key={step}
      className={`step-tab ${isActive ? 'active' : ''}`}
      onClick={() => onStepChange(index)}
      style={{ backgroundColor }}
    >
      <div className="step-tab-content" style={{ color: textColor }}>
        <span className="step-tab-number">{step}</span>
        {hexValue && <span className="step-tab-hex">{hexValue}</span>}
      </div>
    </button>
  );
}
