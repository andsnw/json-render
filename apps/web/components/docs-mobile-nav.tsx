"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

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
      { title: "Registry", href: "/docs/registry" },
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
      { title: "Code Export", href: "/docs/code-export" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "@json-render/core", href: "/docs/api/core" },
      { title: "@json-render/react", href: "/docs/api/react" },
      { title: "@json-render/codegen", href: "/docs/api/codegen" },
    ],
  },
];

// Flatten all pages for current page lookup
const allPages = navigation.flatMap((section) => section.items);

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const currentPage = useMemo(() => {
    const page = allPages.find((page) => page.href === pathname);
    return page ?? allPages[0];
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden sticky top-[calc(3.5rem+1px)] z-40 w-full px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between focus:outline-none">
        <div className="text-sm font-medium">{currentPage?.title}</div>
        <div className="w-8 h-8 flex items-center justify-center">
          <List className="h-4 w-4 text-muted-foreground" />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto p-6">
        <SheetTitle className="mb-6">Table of Contents</SheetTitle>
        <nav className="space-y-6">
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
                      onClick={() => setOpen(false)}
                      className={`text-sm block py-2 transition-colors ${
                        pathname === item.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
