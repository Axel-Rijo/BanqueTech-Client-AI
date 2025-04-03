"use client";

interface IngredientListProps {
  ingredients: string[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-4">
      <h3 className="mb-3 font-bold text-black">Ingredients</h3>
      <ul className="space-y-1">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500"></span>
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
