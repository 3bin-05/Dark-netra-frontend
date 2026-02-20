import { useState } from "react";
import { Search, Loader2, ShieldAlert } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import ResultCard from "./ResultCard";

export interface ScanResult {
  ml_prediction: number;
  ml_probability: number;
  virustotal: string;
  google_safe: string;
  risk_score: number;
  verdict: string;
}

const ScanCard = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post("https://dark-netra-backend.onrender.com/api/check-url", { url });
      setResult(response.data);
    } catch {
      setError("Failed to connect to the scanning server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) handleScan();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <motion.div
        className="glass-card glow-border p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
            URL Scanner
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter URL to scan..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 font-mono text-sm"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleScan}
            disabled={loading || !url.trim()}
            className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider glow-btn transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning
              </>
            ) : (
              "Scan"
            )}
          </button>
        </div>

        {error && (
          <motion.p
            className="mt-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {loading && (
        <motion.div
          className="flex flex-col items-center gap-3 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground font-mono animate-pulse-glow">
            Analyzing threat vectors...
          </p>
        </motion.div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
};

export default ScanCard;
