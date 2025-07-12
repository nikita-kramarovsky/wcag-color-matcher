import './StepTabs.css';
import { useStepTabsPresenter } from './StepTabs.presenter';
import type { StepTabsProps } from './StepTabs.types';
import { StepTab } from '../../atoms/StepTab';

export function StepTabs(props: StepTabsProps) {
  const { steps, onStepChange, getTabProps } = useStepTabsPresenter(props);

  return (
    <div className="step-tabs">
      {steps.map((step, index) => (
        <StepTab
          key={index}
          step={step.toString()}
          index={index}
          onStepChange={onStepChange}
          backgroundColor={getTabProps(index).backgroundColor}
          hexValue={getTabProps(index).hexValue}
          isActive={getTabProps(index).isActive}
          textColor={getTabProps(index).textColor}
        />
      ))}
    </div>
  );
}
