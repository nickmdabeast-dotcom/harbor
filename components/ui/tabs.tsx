"use client";
import * as React from "react";
import { cn } from "@/lib/cn";

type TabsContext = {
  value: string;
  setValue: (v: string) => void;
};
const Ctx = React.createContext<TabsContext | null>(null);

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = React.useState(defaultValue);
  return <div className={cn(className)}><Ctx.Provider value={{ value, setValue }}>{children}</Ctx.Provider></div>;
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex bg-charcoal/10 rounded-md p-1", className)} {...props} />;
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode; }) {
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active ? "bg-white text-charcoal shadow" : "text-charcoal/70 hover:text-charcoal", className)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return <div className={cn(className)}>{children}</div>;
}
