"use client";

import type React from "react";

interface QuoteProps {
  author?: string;
  role?: string;
  children: React.ReactNode;
}

export function Quote({ author, role, children }: QuoteProps) {
  return (
    <blockquote className="my-8 rounded-lg border-l-4 border-amber-500 bg-gray-50 p-6">
      <div className="mb-4 text-lg italic">{children}</div>
      {author && (
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-amber-500"></span>
          <cite className="not-italic">
            <span className="font-medium text-black">{author}</span>
            {role && <span className="text-gray-500">, {role}</span>}
          </cite>
        </div>
      )}
    </blockquote>
  );
}
