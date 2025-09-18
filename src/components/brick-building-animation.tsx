"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Component for the extruding cube animation
function ExtrudingCube({ isActive }: { isActive: boolean }) {
  const [extrusionProgress, setExtrusionProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setExtrusionProgress(0);
      const startTime = Date.now();
      const duration = 3500; // 3.5 seconds for the extrusion

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        setExtrusionProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isActive]);

  // Calculate the height based on progress (from 0.1 to 2)
  const height = 0.1 + extrusionProgress * 1.9;

  return (
    <group>
      {/* Dotted line edges for extruding cube */}
      {extrusionProgress > 0.1 && (
        <>
          {/* Vertical edges with dotted lines */}
          {[
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
          ].map(([x, z], i) => {
            const segments = [];
            const dashLength = 0.15;
            const gapLength = 0.08;

            for (let y = -0.5; y < height - 0.5; y += dashLength + gapLength) {
              const start = new THREE.Vector3(x, y, z);
              const end = new THREE.Vector3(
                x,
                Math.min(y + dashLength, height - 0.5),
                z
              );
              segments.push(start, end);
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(segments);

            return (
              <lineSegments key={i} geometry={geometry}>
                <lineBasicMaterial color="#334155" linewidth={2} />
              </lineSegments>
            );
          })}

          {/* Bottom horizontal edges */}
          {[
            { start: [-1, -0.5, -1], end: [1, -0.5, -1] },
            { start: [1, -0.5, -1], end: [1, -0.5, 1] },
            { start: [1, -0.5, 1], end: [-1, -0.5, 1] },
            { start: [-1, -0.5, 1], end: [-1, -0.5, -1] },
          ].map(({ start, end }, i) => {
            const segments = [];
            const dashLength = 0.15;
            const gapLength = 0.08;
            const totalDistance = Math.sqrt(
              Math.pow(end[0] - start[0], 2) +
                Math.pow(end[1] - start[1], 2) +
                Math.pow(end[2] - start[2], 2)
            );

            for (
              let t = 0;
              t < 1;
              t += (dashLength + gapLength) / totalDistance
            ) {
              const dashEnd = Math.min(t + dashLength / totalDistance, 1);
              const segmentStart = new THREE.Vector3(
                start[0] + (end[0] - start[0]) * t,
                start[1] + (end[1] - start[1]) * t,
                start[2] + (end[2] - start[2]) * t
              );
              const segmentEnd = new THREE.Vector3(
                start[0] + (end[0] - start[0]) * dashEnd,
                start[1] + (end[1] - start[1]) * dashEnd,
                start[2] + (end[2] - start[2]) * dashEnd
              );
              segments.push(segmentStart, segmentEnd);
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(segments);

            return (
              <lineSegments key={`bottom-${i}`} geometry={geometry}>
                <lineBasicMaterial color="#334155" linewidth={2} />
              </lineSegments>
            );
          })}

          {/* Top horizontal edges (when tall enough) */}
          {height > 0.5 &&
            [
              { start: [-1, height - 0.5, -1], end: [1, height - 0.5, -1] },
              { start: [1, height - 0.5, -1], end: [1, height - 0.5, 1] },
              { start: [1, height - 0.5, 1], end: [-1, height - 0.5, 1] },
              { start: [-1, height - 0.5, 1], end: [-1, height - 0.5, -1] },
            ].map(({ start, end }, i) => {
              const segments = [];
              const dashLength = 0.15;
              const gapLength = 0.08;
              const totalDistance = Math.sqrt(
                Math.pow(end[0] - start[0], 2) +
                  Math.pow(end[1] - start[1], 2) +
                  Math.pow(end[2] - start[2], 2)
              );

              for (
                let t = 0;
                t < 1;
                t += (dashLength + gapLength) / totalDistance
              ) {
                const dashEnd = Math.min(t + dashLength / totalDistance, 1);
                const segmentStart = new THREE.Vector3(
                  start[0] + (end[0] - start[0]) * t,
                  start[1] + (end[1] - start[1]) * t,
                  start[2] + (end[2] - start[2]) * t
                );
                const segmentEnd = new THREE.Vector3(
                  start[0] + (end[0] - start[0]) * dashEnd,
                  start[1] + (end[1] - start[1]) * dashEnd,
                  start[2] + (end[2] - start[2]) * dashEnd
                );
                segments.push(segmentStart, segmentEnd);
              }

              const geometry = new THREE.BufferGeometry().setFromPoints(
                segments
              );

              return (
                <lineSegments key={`top-${i}`} geometry={geometry}>
                  <lineBasicMaterial color="#334155" linewidth={2} />
                </lineSegments>
              );
            })}
        </>
      )}
    </group>
  );
}

// Component for the spinning cube in Phase 3
function SpinningCube({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [spinSpeed, setSpinSpeed] = useState(0);

  useEffect(() => {
    if (isActive) {
      setSpinSpeed(8); // Start with fast spin immediately when phase 3 appears
      const startTime = Date.now();
      const duration = 2500; // 2.5 seconds to slow down

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out the spin speed from 8 to 0.5
        const currentSpeed = 8 - progress * 7.5;
        setSpinSpeed(Math.max(currentSpeed, 0.5));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    } else {
      setSpinSpeed(0); // Stop spinning when not active
    }
  }, [isActive]);

  useFrame(() => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y += spinSpeed * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cube frame - more transparent to show sky blue interior */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2, 32, 32, 32]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.0}
          roughness={0.3}
          transparent={true}
          opacity={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Premium edge definition with beveled corners */}
      <group>
        {/* Vertical edges - much thinner */}
        {[
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.5, z]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Corner dots - smaller and simpler */}
        {[
          [-1, -0.5, -1], [1, -0.5, -1], [1, -0.5, 1], [-1, -0.5, 1],
          [-1, 1.5, -1], [1, 1.5, -1], [1, 1.5, 1], [-1, 1.5, 1]
        ].map(([x, y, z], i) => (
          <mesh key={`corner-${i}`} position={[x, y, z]} castShadow>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Top horizontal edges - thinner */}
        {[
          { pos: [0, 1.5, -1], rot: [0, 0, Math.PI / 2] },
          { pos: [0, 1.5, 1], rot: [0, 0, Math.PI / 2] },
          { pos: [-1, 1.5, 0], rot: [0, Math.PI / 2, Math.PI / 2] },
          { pos: [1, 1.5, 0], rot: [0, Math.PI / 2, Math.PI / 2] },
        ].map(({ pos, rot }, i) => (
          <mesh
            key={`top-${i}`}
            position={pos as [number, number, number]}
            rotation={rot as [number, number, number]}
            castShadow
          >
            <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Bottom horizontal edges - thinner */}
        {[
          { pos: [0, -0.5, -1], rot: [0, 0, Math.PI / 2] },
          { pos: [0, -0.5, 1], rot: [0, 0, Math.PI / 2] },
          { pos: [-1, -0.5, 0], rot: [0, Math.PI / 2, Math.PI / 2] },
          { pos: [1, -0.5, 0], rot: [0, Math.PI / 2, Math.PI / 2] },
        ].map(({ pos, rot }, i) => (
          <mesh
            key={`bottom-${i}`}
            position={pos as [number, number, number]}
            rotation={rot as [number, number, number]}
            castShadow
          >
            <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Sky blue glass interior - brighter and more visible */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#87ceeb"
          transparent={true}
          opacity={0.4}
          emissive="#7dd3fc"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

export function BrickBuildingAnimation() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-96 h-96 pointer-events-none">
      <div className="relative w-full h-full">
        {/* Phase 1: 2D Orthographic Views */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 0
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full bg-slate-50 border-2 border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-slate-700 font-bold mb-6">
              2D Orthographic Views
            </div>

            {/* Three orthographic views layout */}
            <div className="grid grid-cols-2 gap-6 items-center">
              {/* Top View */}
              <div className="flex flex-col items-center">
                <div
                  className="text-xs text-slate-500 mb-2 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  TOP
                </div>
                <svg
                  width="80"
                  height="60"
                  viewBox="0 0 80 60"
                  className="border border-slate-300 bg-white"
                >
                  {/* L-bracket top view */}
                  <rect
                    x="15"
                    y="15"
                    width="50"
                    height="15"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <rect
                    x="15"
                    y="30"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "0.6s" }}
                  />
                  {/* Center lines */}
                  <line
                    x1="40"
                    y1="10"
                    x2="40"
                    y2="50"
                    stroke="#94A3B8"
                    strokeWidth="0.5"
                    strokeDasharray="2,1"
                    className="animate-draw-lines"
                    style={{ animationDelay: "0.8s" }}
                  />
                  <line
                    x1="10"
                    y1="22.5"
                    x2="70"
                    y2="22.5"
                    stroke="#94A3B8"
                    strokeWidth="0.5"
                    strokeDasharray="2,1"
                    className="animate-draw-lines"
                    style={{ animationDelay: "1.0s" }}
                  />
                </svg>
              </div>

              {/* Front View */}
              <div className="flex flex-col items-center">
                <div
                  className="text-xs text-slate-500 mb-2 animate-fade-in"
                  style={{ animationDelay: "1.2s" }}
                >
                  FRONT
                </div>
                <svg
                  width="80"
                  height="60"
                  viewBox="0 0 80 60"
                  className="border border-slate-300 bg-white"
                >
                  {/* L-bracket front view */}
                  <rect
                    x="15"
                    y="15"
                    width="50"
                    height="30"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "1.4s" }}
                  />
                  <rect
                    x="15"
                    y="30"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "1.6s" }}
                  />
                  {/* Hidden lines */}
                  <line
                    x1="30"
                    y1="30"
                    x2="65"
                    y2="30"
                    stroke="#94A3B8"
                    strokeWidth="0.8"
                    strokeDasharray="3,2"
                    className="animate-draw-lines"
                    style={{ animationDelay: "1.8s" }}
                  />
                </svg>
              </div>

              {/* Side View */}
              <div className="flex flex-col items-center col-span-2">
                <div
                  className="text-xs text-slate-500 mb-2 animate-fade-in"
                  style={{ animationDelay: "2.0s" }}
                >
                  SIDE
                </div>
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="border border-slate-300 bg-white"
                >
                  {/* L-bracket side view */}
                  <rect
                    x="15"
                    y="15"
                    width="15"
                    height="30"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "2.2s" }}
                  />
                  <rect
                    x="15"
                    y="30"
                    width="30"
                    height="15"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1.5"
                    className="animate-draw-lines"
                    style={{ animationDelay: "2.4s" }}
                  />
                </svg>
              </div>
            </div>

            <div
              className="mt-4 text-xs text-slate-500 animate-fade-in"
              style={{ animationDelay: "2.6s" }}
            >
              Technical Drawings • All Views
            </div>
          </div>
        </div>

        {/* Phase 2: Extruding Square to Cube */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 1
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-300 rounded-lg">
            <div className="text-slate-700 font-bold mb-2 absolute top-6 z-10">
              Extruding 3D Model
            </div>

            {/* R3F Canvas for extrusion animation */}
            <div className="w-80 h-80 relative">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-slate-500">Loading Animation...</div>
                  </div>
                }
              >
                <Canvas
                  camera={{ position: [4, 3, 4], fov: 50 }}
                  className="rounded-lg"
                  shadows
                >
                  {/* Lighting */}
                  <ambientLight intensity={0.6} />
                  <directionalLight
                    position={[10, 10, 5]}
                    intensity={0.8}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />
                  <directionalLight position={[-5, 5, -5]} intensity={0.3} />

                  {/* Extruding cube component */}
                  <ExtrudingCube isActive={animationPhase === 1} />

                  {/* Static camera view (no controls for this phase) */}
                </Canvas>
              </Suspense>
            </div>

            <div className="absolute bottom-8 text-xs text-slate-500 z-10">
              Square → Extrusion → Cube
            </div>
          </div>
        </div>

        {/* Phase 3: Interactive 3D Model with R3F */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 2
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-slate-300 rounded-lg">
            <div className="text-slate-700 font-bold mb-2 absolute top-6 z-10">
              Interactive 3D Model
            </div>

            {/* R3F Canvas */}
            <div className="w-80 h-80 relative">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-slate-500">Loading 3D Model...</div>
                  </div>
                }
              >
                <Canvas
                  camera={{ position: [4, 3, 4], fov: 50 }}
                  className="rounded-lg"
                >
                  {/* Enhanced lighting for premium look */}
                  <ambientLight intensity={0.4} />
                  <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                  />
                  <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#64748b" />
                  <pointLight position={[0, 3, 3]} intensity={0.5} color="#94a3b8" />
                  <hemisphereLight args={["#f1f5f9", "#334155", 0.3]} />

                  {/* Spinning cube component */}
                  <SpinningCube isActive={animationPhase === 2} />

                  {/* Interactive controls */}
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={2}
                  />
                </Canvas>
              </Suspense>
            </div>

            <div className="absolute bottom-8 text-xs text-slate-600 z-10">
              Drag to rotate • Scroll to zoom • Right-click to pan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
