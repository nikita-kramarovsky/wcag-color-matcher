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
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="SettingsIcon" />
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="SearchIcon" />
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="DocumentIcon" />
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="SuccessIcon" />
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="InfoIcon" />
            <Icon style={{ color: getBackgroundColor(selectedElementColorObj.color) }} icon="ProfileIcon" />
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
