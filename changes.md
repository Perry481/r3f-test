# Refactor Report

## Viewer Stack (Scene, ModelViewer, Viewer3D)

- **Original behavior**: The canvas wrapper rendered children with hard-coded lighting and controls; there was no visibility into GLTF loading, and the overlay HUD inside `Viewer3D` was static copy with fake FPS/object counts. Models were instantiated in-place, shadow flags were not enforced, and there was no sizing metadata.
- **Refactor**: Added a `SceneProgressState` bridge that emits Drei `useProgress` events to callers, reworked `ModelViewer` to clone the loaded scene, center it, propagate shadow flags, and surface measured bounds. `Viewer3D` now drives its status panels, loading mask, and error banner off of real progress/error/model data and detaches navigation copy into reusable panels.
- **Impact**: The workspace can now react to real loading states and error conditions, improves model centering/shadow fidelity, and lays the groundwork for future controls to subscribe to the same progress feed without rewriting canvas plumbing.

## Brick Building Animation

- **Original behavior**: All animation logic (phase cycling, SVGs, extrusion, spinning cube) was embedded in one file with duplicated timing constants, inline geometries, and limited reuse. Phase transitions relied on nested conditionals which made it hard to tweak individual phases.
- **Refactor**: Split the animation into dedicated phase components (`PhaseLayer`, `OrthographicPhase`, `ExtrusionPhase`, `InteractivePhase`) with helper utilities for dotted lines and geometry cleanup. Centralized the phase cadence (`usePhaseCycle`) and configuration (`orthographicViewConfig`).
- **Impact**: Each phase is now easier to maintain, reduces repeated math for dashed segments, and makes targeted styling adjustments safer. Rollbacks (like restoring the minimal extrusion base) are simpler because concerns are separated.

## Landing Page & Layout

- **Original behavior**: `page.tsx` mixed header/footer markup, hero content, feature cards, and timeline markup directly, making it tedious to reuse shell components elsewhere. The workspace header lived inline on the route.
- **Refactor**: Extracted `SiteHeader`, `SiteFooter`, and `WorkspaceHeader` layout primitives plus a small `FeatureGlyph` timeline helper. Rewired the hero CTA to original styling and removed the redundant feature grid duplication that emerged during the refactor.
- **Impact**: Marketing pages now compose reusable layout pieces, reducing copy/paste across routes. Future sections can share header/footer styling and the workspace can evolve independently. The CTA styling regression was corrected to match the original micro-interactions.

## Viewer Wrapper

- **Original behavior**: The wrapper double-managed mount state before rendering the viewer.
- **Refactor**: Relied on Next.js dynamic import with fallback, dropping the redundant mount effect.
- **Impact**: Simplifies the wrapper and avoids hydration flicker while keeping a pleasant loading skeleton.

## Footer Keys

- **Original behavior**: Footer links used `href` as the React key which collided for hash links.
- **Refactor**: Switched to `href-label` composite keys.
- **Impact**: Removes duplicate-key warnings in React DevTools and prevents unpredictable footer rendering.
