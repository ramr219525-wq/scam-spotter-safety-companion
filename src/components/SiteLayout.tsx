import { Link } from "@tanstack/react-router";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/detect", label: "Scam Detection" },
  { to: "/about", label: "About & Safety Tips" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <ShieldCheck className="h-7 w-7 text-accent" /> ScamShield <span className="text-accent">AI</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="nav-link" activeProps={{ className: "nav-link-active" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-3 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="nav-link" activeProps={{ className: "nav-link-active" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        ScamShield AI · © {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
}
