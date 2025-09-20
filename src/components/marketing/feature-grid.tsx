import type { ReactNode } from "react";

interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeatureGridProps {
  items: FeatureItem[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100">
            {item.icon}
          </div>
          <h4 className="mb-3 text-xl font-bold text-slate-800">{item.title}</h4>
          <p className="text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
