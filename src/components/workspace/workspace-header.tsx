import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WorkspaceHeaderProps {
  badgeLabel?: string;
  phaseLabel?: string;
}

export function WorkspaceHeader({ badgeLabel = "POC v1.0", phaseLabel }: WorkspaceHeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Home
            </Button>
          </Link>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">3D CAD Workspace</h1>
            {badgeLabel && (
              <span className="ml-3 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {badgeLabel}
              </span>
            )}
          </div>
        </div>
        {phaseLabel && <span className="text-sm text-gray-600">{phaseLabel}</span>}
      </div>
    </header>
  );
}
