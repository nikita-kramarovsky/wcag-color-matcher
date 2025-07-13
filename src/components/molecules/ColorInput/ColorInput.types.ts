export interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  label?: string;
}
