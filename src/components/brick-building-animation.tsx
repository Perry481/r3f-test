"use client";

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const PHASE_COUNT = 3;
const PHASE_INTERVAL_MS = 4000;

type PhaseIndex = 0 | 1 | 2;

type PhaseLayerProps = {
  index: PhaseIndex;
  activePhase: PhaseIndex;
  children: ReactNode;
};

type DottedLineSegment = {
  start: [number, number, number];
  end: [number, number, number];
};

type OrthoRect = {
  type: "rect";
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: string;
};

type OrthoLine = {
  type: "line";
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strokeWidth: number;
  dashArray: string;
  delay: string;
};

type OrthoShape = OrthoRect | OrthoLine;

type OrthographicView = {
  id: string;
  label: string;
  labelDelay: string;
  dimensions: [number, number];
  viewBox: string;
  colSpan?: number;
  shapes: OrthoShape[];
};

function usePhaseCycle(): PhaseIndex {
  const [phase, setPhase] = useState<PhaseIndex>(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((current) => (((current + 1) % PHASE_COUNT) as PhaseIndex));
    }, PHASE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  return phase;
}

function PhaseLayer({ index, activePhase, children }: PhaseLayerProps) {
  const isActive = activePhase === index;
  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ${
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
}

function PhaseHeading({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-6 z-10 mb-2 font-bold text-slate-700">
      {children}
    </div>
  );
}

function PhaseCaption({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-8 z-10 text-xs text-slate-500">
      {children}
    </div>
  );
}

function OrthographicPhase() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-50 p-6 text-center">
      <PhaseHeading>2D Orthographic Views</PhaseHeading>
      <div className="grid h-full w-full max-w-xs grid-cols-2 gap-6 pt-12">
        {orthographicViewConfig.map((view) => (
          <div
            key={view.id}
            className={`flex flex-col items-center${view.colSpan === 2 ? " col-span-2" : ""}`}
          >
            <div
              className="mb-2 text-xs text-slate-500 animate-fade-in"
              style={{ animationDelay: view.labelDelay }}
            >
              {view.label}
            </div>
            <svg
              width={view.dimensions[0]}
              height={view.dimensions[1]}
              viewBox={view.viewBox}
              className="border border-slate-300 bg-white"
            >
              {view.shapes.map((shape) => {
                if (shape.type === "rect") {
                  return (
                    <rect
                      key={shape.id}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      fill="none"
                      stroke="#334155"
                      strokeWidth={1.5}
                      className="animate-draw-lines"
                      style={{ animationDelay: shape.delay }}
                    />
                  );
                }

                if (shape.type === "line") {
                  return (
                    <line
                      key={shape.id}
                      x1={shape.x1}
                      y1={shape.y1}
                      x2={shape.x2}
                      y2={shape.y2}
                      stroke="#94A3B8"
                      strokeWidth={shape.strokeWidth}
                      strokeDasharray={shape.dashArray}
                      className="animate-draw-lines"
                      style={{ animationDelay: shape.delay }}
                    />
                  );
                }

                return null;
              })}
            </svg>
          </div>
        ))}
      </div>
      <PhaseCaption>Technical Drawings - All Views</PhaseCaption>
    </div>
  );
}

function ExtrusionPhase({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-50">
      <PhaseHeading>Extruding 3D Model</PhaseHeading>
      <div className="relative h-80 w-80">
        <Suspense fallback={<CanvasFallback message="Loading animation..." />}>
          <Canvas camera={{ position: [4, 3, 4], fov: 50 }} className="rounded-lg" shadows>
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

            <ExtrudingCube isActive={isActive} />
          </Canvas>
        </Suspense>
      </div>
      <PhaseCaption>Square - Extrusion - Cube</PhaseCaption>
    </div>
  );
}

function InteractivePhase({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-slate-300 bg-slate-50">
      <PhaseHeading>Interactive 3D Model</PhaseHeading>
      <div className="relative h-80 w-80">
        <Suspense fallback={<CanvasFallback message="Loading 3D model..." />}>
          <Canvas camera={{ position: [4, 3, 4], fov: 50 }} className="rounded-lg">
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

            <SpinningCube isActive={isActive} />
            <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={2} />
          </Canvas>
        </Suspense>
      </div>
      <PhaseCaption>Drag to rotate - Scroll to zoom - Right click to pan</PhaseCaption>
    </div>
  );
}

function CanvasFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-sm text-slate-500">{message}</div>
    </div>
  );
}

function VerticalDottedEdges({
  height,
  dashLength = 0.15,
  gapLength = 0.08,
}: {
  height: number;
  dashLength?: number;
  gapLength?: number;
}) {
  return (
    <>
      {verticalEdgePositions.map(([x, z], index) => {
        const segments: THREE.Vector3[] = [];
        for (let y = -0.5; y < height - 0.5; y += dashLength + gapLength) {
          const startY = y;
          const endY = Math.min(y + dashLength, height - 0.5);
          segments.push(new THREE.Vector3(x, startY, z));
          segments.push(new THREE.Vector3(x, endY, z));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(segments);
        return (
          <lineSegments key={index} geometry={geometry}>
            <lineBasicMaterial color="#334155" linewidth={2} />
          </lineSegments>
        );
      })}
    </>
  );
}

function HorizontalDottedEdges({
  segments,
  dashLength = 0.15,
  gapLength = 0.08,
  suffix,
}: {
  segments: DottedLineSegment[];
  dashLength?: number;
  gapLength?: number;
  suffix: string;
}) {
  return (
    <>
      {segments.map(({ start, end }, index) => {
        const dashSegments: THREE.Vector3[] = [];
        const startVector = new THREE.Vector3(...start);
        const endVector = new THREE.Vector3(...end);
        const totalDistance = startVector.distanceTo(endVector);

        for (let t = 0; t < 1; t += (dashLength + gapLength) / totalDistance) {
          const dashEnd = Math.min(t + dashLength / totalDistance, 1);
          const segmentStart = startVector.clone().lerp(endVector, t);
          const segmentEnd = startVector.clone().lerp(endVector, dashEnd);
          dashSegments.push(segmentStart, segmentEnd);
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(dashSegments);

        return (
          <lineSegments key={`${suffix}-${index}`} geometry={geometry}>
            <lineBasicMaterial color="#334155" linewidth={2} />
          </lineSegments>
        );
      })}
    </>
  );
}

function ExtrudingCube({ isActive }: { isActive: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const duration = 3500;
    const startTime = Date.now();
    let frameId: number;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(eased);

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [isActive]);

  const height = useMemo(() => 0.1 + progress * 1.9, [progress]);
  const showTopEdges = height > 0.5;

  return (
    <group>
      {progress > 0.1 && (
        <>
          <VerticalDottedEdges height={height} />
          <HorizontalDottedEdges segments={bottomEdgeSegments} suffix="bottom" />
          {showTopEdges && (
            <HorizontalDottedEdges segments={createTopEdgeSegments(height)} suffix="top" />
          )}
        </>
      )}
    </group>
  );
}

function SpinningCube({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [spinSpeed, setSpinSpeed] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setSpinSpeed(0);
      return;
    }

    setSpinSpeed(8);
    const startTime = Date.now();
    const duration = 2500;
    let frameId: number;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedSpeed = 8 - rawProgress * 7.5;
      setSpinSpeed(Math.max(easedSpeed, 0.5));

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frameId);
  }, [isActive]);

  useFrame(() => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y += spinSpeed * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2, 32, 32, 32]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0}
          roughness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      <PremiumEdgeDetail />
      <SkyGlassInterior />
    </group>
  );
}

function PremiumEdgeDetail() {
  return (
    <group>
      {verticalEdgePositions.map(([x, z], index) => (
        <mesh key={`vertical-${index}`} position={[x, 0.5, z]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.1} roughness={0.3} />
        </mesh>
      ))}

      {cornerPositions.map(([x, y, z], index) => (
        <mesh key={`corner-${index}`} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.1} roughness={0.3} />
        </mesh>
      ))}

      {horizontalEdgeConfig.map(({ position, rotation }, index) => (
        <mesh key={`edge-${index}`} position={position} rotation={rotation} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function SkyGlassInterior() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial
        color="#87ceeb"
        transparent
        opacity={0.4}
        emissive="#7dd3fc"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function createTopEdgeSegments(height: number): DottedLineSegment[] {
  return bottomEdgeSegments.map(({ start, end }) => ({
    start: [start[0], height - 0.5, start[2]] as [number, number, number],
    end: [end[0], height - 0.5, end[2]] as [number, number, number],
  }));
}

const verticalEdgePositions: Array<[number, number]> = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const cornerPositions: Array<[number, number, number]> = [
  [-1, -0.5, -1],
  [1, -0.5, -1],
  [1, -0.5, 1],
  [-1, -0.5, 1],
  [-1, 1.5, -1],
  [1, 1.5, -1],
  [1, 1.5, 1],
  [-1, 1.5, 1],
];

const horizontalEdgeConfig = [
  { position: [0, 1.5, -1] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number] },
  { position: [0, 1.5, 1] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number] },
  { position: [-1, 1.5, 0] as [number, number, number], rotation: [0, Math.PI / 2, Math.PI / 2] as [number, number, number] },
  { position: [1, 1.5, 0] as [number, number, number], rotation: [0, Math.PI / 2, Math.PI / 2] as [number, number, number] },
  { position: [0, -0.5, -1] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number] },
  { position: [0, -0.5, 1] as [number, number, number], rotation: [0, 0, Math.PI / 2] as [number, number, number] },
  { position: [-1, -0.5, 0] as [number, number, number], rotation: [0, Math.PI / 2, Math.PI / 2] as [number, number, number] },
  { position: [1, -0.5, 0] as [number, number, number], rotation: [0, Math.PI / 2, Math.PI / 2] as [number, number, number] },
];

const bottomEdgeSegments: DottedLineSegment[] = [
  { start: [-1, -0.5, -1], end: [1, -0.5, -1] },
  { start: [1, -0.5, -1], end: [1, -0.5, 1] },
  { start: [1, -0.5, 1], end: [-1, -0.5, 1] },
  { start: [-1, -0.5, 1], end: [-1, -0.5, -1] },
];

const orthographicViewConfig: OrthographicView[] = [
  {
    id: "top",
    label: "TOP",
    labelDelay: "0.2s",
    dimensions: [80, 60] as [number, number],
    viewBox: "0 0 80 60",
    shapes: [
      { id: "top-outer", type: "rect", x: 15, y: 15, width: 50, height: 15, delay: "0.4s" },
      { id: "top-inner", type: "rect", x: 15, y: 30, width: 15, height: 15, delay: "0.6s" },
      {
        id: "top-center-vertical",
        type: "line",
        x1: 40,
        y1: 10,
        x2: 40,
        y2: 50,
        strokeWidth: 0.5,
        dashArray: "2,1",
        delay: "0.8s",
      },
      {
        id: "top-center-horizontal",
        type: "line",
        x1: 10,
        y1: 22.5,
        x2: 70,
        y2: 22.5,
        strokeWidth: 0.5,
        dashArray: "2,1",
        delay: "1.0s",
      },
    ],
  },
  {
    id: "front",
    label: "FRONT",
    labelDelay: "1.2s",
    dimensions: [80, 60] as [number, number],
    viewBox: "0 0 80 60",
    shapes: [
      { id: "front-outer", type: "rect", x: 15, y: 15, width: 50, height: 30, delay: "1.4s" },
      { id: "front-inner", type: "rect", x: 15, y: 30, width: 15, height: 15, delay: "1.6s" },
      {
        id: "front-hidden",
        type: "line",
        x1: 30,
        y1: 30,
        x2: 65,
        y2: 30,
        strokeWidth: 0.8,
        dashArray: "3,2",
        delay: "1.8s",
      },
    ],
  },
  {
    id: "side",
    label: "SIDE",
    labelDelay: "2.0s",
    dimensions: [60, 60] as [number, number],
    viewBox: "0 0 60 60",
    colSpan: 2,
    shapes: [
      { id: "side-outer", type: "rect", x: 15, y: 15, width: 15, height: 30, delay: "2.2s" },
      { id: "side-extension", type: "rect", x: 15, y: 30, width: 30, height: 15, delay: "2.4s" },
    ],
  },
] as const;

export function BrickBuildingAnimation() {
  const animationPhase = usePhaseCycle();

  return (
    <div className="flex h-96 w-96 items-center justify-center">
      <div className="relative h-full w-full">
        <PhaseLayer index={0} activePhase={animationPhase}>
          <OrthographicPhase />
        </PhaseLayer>
        <PhaseLayer index={1} activePhase={animationPhase}>
          <ExtrusionPhase isActive={animationPhase === 1} />
        </PhaseLayer>
        <PhaseLayer index={2} activePhase={animationPhase}>
          <InteractivePhase isActive={animationPhase === 2} />
        </PhaseLayer>
      </div>
    </div>
  );
}
