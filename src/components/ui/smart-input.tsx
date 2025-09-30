import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface SmartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
  onAutoDetect?: (detectedValues: Record<string, string>) => void;
  autoDetectFn?: (value: string) => Record<string, string>;
}

export const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
  ({ className, onValueChange, onAutoDetect, autoDetectFn, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      if (onValueChange) {
        onValueChange(value);
      }
      
      if (onChange) {
        onChange(e);
      }
      
      // Auto-detect values after a short delay
      if (autoDetectFn && onAutoDetect && value.trim().length > 2) {
        setTimeout(() => {
          const detected = autoDetectFn(value);
          if (Object.values(detected).some(v => v)) {
            onAutoDetect(detected);
          }
        }, 500);
      }
    };

    return (
      <Input
        className={cn(className)}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);

SmartInput.displayName = "SmartInput";