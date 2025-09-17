"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface AnimatedCubeProps {
  position: [number, number, number];
  color?: string;
}

function AnimatedCube({ position, color = "#ff6b6b" }: AnimatedCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface AnimatedSphereProps {
  position: [number, number, number];
  color?: string;
}

function AnimatedSphere({ position, color = "#4ecdc4" }: AnimatedSphereProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface StaticTorusProps {
  position: [number, number, number];
  color?: string;
}

function StaticTorus({ position, color = "#ffa726" }: StaticTorusProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function TestObjects() {
  return (
    <group>
      {/* Test objects arranged in a pattern */}
      <AnimatedCube position={[-3, 1, 0]} color="#ff6b6b" />
      <AnimatedSphere position={[0, 1, 0]} color="#4ecdc4" />
      <StaticTorus position={[3, 1, 0]} color="#ffa726" />

      {/* Ground plane */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f8f9fa" />
      </mesh>
    </group>
  );
}
