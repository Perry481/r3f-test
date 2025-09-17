"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Grid } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
  children?: React.ReactNode;
  className?: string;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
        <p>Loading 3D Scene...</p>
      </div>
    </div>
  );
}

export default function Scene({ children, className = "" }: SceneProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{
            position: [5, 5, 5],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          shadows
          style={{ width: "100%", height: "100%" }}
          className="bg-gradient-to-b from-blue-50 to-white"
        >
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
          <Environment preset="city" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
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
            infiniteGrid={true}
          />

          {/* Scene Content */}
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
