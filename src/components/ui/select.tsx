"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const gradientBorderStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(hsl(var(--card)), hsl(var(--card))), linear-gradient(135deg, hsl(214 100% 31%), hsl(214 100% 45%))",
  backgroundOrigin: "padding-box, border-box",
  backgroundClip: "padding-box, border-box",
  border: "1px solid transparent",
};

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      {...props}
      className={cn(
        "inline-flex items-center justify-between w-full rounded-md bg-card text-foreground px-3 py-2 text-sm transition focus:outline-none focus:ring-0",
        className
      )}
      style={gradientBorderStyle}
    >
      {children}
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      {...props}
      className={cn("select-item px-2 py-2 text-sm cursor-pointer", className)}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export default Select;