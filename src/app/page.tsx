import Link from "next/link";
import { BrickBuildingAnimation } from "@/components/brick-building-animation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#cta", label: "Contact" },
];

const processItems = [
  {
    title: "Upload 2D CAD",
    description: "Import your existing 2D construction drawings and blueprints.",
    iconVariant: "square" as const,
  },
  {
    title: "AI Processing",
    description: "Our AI analyzes and converts your 2D plans into 3D structures.",
    iconVariant: "tilt" as const,
  },
  {
    title: "3D CAD Model",
    description: "Receive detailed 3D models that keep projects moving forward.",
    iconVariant: "stack" as const,
  },
];

const footerLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Terms" },
];

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <SiteHeader navLinks={navLinks} ctaHref="/workspace" ctaLabel="Launch Workspace" />

      <main>
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>

      <SiteFooter
        links={footerLinks}
        copyright="© 2024 CAD Transform. Building the future, one model at a time."
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center pt-28 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-slate-600/5" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="lg:text-left">
            <h1 className="animate-slide-stagger-1 mb-6 text-5xl font-bold text-slate-800 md:text-7xl">
              <span className="blueprint-text relative">2D</span>
              <span className="mx-4 text-slate-600">in</span>
              <span className="solid-3d-text-bevel">3D</span>
              <span className="ml-4 text-slate-600">out</span>
            </h1>
            <h2 className="animate-slide-stagger-2 mb-8 text-3xl font-bold text-orange-600 md:text-5xl">
              from 2D CAD to 3D
            </h2>
            <p className="animate-slide-stagger-3 mb-12 text-lg leading-relaxed text-slate-600 md:text-xl">
              Transform your 2D construction drawings into detailed 3D CAD models. Watch your blueprints come to life,
              brick by brick.
            </p>
            <div className="animate-slide-stagger-4">
              <Link href="/workspace">
                <Button
                  className="px-8 py-6 text-lg bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  size="lg"
                  variant="default"
                >
                  Start Building in 3D
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <BrickBuildingAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h3 className="mb-6 text-4xl font-bold text-slate-800 md:text-5xl">From Blueprint to Reality</h3>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            See how your 2D construction drawings transform into detailed 3D models, helping you visualize projects
            before breaking ground.
          </p>
        </div>

        <div id="process" className="mx-auto mt-16 max-w-5xl">
          <ProcessTimeline items={processItems} />
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section id="cta" className="bg-gradient-to-r from-orange-600 to-slate-700 py-20">
      <div className="container mx-auto px-4 text-center">
        <h4 className="mb-6 text-4xl font-bold text-white md:text-5xl">Ready to Build in 3D?</h4>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
          Join construction professionals who are transforming their 2D CAD drawings into detailed 3D models.
        </p>
        <Link href="/workspace">
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-6 text-lg text-orange-600 hover:bg-gray-100"
          >
            Get Started Today
          </Button>
        </Link>
      </div>
    </section>
  );
}

interface ProcessItem {
  title: string;
  description: string;
  iconVariant: GlyphVariant;
}

function ProcessTimeline({ items }: { items: ProcessItem[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="p-6 text-center">
          <FeatureGlyph variant={item.iconVariant} />
          <h4 className="mb-3 text-xl font-bold text-slate-800">{item.title}</h4>
          <p className="text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

type GlyphVariant = "square" | "tilt" | "stack";

function FeatureGlyph({ variant }: { variant: GlyphVariant }) {
  const innerClass = {
    square: "h-8 w-8 rounded bg-orange-600",
    tilt: "h-8 w-8 rounded bg-orange-600 rotate-12",
    stack: "h-6 w-6 rounded bg-orange-600 shadow-lg translate-x-1 translate-y-1",
  }[variant];

  return (
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-100">
      <div className={innerClass} />
    </div>
  );
}
