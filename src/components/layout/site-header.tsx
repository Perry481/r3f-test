import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLinkItem {
  href: string;
  label: string;
}

interface SiteHeaderProps {
  navLinks: NavLinkItem[];
  ctaHref: string;
  ctaLabel: string;
}

export function SiteHeader({ navLinks, ctaHref, ctaLabel }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-200/50 bg-white/75 shadow-sm backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-slate-800 transition-colors duration-200 hover:text-slate-900"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white font-bold shadow-sm">
              CT
            </span>
            <span>CAD Transform</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center px-1 py-2 transition-colors duration-200 hover:text-slate-900"
              >
                <span>{link.label}</span>
                <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] scale-x-0 transform bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href={ctaHref}>
              <Button className="bg-orange-600 hover:bg-orange-700">{ctaLabel}</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Link href={ctaHref} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
