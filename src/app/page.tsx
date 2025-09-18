import { Button } from "@/components/ui/button"
import { BrickBuildingAnimation } from "@/components/brick-building-animation"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-slate-600/5" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Content Column */}
            <div className="lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 animate-slide-stagger-1">
                {"Build Your Vision"}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-orange-600 mb-8 animate-slide-stagger-2">
                {"from 2D CAD to 3D"}
              </h2>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed animate-slide-stagger-3">
                {
                  "Transform your 2D construction drawings into detailed 3D CAD models. Watch your blueprints come to life, brick by brick."
                }
              </p>

              <div className="animate-slide-stagger-4">
                <Link href="/workspace">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {"Start Building in 3D"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Animation Column */}
            <div className="flex justify-center lg:justify-end">
              <BrickBuildingAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{"From Blueprint to Reality"}</h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {
                "See how your 2D construction drawings transform into detailed 3D models, helping you visualize projects before breaking ground."
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded"></div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{"Upload 2D CAD"}</h4>
              <p className="text-slate-600">{"Import your existing 2D construction drawings and blueprints"}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded transform rotate-12"></div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{"AI Processing"}</h4>
              <p className="text-slate-600">{"Our AI analyzes and converts your 2D plans into 3D structures"}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-orange-600 rounded shadow-lg transform translate-x-1 translate-y-1"></div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{"3D CAD Model"}</h4>
              <p className="text-slate-600">{"Get detailed 3D models ready for construction planning"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-4xl md:text-5xl font-bold text-white mb-6">{"Ready to Build in 3D?"}</h4>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {"Join construction professionals who are transforming their 2D CAD drawings into detailed 3D models."}
          </p>
          <Link href="/workspace">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {"Get Started Today"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4">{"© 2024 CAD Transform. Building the future, one model at a time."}</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 hover:underline"
            >
              {"About"}
            </a>
            <a
              href="#"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 hover:underline"
            >
              {"Features"}
            </a>
            <a
              href="#"
              className="text-orange-400 hover:text-orange-300 transition-colors duration-300 hover:underline"
            >
              {"Contact"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
