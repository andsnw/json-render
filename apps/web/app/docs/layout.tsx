import Link from "next/link";
import { DocsMobileNav } from "@/components/docs-mobile-nav";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Catalog", href: "/docs/catalog" },
      { title: "Components", href: "/docs/components" },
      { title: "Data Binding", href: "/docs/data-binding" },
      { title: "Actions", href: "/docs/actions" },
      { title: "Visibility", href: "/docs/visibility" },
      { title: "Validation", href: "/docs/validation" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "AI SDK Integration", href: "/docs/ai-sdk" },
      { title: "Streaming", href: "/docs/streaming" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "@json-render/core", href: "/docs/api/core" },
      { title: "@json-render/react", href: "/docs/api/react" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsMobileNav />
      <div className="max-w-5xl mx-auto px-6 py-8 lg:py-12 flex gap-16">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 hidden lg:block">
          <nav className="sticky top-20 space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 max-w-2xl">{children}</div>
      </div>
    </>
  );
}
