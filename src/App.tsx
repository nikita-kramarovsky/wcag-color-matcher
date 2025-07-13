import { useState, useEffect } from 'react';
import { ColorInput } from './components/molecules/ColorInput/ColorInput';
import { StepTabs } from './components/molecules/StepTabs/StepTabs';
import { PaletteList } from './components/organisms/PaletteList/PaletteList';
import { StepContent } from './components/organisms/StepContent/StepContent';
import { useColorPalette } from './hooks/useColorPalette';
import { PALETTE_STEPS, type PaletteType } from './types/color';
import { PaletteTypeTabs } from './components/molecules/PaletteTypeTabs/PaletteTypeTabs';
import './App.css';

function App() {
  const { baseColorHex, basePalette, updateBaseColor } = useColorPalette();
  const [selectedStep, setSelectedStep] = useState(5); // Default to step 500 (index 5)
  const [colorDefaultStep, setColorDefaultStep] = useState(5);
  const [selectedPalette, setSelectedPalette] = useState<number | null>(0);
  const [paletteType, setPaletteType] = useState<PaletteType>('base');
  
  const { colorSets, allBasePalettes, allBackgroundPalettes, suggestedStep, error } = basePalette;
  
  // Get current palette based on selection
  const currentPalettes = paletteType === 'base' ? allBasePalettes : allBackgroundPalettes;
  
  // Update selected step when suggested step changes
  useEffect(() => {
    setColorDefaultStep(suggestedStep);
  }, [suggestedStep]);

  return (
    <div className="app">
      <div className="left-container">
        <h1>WCAG Color Matcher Inspired By Material UI</h1>
        <ColorInput
          value={baseColorHex}
          onChange={updateBaseColor}
          error={error}
          label="Enter Base Color (Hex)"
        />
        
        <div className="palette-type-selector">
          <label>Palette Type:</label>
          <PaletteTypeTabs
            selectedPaletteType={paletteType}
            onPaletteTypeChange={setPaletteType}
          />
        </div>
        
        <PaletteList
          colorSets={colorSets}
          selectedStep={colorDefaultStep}
          currentPalettes={currentPalettes}
          selectedPalette={selectedPalette}
          onPaletteSelect={setSelectedPalette}
        />
      </div>
      
      <div className="right-container">
        <StepTabs
          steps={PALETTE_STEPS}
          selectedStep={selectedStep}
          onStepChange={setSelectedStep}
          selectedPalette={selectedPalette}
          currentPalettes={currentPalettes}
        />
        
        <div className="step-content-wrapper">
          <StepContent
            colorSets={colorSets}
            selectedStep={selectedStep}
            currentPalettes={currentPalettes}
            allGeneratedPalettes={[...allBasePalettes, ...allBackgroundPalettes]}
            selectedPalette={selectedPalette}
          />
        </div>
      </div>
    </div>
  );
}

export default App
