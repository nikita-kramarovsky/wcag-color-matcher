export interface ColorOption {
  hex: string;
  ratio: number;
  source: string;
  color: { red: number; green: number; blue: number; alpha: number };
}

export interface ColorDropdownProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
