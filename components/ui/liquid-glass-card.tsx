import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  draggable?: boolean;
  expandable?: boolean;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "sm" | "md" | "lg";
  glowIntensity?: "sm" | "md" | "lg";
  borderRadius?: string;
};

const blurMap = { sm: "backdrop-blur-sm", md: "backdrop-blur-md", lg: "backdrop-blur-lg", xl: "backdrop-blur-xl" };
const shadowMap = { sm: "shadow", md: "shadow-md", lg: "shadow-lg" };

export function LiquidGlassCard({
  className,
  blurIntensity = "lg",
  shadowIntensity = "md",
  borderRadius = "24px",
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "relative border border-white/20",
        blurMap[blurIntensity],
        shadowMap[shadowIntensity],
        "bg-white/10",
        className
      )}
      style={{ borderRadius }}
      {...props}
    />
  );
}
