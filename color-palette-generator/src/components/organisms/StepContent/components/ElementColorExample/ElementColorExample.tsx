import './ElementColorExample.css';
import type { ElementColorExampleProps } from './ElementColorExample.types';
import { Button } from '../../../../atoms/Button';
import { Icon } from '../../../../atoms/Icon';
import { Badge } from '../../../../atoms/Badge';
import { ProgressBar } from '../../../../molecules/ProgressBar';
import { Alert } from '../../../../molecules/Alert';

export function ElementColorExample({ currentStepColor, selectedElementColorObj, getBackgroundColor, getForegroundColor }: ElementColorExampleProps) {
  return (
    <div className="selected-example">
      <div
        className="element-examples"
        style={{ backgroundColor: getBackgroundColor(currentStepColor) }}
      >
        <div className="form-elements">
          <div className="form-group">
            <label style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <input
                type="checkbox"
                style={{ accentColor: getBackgroundColor(selectedElementColorObj.color) }}
              />
              Checkbox with label
            </label>
          </div>

          <div className="form-group">
            <label style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <input
                type="radio"
                name="sample-radio"
                style={{ accentColor: getBackgroundColor(selectedElementColorObj.color) }}
              />
              Radio button option
            </label>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Input field"
              style={{
                borderColor: getBackgroundColor(selectedElementColorObj.color),
                backgroundColor: 'transparent',
                color: getBackgroundColor(selectedElementColorObj.color)
              }}
            />
          </div>

          <div className="form-group">
            <select style={{
              borderColor: getBackgroundColor(selectedElementColorObj.color),
              backgroundColor: getBackgroundColor(currentStepColor),
              color: getBackgroundColor(selectedElementColorObj.color)
            }}>
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <Button
            variant="primary"
            style={{
              backgroundColor: getBackgroundColor(selectedElementColorObj.color),
              color: getForegroundColor(selectedElementColorObj.color),
            }}
          >
            Primary Button
          </Button>
          <Button
            variant="secondary"
            style={{
              backgroundColor: 'transparent',
              borderColor: getBackgroundColor(selectedElementColorObj.color),
              color: getBackgroundColor(selectedElementColorObj.color),
            }}
          >
            Secondary Button
          </Button>
        </div>

        <div className="icon-examples">
          <div className="icon-group">
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
              </svg>
              Settings
            </Icon>
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
              Search
            </Icon>
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
              </svg>
              Document
            </Icon>
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
              Success
            </Icon>
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,7H13V9H11V7M11,11H13V17H11V11Z" />
              </svg>
              Info
            </Icon>
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H5V21H19V9Z" />
              </svg>
              Profile
            </Icon>
          </div>
        </div>

        <div
          className="sample-card"
          style={{
            backgroundColor: getBackgroundColor(selectedElementColorObj.color),
            color: getForegroundColor(selectedElementColorObj.color)
          }}
        >
          <h4>Card Component</h4>
          <p>Card content with contrast ratio {selectedElementColorObj.ratio.toFixed(1)}:1</p>
        </div>

        <div
          className="sample-border"
          style={{
            borderColor: getBackgroundColor(selectedElementColorObj.color),
            color: getForegroundColor(currentStepColor)
          }}
        >
          <div className="border-content">
            <strong>Border Element</strong>
            <p>Content with colored border</p>
          </div>
        </div>

        <div className="navigation-examples">
          <div className="nav-tabs">
            <button
              className="nav-tab active"
              style={{
                backgroundColor: getBackgroundColor(selectedElementColorObj.color),
                color: getForegroundColor(selectedElementColorObj.color),
                borderBottomColor: getBackgroundColor(selectedElementColorObj.color)
              }}
            >
              Active Tab
            </button>
            <button
              className="nav-tab"
              style={{
                backgroundColor: 'transparent',
                color: getBackgroundColor(selectedElementColorObj.color),
                borderBottomColor: 'transparent'
              }}
            >
              Tab 2
            </button>
            <button
              className="nav-tab"
              style={{
                backgroundColor: 'transparent',
                color: getBackgroundColor(selectedElementColorObj.color),
                borderBottomColor: 'transparent'
              }}
            >
              Tab 3
            </button>
          </div>
        </div>

        <div className="badge-examples">
          <Badge
            style={{
              backgroundColor: getBackgroundColor(selectedElementColorObj.color),
              color: getForegroundColor(selectedElementColorObj.color),
            }}
          >
            Badge
          </Badge>
          <Badge
            variant="outline"
            style={{
              backgroundColor: 'transparent',
              borderColor: getBackgroundColor(selectedElementColorObj.color),
              color: getBackgroundColor(selectedElementColorObj.color),
            }}
          >
            Outline Badge
          </Badge>
          <Badge
            variant="dot"
            style={{
              backgroundColor: getBackgroundColor(selectedElementColorObj.color),
            }}
          >
            •
          </Badge>
        </div>

        <div className="progress-examples">
          <ProgressBar
            progress={65}
            color={getBackgroundColor(selectedElementColorObj.color)}
            textColor={getBackgroundColor(selectedElementColorObj.color)}
          />
        </div>

        <div className="alert-examples">
          <Alert
            style={{
              backgroundColor: getBackgroundColor(selectedElementColorObj.color),
              color: getForegroundColor(selectedElementColorObj.color),
            }}
          >
            <strong>Alert Message</strong> - This is an alert component
          </Alert>
          <Alert
            variant="outline"
            style={{
              backgroundColor: 'transparent',
              borderColor: getBackgroundColor(selectedElementColorObj.color),
              color: getBackgroundColor(selectedElementColorObj.color),
            }}
          >
            <strong>Outline Alert</strong> - This is an outline alert
          </Alert>
        </div>

        <div className="list-examples">
          <ul style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
            <li>List item with bullet</li>
            <li>Another list item</li>
            <li>Third list item</li>
          </ul>
          <ol style={{ color: getBackgroundColor(selectedElementColorObj.color) }}>
            <li>Numbered list item</li>
            <li>Second numbered item</li>
            <li>Third numbered item</li>
          </ol>
        </div>

        <div className="link-examples">
          <a
            href="#"
            style={{
              color: getBackgroundColor(selectedElementColorObj.color),
              textDecoration: 'underline'
            }}
          >
            Link Example
          </a>
          <span> | </span>
          <a
            href="#"
            style={{
              color: getBackgroundColor(selectedElementColorObj.color),
              textDecoration: 'none'
            }}
          >
            Link No Underline
          </a>
        </div>

        <div className="table-example">
          <table style={{ borderColor: getBackgroundColor(selectedElementColorObj.color) }}>
            <thead>
              <tr style={{ backgroundColor: getBackgroundColor(selectedElementColorObj.color) }}>
                <th style={{ color: getForegroundColor(selectedElementColorObj.color) }}>Column 1</th>
                <th style={{ color: getForegroundColor(selectedElementColorObj.color) }}>Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ borderColor: getBackgroundColor(selectedElementColorObj.color) }}>Row 1, Cell 1</td>
                <td style={{ borderColor: getBackgroundColor(selectedElementColorObj.color) }}>Row 1, Cell 2</td>
              </tr>
              <tr>
                <td style={{ borderColor: getBackgroundColor(selectedElementColorObj.color) }}>Row 2, Cell 1</td>
                <td style={{ borderColor: getBackgroundColor(selectedElementColorObj.color) }}>Row 2, Cell 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
