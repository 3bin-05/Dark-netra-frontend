import { motion } from "framer-motion";
import { Brain, Globe, ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import RiskMeter from "./RiskMeter";
import type { ScanResult } from "./ScanCard";

interface ResultCardProps {
  result: ScanResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const details = [
    {
      icon: Brain,
      label: "ML Prediction",
      value: result.ml_prediction === 1 ? "Malicious" : "Benign",
      sub: `${(result.ml_probability * 100).toFixed(2)}% confidence`, // ✅ FIXED
      danger: result.ml_prediction === 1,
    },
    {
      icon: Globe,
      label: "VirusTotal",
      value: result.virustotal,
      danger:
        result.virustotal?.toLowerCase().includes("malicious") ||
        result.virustotal?.toLowerCase().includes("detected"),
    },
    {
      icon: ShieldCheck,
      label: "Google Safe Browsing",
      value: result.google_safe,
      danger:
        result.google_safe?.toLowerCase().includes("unsafe") ||
        result.google_safe?.toLowerCase().includes("detected"),
    },
  ];

  const verdictLower = result.verdict.toLowerCase();
  const isPhishing = verdictLower === "phishing" || verdictLower === "malicious";
  const isSuspicious = verdictLower === "suspicious";

  const glowClass = isPhishing
    ? "shadow-[0_0_20px_hsl(var(--destructive)/0.15)] border-destructive/30"
    : isSuspicious
    ? "shadow-[0_0_20px_hsl(var(--warning)/0.15)] border-warning/30"
    : "shadow-[0_0_20px_hsl(var(--success)/0.15)] border-success/30";

  const summaryText = isPhishing
    ? "This URL shows signs of phishing or malicious activity based on detected patterns."
    : isSuspicious
    ? "This URL exhibits suspicious characteristics and should be treated with caution."
    : "This URL is considered safe based on multiple security checks.";

  const getReasonIcon = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("safe") || lower.includes("clean") || lower.includes("valid") || lower.includes("benign")) {
      return <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />;
    }
    if (lower.includes("malicious") || lower.includes("phishing") || lower.includes("threat") || lower.includes("danger")) {
      return <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />;
    }
    return <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />;
  };

  const reasons = result.reasons && result.reasons.length > 0 ? result.reasons : [];

  return (
    <div className="space-y-6 w-full">
      {/* SCAN RESULTS CARD */}
      <motion.div
        className="glass-card glow-border p-6 sm:p-8 space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Scan Results
          </h3>
        </div>

        <div className="flex justify-center">
          <RiskMeter
            score={Number(result.risk_score.toFixed(2))} // ✅ FIXED
            verdict={result.verdict}
          />
        </div>

        <div className="grid gap-3">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-4 bg-muted/30 rounded-xl px-5 py-4 border border-border/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${
                  item.danger ? "text-destructive" : "text-success"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    item.danger ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-xs text-muted-foreground font-mono">
                    {item.sub}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* THREAT ANALYSIS CARD */}
      <motion.div
        className={`glass-card p-6 sm:p-8 space-y-6 ${glowClass}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-5 h-5 ${isPhishing ? 'text-destructive' : isSuspicious ? 'text-warning' : 'text-success'}`} />
          <h3 className={`text-sm font-semibold uppercase tracking-widest ${isPhishing ? 'text-destructive' : isSuspicious ? 'text-warning' : 'text-success'}`}>
            Threat Analysis
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground border-b border-border/50 pb-4">
            {summaryText}
          </p>
          
          <div className="space-y-3 pt-2">
            {reasons.length > 0 ? (
              reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  {getReasonIcon(reason)}
                  <p className="text-sm text-foreground/90 leading-relaxed font-mono">
                    {reason}
                  </p>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90 leading-relaxed font-mono">
                  No significant threats detected.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultCard;