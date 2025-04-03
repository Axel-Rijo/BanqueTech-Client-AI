"use client";

interface NutritionalInfoProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export function NutritionalInfo({
  calories,
  protein,
  carbs,
  fat,
  servingSize,
}: NutritionalInfoProps) {
  return (
    <div className="my-6 rounded-lg border border-gray-200 p-4">
      <h4 className="mb-3 font-bold text-black">Nutritional Information</h4>
      <p className="mb-2 text-sm text-gray-500">Per {servingSize} serving</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <span className="block text-lg font-bold text-amber-500">
            {calories}
          </span>
          <span className="text-xs">Calories</span>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <span className="block text-lg font-bold text-amber-500">
            {protein}g
          </span>
          <span className="text-xs">Protein</span>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <span className="block text-lg font-bold text-amber-500">
            {carbs}g
          </span>
          <span className="text-xs">Carbs</span>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <span className="block text-lg font-bold text-amber-500">{fat}g</span>
          <span className="text-xs">Fat</span>
        </div>
      </div>
    </div>
  );
}
