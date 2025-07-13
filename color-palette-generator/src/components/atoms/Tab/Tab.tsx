import './Tab.css';
import type { TabProps } from './Tab.types';

export function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
    >
      {label}
    </button>
  );
}
