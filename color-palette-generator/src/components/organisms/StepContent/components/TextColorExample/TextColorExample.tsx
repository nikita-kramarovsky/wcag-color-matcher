import './TextColorExample.css';
import type { TextColorExampleProps } from './TextColorExample.types';

export function TextColorExample({ currentStepColor, selectedTextColorObj, getBackgroundColor }: TextColorExampleProps) {
  return (
    <div className="selected-example">
      <div 
        className="text-example"
        style={{ 
          backgroundColor: getBackgroundColor(currentStepColor),
          color: getBackgroundColor(selectedTextColorObj.color)
        }}
      >
        <h1 style={{ color: getBackgroundColor(selectedTextColorObj.color) }}>Main Heading (H1)</h1>
        <h2 style={{ color: getBackgroundColor(selectedTextColorObj.color) }}>Section Heading (H2)</h2>
        <h3 style={{ color: getBackgroundColor(selectedTextColorObj.color) }}>Subsection Heading (H3)</h3>
        <p>This is sample body text to demonstrate readability with this color combination. The contrast ratio is {selectedTextColorObj.ratio.toFixed(1)}:1.</p>
        <p><strong>Bold text example</strong> and <em>italic text example</em></p>
        <small>Small text and fine print</small>
        <div style={{ marginTop: '10px' }}>
          <code style={{ 
            backgroundColor: getBackgroundColor(selectedTextColorObj.color), 
            color: getBackgroundColor(currentStepColor),
            padding: '2px 4px',
            borderRadius: '3px'
          }}>
            Code snippet
          </code>
        </div>
      </div>
    </div>
  );
}
