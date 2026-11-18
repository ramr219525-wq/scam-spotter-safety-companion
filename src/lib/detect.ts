export type Level = "Safe" | "Suspicious" | "High Risk";
export interface Result { level: Level; score: number; reasons: string[]; advice: string[] }

const KEYWORDS: [RegExp, number, string][] = [
  [/\b(urgent|immediately|act now|within 24 hours|final notice)\b/i, 2, "Uses urgent or pressuring language"],
  [/\b(otp|one[- ]time password|pin|cvv|password)\b/i, 3, "Asks for OTP, PIN, CVV or password"],
  [/\b(won|winner|lottery|prize|jackpot|reward)\b/i, 3, "Promises prizes or lottery winnings"],
  [/\b(kyc|account (is )?(blocked|suspended)|verify your account)\b/i, 3, "Claims your account is blocked or needs verification"],
  [/\b(click (here|the link)|tap the link)\b/i, 1, "Pushes you to click a link"],
  [/\b(gift card|bitcoin|crypto|wire transfer|upi)\b/i, 2, "Requests unusual payment methods"],
  [/\b(free|100% guaranteed|double your money|work from home)\b/i, 1, "Offers that sound too good to be true"],
  [/\b(refund|tax|customs|parcel|delivery failed)\b/i, 1, "Mentions refunds, parcels or tax issues"],
];

export function analyze(message: string, url: string): Result {
  let score = 0;
  const reasons: string[] = [];
  for (const [re, w, why] of KEYWORDS) if (re.test(message)) { score += w; reasons.push(why); }
  const links = [url.trim(), ...(message.match(/https?:\/\/\S+|www\.\S+/gi) ?? [])].filter(Boolean);
  for (const l of links) {
    const u = l.toLowerCase();
    if (/^http:\/\//.test(u)) { score += 1; reasons.push("Link is not secure (no HTTPS)"); }
    if (/\d{1,3}(\.\d{1,3}){3}/.test(u)) { score += 3; reasons.push("Link uses a raw IP address"); }
    if (/(bit\.ly|tinyurl|t\.co|goo\.gl|is\.gd)/.test(u)) { score += 2; reasons.push("Link uses a URL shortener that hides the destination"); }
    if (/\.(xyz|top|tk|ml|ga|cf|gq|click|zip)(\/|$)/.test(u)) { score += 2; reasons.push("Link uses a domain ending often linked to scams"); }
    if (/(login|verify|secure|update|account|bank|wallet)/.test(u)) { score += 1; reasons.push("Link contains sensitive words like login or verify"); }
    if (/@/.test(u.replace(/^mailto:/, "")) || (u.match(/-/g) ?? []).length >= 3) { score += 1; reasons.push("Link has an unusual structure"); }
  }
  const uniq = [...new Set(reasons)];
  const level: Level = score >= 5 ? "High Risk" : score >= 2 ? "Suspicious" : "Safe";
  const advice =
    level === "High Risk"
      ? ["Do not click any links or reply.", "Never share OTP, PIN or passwords.", "Block the sender and report it to your cybercrime helpline."]
      : level === "Suspicious"
        ? ["Verify the sender through an official channel.", "Avoid opening links until you are sure.", "Don't share personal details."]
        : ["No common scam signs found, but stay alert.", "Still verify unexpected requests for money or data."];
  return { level, score, reasons: uniq.length ? uniq : ["No common scam patterns were detected."], advice };
}
