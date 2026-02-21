import { motion } from "framer-motion";
import { Brain, Globe, ShieldCheck, AlertTriangle } from "lucide-react";
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
      sub: `${(result.ml_probability * 100).toFixed(1)}% confidence`,
      danger: result.ml_prediction === 1,
    },
    {
      icon: Globe,
      label: "VirusTotal",
      value: `${result.vt_score}% risk`,
      danger: result.vt_score > 50,
    },
    {
      icon: ShieldCheck,
      label: "Google Safe Browsing",
      value: result.google_safe ? "Safe" : "Unsafe",
      danger: !result.google_safe,
    },
  ];

  return (
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
        <RiskMeter score={result.final_score} verdict={result.risk_level} />
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
              className={`w-5 h-5 shrink-0 ${item.danger ? "text-destructive" : "text-success"}`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <p
                className={`text-sm font-semibold ${item.danger ? "text-destructive" : "text-foreground"}`}
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
  );
};

export default ResultCard;
