"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid, useProgress } from "@react-three/drei";
import { Suspense, useEffect, type ReactNode } from "react";

export interface SceneProgressState {
  active: boolean;
  progress: number;
  errors: string[];
  item?: string;
}

interface SceneProps {
  children?: ReactNode;
  className?: string;
  environmentPreset?: React.ComponentProps<typeof Environment>["preset"];
  onProgressChange?: (state: SceneProgressState) => void;
  cameraPosition?: [number, number, number];
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
        <p>Loading 3D Scene...</p>
      </div>
    </div>
  );
}

function ProgressTracker({
  onChange,
}: {
  onChange?: (state: SceneProgressState) => void;
}) {
  const { active, progress, errors, item } = useProgress();

  useEffect(() => {
    onChange?.({ active, progress, errors, item });
  }, [active, progress, errors, item, onChange]);

  return null;
}

export default function Scene({
  children,
  className = "",
  environmentPreset = "city",
  onProgressChange,
  cameraPosition = [5, 5, 5],
}: SceneProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          shadows
          className="h-full w-full bg-gradient-to-b from-blue-50 to-white"
        >
          <ProgressTracker onChange={onProgressChange} />

          {/* Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Environment and Controls */}
          <Environment preset={environmentPreset} />
          <OrbitControls
            enablePan
            enableZoom
            enableRotate
            minDistance={1}
            maxDistance={50}
            maxPolarAngle={Math.PI * 0.75}
          />

          {/* Ground Grid */}
          <Grid
            position={[0, -0.01, 0]}
            args={[10, 10]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6B7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#374151"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          {/* Scene Content */}
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
