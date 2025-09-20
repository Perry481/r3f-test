interface FooterLinkItem {
  href: string;
  label: string;
}

interface SiteFooterProps {
  links: FooterLinkItem[];
  copyright: string;
}

export function SiteFooter({ links, copyright }: SiteFooterProps) {
  return (
    <footer className="bg-slate-800 py-12 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 text-lg">{copyright}</p>
        <div className="flex justify-center space-x-6">
          {links.map((link) => (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="text-orange-400 transition-colors duration-300 hover:text-orange-300 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
