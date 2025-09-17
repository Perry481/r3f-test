"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Group, Box3, Vector3 } from "three";

interface ModelViewerProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  autoCenter?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export default function ModelViewer({
  url,
  position = [0, 0, 0],
  scale = 1,
  autoCenter = true,
  castShadow = true,
  receiveShadow = true,
}: ModelViewerProps) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    if (scene && groupRef.current && autoCenter) {
      // Calculate bounding box and center the model
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());

      // Center the model
      scene.position.set(-center.x, -box.min.y, -center.z);

      // Enable shadows on all meshes
      scene.traverse((child) => {
        if (child.type === "Mesh") {
          child.castShadow = castShadow;
          child.receiveShadow = receiveShadow;
        }
      });

      console.log("Model loaded:", {
        size: size.toArray(),
        center: center.toArray(),
      });
    }
  }, [scene, autoCenter, castShadow, receiveShadow]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload function for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
