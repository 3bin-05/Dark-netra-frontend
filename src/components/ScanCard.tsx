import { useState } from "react";
import { Search, Loader2, ShieldAlert } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import ResultCard from "./ResultCard";

const API_URL = import.meta.env.VITE_API_URL;

export interface ScanResult {
  risk_score: number;
  verdict: string;
  ml_prediction: number;
  ml_probability: number;
  virustotal: string;
  google_safe: string;
  reasons?: string[];
}

const ScanCard = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/predict`, { url });

      const data = response.data;

      console.log("Backend response:", data);

      // 🔥 TRANSFORM BACKEND → FRONTEND FORMAT
      const formatted: ScanResult = {
        risk_score: Number(data.score?.toFixed(2) || 0),
        verdict: data.prediction || "Unknown",
        ml_prediction: data.prediction !== "Safe" ? 1 : 0,
        ml_probability: Number(data.confidence?.toFixed(4) || 0),
        virustotal:
          data.details?.virustotal_score > 0 ? "Malicious" : "Clean",
        google_safe:
          data.details?.google_flag === 1 ? "Unsafe" : "Safe",
        reasons: data.reasons || [],
      };

      setResult(formatted);

    } catch (err) {
      console.error("Scan error:", err);
      setError("⚠️ Failed to connect to backend. Check server or API URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleScan();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* 🔍 INPUT CARD */}
      <motion.div
        className="glass-card glow-border p-6 sm:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-muted/50 border border-border text-sm font-mono"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleScan}
            disabled={loading || !url.trim()}
            className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40"
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

        {/* ❌ ERROR */}
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

      {/* ⏳ LOADING */}
      {loading && (
        <div className="flex flex-col items-center gap-3 py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-mono">
            Analyzing threat vectors...
          </p>
        </div>
      )}

      {/* ✅ RESULT */}
      {result && <ResultCard result={result} />}
    </div>
  );
};

export default ScanCard;