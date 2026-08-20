import React from "react";
import { cn } from "@/lib/utils";

export const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    secondary: "bg-white/5 text-slate-300 border-white/10",
    gradient: "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border-purple-400/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
