import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "default", disabled, children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:brightness-110 border border-purple-400/30",
      secondary:
        "glass-card text-slate-200 hover:text-white hover:bg-white/10 border border-white/10",
      glow:
        "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] border border-purple-400/40",
      ghost:
        "text-slate-400 hover:text-white hover:bg-white/5",
      outline:
        "border border-white/15 text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/30",
    };

    const sizes = {
      default: "px-5 py-2.5 text-sm",
      sm: "px-3 py-1.5 text-xs rounded-lg",
      lg: "px-6 py-3.5 text-base rounded-2xl",
      icon: "p-2.5 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
