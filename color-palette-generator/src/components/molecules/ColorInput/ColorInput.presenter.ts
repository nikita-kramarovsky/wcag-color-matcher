import { useState, useRef, useEffect } from 'react';
import type { ColorInputProps } from './ColorInput.types';

export const useColorInputPresenter = ({ value, onChange, error, label }: ColorInputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleColorChange = (color: string) => {
    onChange(color);
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  return {
    showPicker,
    pickerRef,
    handleSubmit,
    handleColorChange,
    togglePicker,
    value,
    onChange,
    error,
    label,
  };
};
