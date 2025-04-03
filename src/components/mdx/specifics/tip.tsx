"use client";

import type React from "react";
import { LightbulbIcon } from "lucide-react";

interface TipProps {
  children: React.ReactNode;
  type?: "tip" | "note" | "warning";
}

export function Tip({ children, type = "tip" }: TipProps) {
  const styles = {
    tip: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: <LightbulbIcon className="h-5 w-5 text-amber-500" />,
      title: "Chef's Tip",
    },
    note: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-blue-500"
        >
          <path d="M12 8h.01" />
          <path d="M12 12v4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      title: "Note",
    },
    warning: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-red-500"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
      title: "Warning",
    },
  };

  const style = styles[type];

  return (
    <div className={`my-6 rounded-lg border ${style.border} ${style.bg} p-4`}>
      <div className="mb-2 flex items-center gap-2">
        {style.icon}
        <span className="font-bold">{style.title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}
