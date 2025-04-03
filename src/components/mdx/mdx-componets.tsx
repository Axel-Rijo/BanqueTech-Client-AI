import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import {
  Recipe,
  IngredientList,
  ChefProfile,
  Gallery,
  Tip,
  Quote,
  NutritionalInfo,
  StepByStep,
} from "./components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Use custom components for HTML elements
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold text-black">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-bold text-black">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-bold text-black">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-4 text-gray-700">{children}</p>,
    ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-amber-500 hover:text-amber-600 hover:underline"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-amber-500 pl-4 italic">
        {children}
      </blockquote>
    ),
    img: ({ src, alt, ...props }) => (
      <div className="my-6">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="rounded-lg"
          {...props}
        />
      </div>
    ),

    // Add our custom MDX components
    Recipe,
    IngredientList,
    ChefProfile,
    Gallery,
    Tip,
    Quote,
    NutritionalInfo,
    StepByStep,

    ...components,
  };
}
