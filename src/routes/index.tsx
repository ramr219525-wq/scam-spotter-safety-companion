import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, MessageSquareWarning, Link2, GraduationCap } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScamShield AI — Online Scam Detection" },
      { name: "description", content: "Check suspicious messages and links for common online scam signs." },
      { property: "og:title", content: "ScamShield AI — Online Scam Detection" },
      { property: "og:description", content: "Check suspicious messages and links for common online scam signs." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <section className="hero-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="pill">Online scam detection</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              Your Digital Safety, <span className="text-accent">Our Priority.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Fake prize messages, phishing emails and fraudulent links are everywhere. ScamShield AI helps you
              spot the warning signs before you click, reply or pay.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/detect">Get Started</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="shield-orb"><ShieldCheck className="h-32 w-32 text-accent" strokeWidth={1.3} /></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl font-bold">Purpose of the project</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          This project shows how simple automated checks can help everyday users recognise scams. The current
          version uses demo rule-based detection, not a trained AI model.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { i: MessageSquareWarning, t: "Check messages", d: "Scan SMS, emails and chats for scam language." },
            { i: Link2, t: "Inspect links", d: "Flag risky URLs, shorteners and unusual domains." },
            { i: GraduationCap, t: "Learn to stay safe", d: "Get clear advice and practical safety tips." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="card-panel">
              <I className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
