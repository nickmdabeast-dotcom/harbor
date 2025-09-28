"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "solid", size = "md", type = "button", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const variants = {
    solid: "bg-red-600 text-cream hover:bg-red-700 focus:ring-red-600",
    outline: "border border-cream text-cream hover:bg-cream hover:text-charcoal focus:ring-cream"
  };
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
});
