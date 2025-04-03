"use client";

interface StepByStepProps {
  steps: string[];
}

export function StepByStep({ steps }: StepByStepProps) {
  return (
    <div className="my-6">
      <h3 className="mb-4 font-bold text-black">Instructions</h3>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
              {index + 1}
            </div>
            <div className="pt-1">{step}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
