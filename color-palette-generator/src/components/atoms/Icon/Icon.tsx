import type { IconProps } from './Icon.types';

export function Icon({ children, style }: IconProps) {
  return (
    <span style={style}>
      {children}
    </span>
  );
}
