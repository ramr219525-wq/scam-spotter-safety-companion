import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Safety Tips — ScamShield AI" },
      { name: "description", content: "How ScamShield AI works and five simple tips to stay safe online." },
      { property: "og:title", content: "About & Safety Tips — ScamShield AI" },
      { property: "og:description", content: "How ScamShield AI works and five simple tips to stay safe online." },
    ],
  }),
  component: About,
});

const steps = [
  ["Paste", "Copy the suspicious message or link into the checker."],
  ["Scan", "Rules look for scam keywords and risky link patterns."],
  ["Score", "Each warning sign adds to a risk score."],
  ["Result", "You get Safe, Suspicious or High Risk with advice."],
];
const tips = [
  "Never share your OTP, PIN, CVV or passwords with anyone.",
  "Check website addresses carefully and look for HTTPS.",
  "Don't trust messages that create panic or urgency.",
  "Verify requests through the company's official app or number.",
  "Use strong, unique passwords and turn on two-factor authentication.",
];

function About() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 py-14">
        <h1 className="font-display text-4xl font-bold">About ScamShield AI</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          ScamShield AI is a student-friendly project that helps people recognise online scams. This demo uses
          simple rule-based checks; a real AI model could be added in the future.
        </p>
        <h2 className="mt-12 font-display text-2xl font-bold">How it works</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div key={t} className="card-panel">
              <span className="step-num">{i + 1}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-12 font-display text-2xl font-bold">5 online safety tips</h2>
        <ol className="mt-6 space-y-3">
          {tips.map((t, i) => (
            <li key={t} className="card-panel flex items-start gap-4 py-4">
              <span className="step-num shrink-0">{i + 1}</span><span className="pt-1">{t}</span>
            </li>
          ))}
        </ol>
        <Button asChild size="lg" className="mt-10">
          <Link to="/detect">Try the Scam Checker</Link>
        </Button>
      </section>
    </SiteLayout>
  );
}
