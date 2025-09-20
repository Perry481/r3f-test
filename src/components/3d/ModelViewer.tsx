"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Group, Box3, Vector3, Mesh } from "three";

interface ModelViewerProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  autoCenter?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  onLoaded?: (meta: ModelLoadMeta) => void;
}

export interface ModelLoadMeta {
  size: [number, number, number];
  center: [number, number, number];
}

export default function ModelViewer({
  url,
  position = [0, 0, 0],
  scale = 1,
  autoCenter = true,
  castShadow = true,
  receiveShadow = true,
  onLoaded,
}: ModelViewerProps) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<Group>(null);

  const preparedScene = useMemo(() => {
    if (!scene) {
      return null;
    }

    const clone = scene.clone(true);
    const boundingBox = new Box3().setFromObject(clone);
    const center = boundingBox.getCenter(new Vector3());
    const size = boundingBox.getSize(new Vector3());

    if (autoCenter) {
      clone.position.set(-center.x, -boundingBox.min.y, -center.z);
    }

    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });

    return { clone, center, size };
  }, [scene, autoCenter, castShadow, receiveShadow]);

  useEffect(() => {
    if (!preparedScene || !onLoaded) {
      return;
    }

    onLoaded({
      size: preparedScene.size.toArray() as [number, number, number],
      center: preparedScene.center.toArray() as [number, number, number],
    });
  }, [preparedScene, onLoaded]);

  if (!preparedScene) {
    return null;
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={preparedScene.clone} />
    </group>
  );
}

// Preload function for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
