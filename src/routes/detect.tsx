import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { analyze, type Result } from "@/lib/detect";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Check for Online Scams — ScamShield AI" },
      { name: "description", content: "Paste a suspicious message or URL and get a Safe, Suspicious or High Risk result." },
      { property: "og:title", content: "Check for Online Scams — ScamShield AI" },
      { property: "og:description", content: "Paste a suspicious message or URL and get an instant risk result." },
    ],
  }),
  component: Detect,
});

const style = {
  Safe: { cls: "result-safe", Icon: ShieldCheck, text: "No common scam signs were found." },
  Suspicious: { cls: "result-warn", Icon: AlertTriangle, text: "Some warning signs were found. Be careful." },
  "High Risk": { cls: "result-danger", Icon: ShieldAlert, text: "Strong scam signs were found. Do not engage." },
};

function Detect() {
  const [msg, setMsg] = useState("");
  const [url, setUrl] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState("");

  const run = (e: FormEvent) => {
    e.preventDefault();
    if (!msg.trim() && !url.trim()) { setErr("Please paste a message or enter a URL."); setRes(null); return; }
    setErr(""); setRes(analyze(msg, url));
  };
  const s = res ? style[res.level] : null;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-5 py-14">
        <h1 className="font-display text-4xl font-bold">Check for Online Scams</h1>
        <p className="mt-2 text-muted-foreground">Demo rule-based checker — results are guidance, not a guarantee.</p>
        <form onSubmit={run} className="card-panel mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold">Suspicious message (SMS, email, chat)</span>
            <textarea className="field mt-2 min-h-36" value={msg} onChange={(e) => setMsg(e.target.value)}
              placeholder="e.g. URGENT: Your bank account is blocked. Share your OTP to verify..." />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Suspicious website URL</span>
            <input className="field mt-2" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. http://secure-login-bank.xyz" />
          </label>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">Analyze Now</Button>
            <Button type="button" variant="outline" size="lg" onClick={() => { setMsg(""); setUrl(""); setRes(null); setErr(""); }}>Clear</Button>
          </div>
        </form>
        {res && s && (
          <div className={`mt-8 rounded-xl border-2 p-6 ${s.cls}`} role="status">
            <div className="flex items-center gap-3">
              <s.Icon className="h-9 w-9" />
              <div>
                <p className="font-display text-2xl font-bold">{res.level}</p>
                <p className="text-sm opacity-90">{s.text}</p>
              </div>
            </div>
            <h3 className="mt-5 font-semibold">Why</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{res.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
            <h3 className="mt-4 font-semibold">Safety advice</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{res.advice.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
