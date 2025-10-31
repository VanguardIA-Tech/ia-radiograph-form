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

/**
 * Styled SelectContent
 * - ensures the dropdown has a solid background (bg-card), border, rounded corners and shadow
 * - places items inside a viewport for proper scroll behaviour
 */
export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        {...props}
        className={cn(
          "z-50 overflow-hidden rounded-md border border-border bg-card shadow-medium",
          "min-w-[220px] text-foreground",
          className
        )}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "SelectContent";

/**
 * Styled SelectItem
 * - gives each item padding, hover and focus styles and a clear selected state
 */
export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      {...props}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none",
        "data-[highlighted]:bg-secondary/70 data-[highlighted]:text-foreground",
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        className
      )}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center" />
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export default Select;