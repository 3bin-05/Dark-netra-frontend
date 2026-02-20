import { motion } from "framer-motion";

interface RiskMeterProps {
  score: number;
  verdict: string;
}

const RiskMeter = ({ score, verdict }: RiskMeterProps) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = () => {
    if (score <= 30) return "hsl(var(--success))";
    if (score <= 60) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getGlow = () => {
    if (score <= 30) return "drop-shadow(0 0 12px hsl(var(--success) / 0.6))";
    if (score <= 60) return "drop-shadow(0 0 12px hsl(var(--warning) / 0.6))";
    return "drop-shadow(0 0 12px hsl(var(--destructive) / 0.6))";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90" style={{ filter: getGlow() }}>
          <circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <motion.circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold font-mono text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Risk</span>
        </div>
      </div>
      <VerdictBadge verdict={verdict} />
    </div>
  );
};

const VerdictBadge = ({ verdict }: { verdict: string }) => {
  const lower = verdict.toLowerCase();
  let classes = "px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider ";

  if (lower === "safe") {
    classes += "bg-success/15 text-success border border-success/30";
  } else if (lower === "suspicious") {
    classes += "bg-warning/15 text-warning border border-warning/30";
  } else {
    classes += "bg-destructive/15 text-destructive border border-destructive/30";
  }

  return (
    <motion.span
      className={classes}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      {verdict}
    </motion.span>
  );
};

export default RiskMeter;
