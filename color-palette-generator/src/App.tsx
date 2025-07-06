import { ColorInput } from './components/ColorInput';
import { PaletteDisplay } from './components/PaletteDisplay';
import { useColorPalette } from './hooks/useColorPalette';
import './App.css';

function App() {
  const { baseColorHex, colorSets, allGeneratedPalettes, error, updateBaseColor } = useColorPalette();

  return (
    <div className="app">
      <div className="container">
        <ColorInput
          value={baseColorHex}
          onChange={updateBaseColor}
          error={error}
        />
        <PaletteDisplay
          colorSets={colorSets}
          allGeneratedPalettes={allGeneratedPalettes}
        />
      </div>
    </div>
  );
}

export default App
