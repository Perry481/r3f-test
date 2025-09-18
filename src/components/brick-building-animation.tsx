"use client"

import { useEffect, useState } from "react"

export function BrickBuildingAnimation() {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center w-96 h-96 pointer-events-none">
      <div className="relative w-full h-full">
        {/* 2D Blueprint Phase */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full bg-blue-50 border-2 border-blue-300 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="text-blue-600 font-bold mb-4">2D CAD Drawing</div>
            {/* Blueprint lines */}
            <div className="space-y-2 w-full">
              <div className="h-1 bg-blue-400 w-3/4 mx-auto animate-pulse"></div>
              <div className="h-1 bg-blue-400 w-full animate-pulse delay-100"></div>
              <div className="h-1 bg-blue-400 w-2/3 mx-auto animate-pulse delay-200"></div>
              <div className="h-1 bg-blue-400 w-5/6 mx-auto animate-pulse delay-300"></div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1 w-32">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-3 border border-blue-300 animate-pulse"
                  style={{ animationDelay: `${i * 50}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation Phase */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-orange-600 font-bold mb-4 absolute top-8">AI Processing...</div>
            <div className="relative">
              {/* Spinning gears effect */}
              <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin animate-reverse"></div>

              {/* Floating blueprint pieces */}
              <div className="absolute -top-8 -left-8 w-4 h-4 bg-blue-400 animate-bounce"></div>
              <div className="absolute -top-4 left-8 w-3 h-3 bg-blue-400 animate-bounce delay-200"></div>
              <div className="absolute top-8 -right-4 w-2 h-2 bg-blue-400 animate-bounce delay-400"></div>
            </div>
          </div>
        </div>

        {/* 3D Building Phase */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            animationPhase === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-orange-600 font-bold mb-4 absolute top-8">3D CAD Model</div>

            {/* 3D Building Structure */}
            <div className="relative perspective-1000">
              <div className="transform-gpu preserve-3d animate-float">
                {/* Building layers - animated brick by brick */}
                <div className="relative">
                  {/* Foundation */}
                  <div className="grid grid-cols-6 gap-1 mb-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-4 bg-gradient-to-b from-orange-400 to-orange-600 border border-orange-700 shadow-md animate-build-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    ))}
                  </div>

                  {/* Second layer */}
                  <div className="grid grid-cols-6 gap-1 mb-1 ml-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-4 bg-gradient-to-b from-orange-500 to-orange-700 border border-orange-800 shadow-md animate-build-up"
                        style={{ animationDelay: `${(i + 6) * 100}ms` }}
                      ></div>
                    ))}
                  </div>

                  {/* Third layer */}
                  <div className="grid grid-cols-6 gap-1 mb-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-4 bg-gradient-to-b from-orange-400 to-orange-600 border border-orange-700 shadow-md animate-build-up"
                        style={{ animationDelay: `${(i + 11) * 100}ms` }}
                      ></div>
                    ))}
                  </div>

                  {/* Top layer */}
                  <div className="grid grid-cols-4 gap-1 ml-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-4 bg-gradient-to-b from-orange-500 to-orange-700 border border-orange-800 shadow-md animate-build-up"
                        style={{ animationDelay: `${(i + 17) * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
