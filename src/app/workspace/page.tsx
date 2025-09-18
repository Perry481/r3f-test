import Viewer3DWrapper from "@/components/3d/Viewer3DWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkspacePage() {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← Back to Home
                </Button>
              </Link>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">3D CAD Workspace</h1>
                <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  POC v1.0
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Phase 1: Foundation</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main 3D Viewer */}
      <main className="flex-1">
        <div className="h-[calc(100vh-4rem)]">
          <Viewer3DWrapper showTestObjects={true} className="w-full h-full" />
        </div>
      </main>
    </div>
  );
}