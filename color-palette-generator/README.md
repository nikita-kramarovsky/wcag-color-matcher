# Material-Inspired Color Palette Generator

A React TypeScript application that generates Material Design-inspired color palettes with accessibility contrast analysis.

## Features

- **Color Palette Generation**: Generate complete 10-step color palettes (50-900) from any base color
- **Multiple Harmony Types**: Primary, complementary, split-complementary, analogous, and triadic color schemes
- **Material Design Accuracy**: Uses the same LAB color space transformations as Google's Material Design
- **Accessibility Analysis**: Real-time contrast ratio calculations for WCAG compliance
- **Interactive Interface**: Live preview with hex codes and contrast information
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd color-palette-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ColorInput.tsx   # Color input form
│   ├── ColorStep.tsx    # Individual color step with contrast info
│   ├── ColorRamp.tsx    # Color palette ramp
│   ├── PaletteSection.tsx # Grouped palette sections
│   └── PaletteDisplay.tsx # Main palette display
├── hooks/
│   └── useColorPalette.ts # Main color palette logic
├── types/
│   └── color.ts         # TypeScript type definitions
├── utils/
│   ├── colorClasses.ts  # Color constructors and utilities
│   ├── colorConversions.ts # Color space conversions
│   ├── colorContrast.ts # Contrast calculations
│   └── materialPalettes.ts # Material Design palette data
└── App.tsx             # Main application component
```

## How It Works

### Color Science

The application uses the same color science as Google's Material Design system:

1. **LAB Color Space**: All palette generation happens in the perceptually uniform LAB color space
2. **CIEDE2000**: Uses the CIEDE2000 formula to find the closest Material Design palette
3. **LCH Transformations**: Adjusts lightness, chroma, and hue systematically
4. **sRGB Conversion**: Converts back to sRGB for display with proper gamma correction

### Accessibility Features

- **WCAG AA Compliance**: Highlights color combinations that meet 4.5:1 contrast ratio for text
- **WCAG AA Large Text**: Shows combinations that meet 3:1 contrast ratio for large text and UI elements
- **Real-time Analysis**: Calculates contrast ratios across all generated palette combinations
- **Visual Indicators**: Color-coded contrast status (pass/fail)

## Reusable Components

### `useColorPalette` Hook

The main business logic is encapsulated in a custom React hook:

```typescript
const { baseColorHex, colorSets, allGeneratedPalettes, error, updateBaseColor } = useColorPalette();
```

### Component Architecture

- **ColorInput**: Handles user input with validation
- **ColorStep**: Displays individual color with contrast analysis
- **ColorRamp**: Shows complete 10-step palette
- **PaletteSection**: Groups related palettes (e.g., complementary colors)
- **PaletteDisplay**: Main container for all palette sections

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for component-scoped styling
- **Google Fonts** (Roboto) for Material Design typography
- **Pure JavaScript** color science (no external color libraries)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
