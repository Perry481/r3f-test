import Viewer3DWrapper from "@/components/3d/Viewer3DWrapper";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";

export default function WorkspacePage() {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <WorkspaceHeader phaseLabel="Phase 1: Foundation" />
      <main className="flex-1">
        <div className="h-full">
          <Viewer3DWrapper showTestObjects className="h-full w-full" />
        </div>
      </main>
    </div>
  );
}
