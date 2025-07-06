import { useState, useEffect } from 'react';
import { ColorInput } from './components/ColorInput';
import { StepTabs } from './components/StepTabs';
import { PaletteList } from './components/PaletteList';
import { StepContent } from './components/StepContent';
import { useColorPalette } from './hooks/useColorPalette';
import { PALETTE_STEPS } from './types/color';
import './App.css';

function App() {
  const { baseColorHex, colorSets, allGeneratedPalettes, suggestedStep, error, updateBaseColor } = useColorPalette();
  const [selectedStep, setSelectedStep] = useState(5); // Default to step 500 (index 5)
  const [colorDefaultStep, setColorDefaultStep] = useState(5);
  const [selectedPalette, setSelectedPalette] = useState<number | null>(null);
  
  // Update selected step when suggested step changes
  useEffect(() => {
    setColorDefaultStep(suggestedStep);
  }, [suggestedStep]);

  return (
    <div className="app">
      <div className="left-container">
        <ColorInput
          value={baseColorHex}
          onChange={updateBaseColor}
          error={error}
        />
        <PaletteList
          colorSets={colorSets}
          selectedStep={colorDefaultStep}
          allGeneratedPalettes={allGeneratedPalettes}
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
          allGeneratedPalettes={allGeneratedPalettes}
        />
        
        <div className="step-content-wrapper">
          <StepContent
            colorSets={colorSets}
            selectedStep={selectedStep}
            allGeneratedPalettes={allGeneratedPalettes}
            selectedPalette={selectedPalette}
          />
        </div>
      </div>
    </div>
  );
}

export default App
