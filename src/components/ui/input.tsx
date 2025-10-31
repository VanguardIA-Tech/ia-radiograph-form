"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const gradientBorderStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(hsl(var(--card)), hsl(var(--card))), linear-gradient(135deg, hsl(214 100% 31%), hsl(214 100% 45%))",
  backgroundOrigin: "padding-box, border-box",
  backgroundClip: "padding-box, border-box",
  border: "1px solid transparent",
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        {...props}
        className={cn(
          "w-full rounded-md bg-card text-foreground placeholder:opacity-70 transition focus:outline-none focus:ring-0",
          "px-3 py-2 text-sm",
          className
        )}
        style={gradientBorderStyle}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;