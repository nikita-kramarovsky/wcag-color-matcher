import './PaletteList.css';
import { usePaletteListPresenter } from './PaletteList.presenter';
import type { PaletteListProps } from './PaletteList.types';
import { PaletteColorPreview } from '../../atoms/PaletteColorPreview';

export function PaletteList(props: PaletteListProps) {
  const { colorSets, getPaletteColorPreviewProps } = usePaletteListPresenter(props);

  if (colorSets.length === 0) {
    return (
      <div className="palette-list empty">
        <div className="empty-message">No palettes generated</div>
      </div>
    );
  }

  return (
    <div className="palette-list">
      {colorSets.map((colorSet, setIndex) => (
        <div key={setIndex} className="palette-item">
          <div className="palette-name">{colorSet.title}</div>
          <div className="palette-colors">
            {colorSet.colors.map((_, colorIndex) => {
              const previewProps = getPaletteColorPreviewProps(setIndex, colorIndex);
              
              if (!previewProps) return null;
              
              return (
                <PaletteColorPreview
                  key={colorIndex}
                  backgroundColor={previewProps.backgroundColor}
                  title={previewProps.title}
                  onClick={previewProps.onClick}
                  isSelected={previewProps.isSelected}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
