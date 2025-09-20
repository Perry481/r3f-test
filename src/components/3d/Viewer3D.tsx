"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Scene, { type SceneProgressState } from "./Scene";
import TestObjects from "./TestObjects";
import ModelViewer, { type ModelLoadMeta } from "./ModelViewer";

interface Viewer3DProps {
  modelUrl?: string;
  showTestObjects?: boolean;
  className?: string;
}

type ViewerStatus = "idle" | "loading" | "ready" | "error";

function ViewerPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`pointer-events-auto rounded-lg bg-white/90 p-3 shadow-lg backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function LoadingOverlay({ progress }: { progress?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
      <div className="rounded-lg bg-white px-6 py-5 text-center shadow-lg">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-b-2 border-orange-500"></div>
        <p className="text-sm font-medium text-slate-700">Loading 3D model...</p>
        {typeof progress === "number" && (
          <p className="mt-1 text-xs text-slate-500">{Math.round(progress)}% complete</p>
        )}
      </div>
    </div>
  );
}

function ErrorOverlay({ message }: { message: string }) {
  return (
    <div className="absolute inset-x-4 bottom-4 rounded-lg bg-red-500/95 px-4 py-3 text-white shadow-lg">
      <p className="text-sm font-semibold">Unable to load model</p>
      <p className="text-xs opacity-80">{message}</p>
    </div>
  );
}

export default function Viewer3D({
  modelUrl,
  showTestObjects = true,
  className = "",
}: Viewer3DProps) {
  const [status, setStatus] = useState<ViewerStatus>(showTestObjects ? "ready" : "idle");
  const [progressState, setProgressState] = useState<SceneProgressState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelMeta, setModelMeta] = useState<ModelLoadMeta | null>(null);

  useEffect(() => {
    setModelMeta(null);
    setError(null);

    if (modelUrl) {
      setStatus("loading");
      return;
    }

    if (showTestObjects) {
      setStatus("ready");
    } else {
      setStatus("idle");
    }
  }, [modelUrl, showTestObjects]);

  const handleProgressChange = useCallback(
    (state: SceneProgressState) => {
      setProgressState(state);

      if (state.errors.length) {
        setError(String(state.errors[0] ?? "Unknown error"));
        setStatus("error");
        return;
      }

      if (!modelUrl) {
        return;
      }

      if (state.active) {
        setStatus("loading");
      } else if (modelMeta) {
        setStatus("ready");
      }
    },
    [modelUrl, modelMeta]
  );

  const handleModelLoaded = useCallback(
    (meta: ModelLoadMeta) => {
      setModelMeta(meta);
      setError(null);

      if (!progressState?.active) {
        setStatus("ready");
      }
    },
    [progressState]
  );

  const objectDescriptor = useMemo(() => {
    if (modelUrl) {
      return modelMeta ? "Imported model" : "Loading model";
    }

    if (showTestObjects) {
      return "Demo primitives";
    }

    return "No content";
  }, [modelMeta, modelUrl, showTestObjects]);

  const dimensionLabel = useMemo(() => {
    if (!modelMeta) {
      return "--";
    }

    const [x, y, z] = modelMeta.size;
    return `${x.toFixed(2)} x ${y.toFixed(2)} x ${z.toFixed(2)}`;
  }, [modelMeta]);

  const shouldShowLoading = status === "loading";
  const shouldShowError = status === "error" && error;
  const progressValue = progressState?.progress;

  return (
    <div className={`relative ${className}`}>
      <Scene onProgressChange={handleProgressChange}>
        {modelUrl ? (
          <ModelViewer url={modelUrl} onLoaded={handleModelLoaded} />
        ) : showTestObjects ? (
          <TestObjects />
        ) : null}
      </Scene>

      <div className="pointer-events-none">
        <div className="absolute left-4 top-4 max-w-xs">
          <ViewerPanel>
            <h3 className="mb-2 text-sm font-semibold text-slate-800">Navigation</h3>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>Left click + drag - Rotate</li>
              <li>Right click + drag - Pan</li>
              <li>Scroll - Zoom</li>
            </ul>
          </ViewerPanel>
        </div>

        <div className="absolute right-4 top-4 max-w-xs">
          <ViewerPanel className="bg-slate-900/90 text-white">
            <p className="text-xs uppercase tracking-wide text-slate-300">Status</p>
            <p className="text-sm font-semibold text-orange-200">{status}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-100">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Content</p>
                <p>{objectDescriptor}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Progress</p>
                <p>
                  {typeof progressValue === "number"
                    ? `${Math.round(progressValue)}%`
                    : "--"}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">FPS</p>
                <p>{status === "ready" ? "60" : "--"}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Size</p>
                <p>{dimensionLabel}</p>
              </div>
            </div>
          </ViewerPanel>
        </div>
      </div>

      {shouldShowLoading && <LoadingOverlay progress={progressValue} />}
      {shouldShowError && error && <ErrorOverlay message={error} />}
    </div>
  );
}
