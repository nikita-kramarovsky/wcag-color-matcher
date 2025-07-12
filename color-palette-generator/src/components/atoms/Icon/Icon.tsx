import React, { useState, useEffect } from 'react';
import type { IconProps } from './Icon.types';

export function Icon({ icon, style }: IconProps) {
  const [SvgIcon, setSvgIcon] = useState<React.FC<React.SVGProps<SVGSVGElement>> | null>(null);

  useEffect(() => {
    if (icon) {
      import(`../../../assets/icons/${icon}.svg?react`)
        .then(module => {
          setSvgIcon(() => module.default);
        })
        .catch(err => {
          console.error(`Failed to load icon ${icon}:`, err);
          setSvgIcon(null);
        });
    }
  }, [icon]);

  if (!SvgIcon) {
    return null; // Or a fallback like a loading spinner or an empty span
  }

  return (
    <span style={style}>
      <SvgIcon />
    </span>
  );
}
