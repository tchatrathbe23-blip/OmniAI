import React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef(({ className, rows = 4, ...props }, ref) => {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full rounded-xl glass-input px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500",
        "transition-all duration-200 outline-none resize-none",
        "focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
