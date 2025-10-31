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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-md bg-card text-foreground placeholder:opacity-70 transition focus:outline-none focus:ring-0",
          "px-3 py-2 text-sm resize-none",
          className
        )}
        style={gradientBorderStyle}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;