"use client";

import dynamic from "next/dynamic";

// Loading component shown while 3D viewer loads
function Viewer3DLoading() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Loading 3D Viewer
        </h3>
        <p className="text-sm text-gray-500">Initializing WebGL context...</p>
      </div>
    </div>
  );
}

// Dynamically import the 3D viewer with no SSR
const Viewer3D = dynamic(() => import("./Viewer3D"), {
  ssr: false,
  loading: () => <Viewer3DLoading />,
});

interface Viewer3DWrapperProps {
  modelUrl?: string;
  showTestObjects?: boolean;
  className?: string;
}

export default function Viewer3DWrapper({
  modelUrl,
  showTestObjects = true,
  className = "",
}: Viewer3DWrapperProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Viewer3D
        modelUrl={modelUrl}
        showTestObjects={showTestObjects}
        className="w-full h-full"
      />
    </div>
  );
}
