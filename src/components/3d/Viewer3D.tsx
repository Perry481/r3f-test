"use client";

import Scene from "./Scene";
import TestObjects from "./TestObjects";
import ModelViewer from "./ModelViewer";
import { useState } from "react";

interface Viewer3DProps {
  modelUrl?: string;
  showTestObjects?: boolean;
  className?: string;
}

export default function Viewer3D({
  modelUrl,
  showTestObjects = true,
  className = "",
}: Viewer3DProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModelLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleModelError = (err: Error) => {
    setIsLoading(false);
    setError(err.message);
  };

  return (
    <div className={`relative ${className}`}>
      <Scene>
        {/* Conditional rendering based on props */}
        {modelUrl ? (
          <ModelViewer url={modelUrl} />
        ) : showTestObjects ? (
          <TestObjects />
        ) : null}
      </Scene>

      {/* UI Controls Overlay */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h3 className="font-semibold text-gray-800 mb-2">3D Viewer Controls</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Left click + drag: Rotate</p>
          <p>• Right click + drag: Pan</p>
          <p>• Scroll: Zoom</p>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="absolute top-4 right-4 bg-black/70 text-white rounded-lg p-2 text-xs font-mono">
        <div>
          FPS: <span className="text-green-400">60</span>
        </div>
        <div>
          Objects:{" "}
          <span className="text-blue-400">
            {showTestObjects ? "4" : modelUrl ? "1" : "0"}
          </span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-lg">
          <p className="font-semibold">Error loading model:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading 3D model...</p>
          </div>
        </div>
      )}
    </div>
  );
}
