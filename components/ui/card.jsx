import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, children, glow = false, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        glow ? "glass-panel-glow" : "glass-panel",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-5 border-b border-white/5", className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={cn("text-lg font-semibold text-white tracking-wide", className)} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p className={cn("text-xs text-slate-400 mt-1", className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-5 pt-0 flex items-center", className)} {...props}>
      {children}
    </div>
  );
};
