import './StepContent.css';
import { ColorDropdown } from '../../molecules/ColorDropdown';
import { ColorInput } from '../../molecules/ColorInput';
import { TextColorExample } from './components/TextColorExample';
import { ElementColorExample } from './components/ElementColorExample';
import { useStepContentPresenter } from './StepContent.presenter';
import type { StepContentProps } from './StepContent.types';

export function StepContent(props: StepContentProps) {
  const {
    selectedStep,
    selectedPalette,
    colorSets,
    currentStepColor,
    textCompatibleColors,
    elementCompatibleColors,
    selectedTextColor,
    setSelectedTextColor,
    selectedElementColor,
    setSelectedElementColor,
    selectedTextColorObj,
    selectedElementColorObj,
    getTextColorLabel,
    getElementColorLabel,
    getBackgroundColor,
    getForegroundColor,
    getHexValue,
    formatColorValue,
  } = useStepContentPresenter(props);

  if (colorSets.length === 0) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Enter a base color to generate palettes</div>
      </div>
    );
  }

  if (selectedPalette === null) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Select a palette to view details</div>
      </div>
    );
  }

  if (!currentStepColor) {
    return (
      <div className="step-content empty">
        <div className="empty-message">Color not available for this step</div>
      </div>
    );
  }

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Step {selectedStep} - Color Combinations</h2>
        <div className="current-colors">
          <div className="current-color">
            <div 
              className="color-swatch"
              style={{ backgroundColor: formatColorValue(currentStepColor) }}
            />
            <span>Background: {getHexValue(currentStepColor)}</span>
          </div>
          
          <div className="current-color-input">
            <ColorInput
              value={selectedTextColorObj?.hex || ''}
              onChange={setSelectedTextColor}
              label={getTextColorLabel()}
            />
          </div>
          
          <div className="current-color-input">
            <ColorInput
              value={selectedElementColorObj?.hex || ''}
              onChange={setSelectedElementColor}
              label={getElementColorLabel()}
            />
          </div>
        </div>
      </div>
      
      <div className="color-columns">
        <div className="text-column">
          <h3>Text Colors (4.5:1 contrast)</h3>
          <ColorDropdown
            options={textCompatibleColors}
            value={selectedTextColor}
            onChange={setSelectedTextColor}
            placeholder="Select a text color..."
          />
          
          {selectedTextColorObj && (
            <TextColorExample
              currentStepColor={currentStepColor}
              selectedTextColorObj={selectedTextColorObj}
              getBackgroundColor={getBackgroundColor}
            />
          )}
        </div>

        <div className="element-column">
          <h3>Element Colors (3:1 contrast)</h3>
          <ColorDropdown
            options={elementCompatibleColors}
            value={selectedElementColor}
            onChange={setSelectedElementColor}
            placeholder="Select an element color..."
          />
          
          {selectedElementColorObj && (
            <ElementColorExample
              currentStepColor={currentStepColor}
              selectedElementColorObj={selectedElementColorObj}
              getBackgroundColor={getBackgroundColor}
              getForegroundColor={getForegroundColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}
