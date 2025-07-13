import './TextOnElementExample.css';
import type { TextOnElementExampleProps } from './TextOnElementExample.types';

export function TextOnElementExample({
  currentStepColor,
  selectedElementColorObj,
  selectedTextOnElementColorObj,
  getBackgroundColor,
}: TextOnElementExampleProps) {
  return (
    <div
      className="text-on-element-example"
      style={{
        backgroundColor: getBackgroundColor(currentStepColor),
      }}
    >
      <div
        className="text-on-element-example-inner"
        style={{
          backgroundColor: getBackgroundColor(selectedElementColorObj.color),
          color: getBackgroundColor(selectedTextOnElementColorObj.color),
        }}
      >
        <h4>Text on Element Example</h4>
        <p>
          This is sample text on the selected element color. The contrast ratio is
          {selectedTextOnElementColorObj.ratio.toFixed(1)}:1.
        </p>
        <p>
          <strong
            style={{
              color: getBackgroundColor(selectedTextOnElementColorObj.color),
            }}
          >
            Bold text example
          </strong>
          and
          <em
            style={{
              color: getBackgroundColor(selectedTextOnElementColorObj.color),
            }}
          >
            italic text example
          </em>
        </p>
      </div>
    </div>
  );
}
