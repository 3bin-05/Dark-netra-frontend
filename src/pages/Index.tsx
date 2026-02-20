import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ScanCard from "@/components/ScanCard";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg scan-grid">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        {/* Hero */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
              animate={{ boxShadow: ["0 0 20px hsl(185 100% 50% / 0.2)", "0 0 40px hsl(185 100% 50% / 0.4)", "0 0 20px hsl(185 100% 50% / 0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-2">
            Dark{" "}
            <span className="text-primary glow-text">Netra</span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6" />

          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            AI-Powered Phishing & Scam Detection System.{" "}
            <span className="text-foreground/80">Scan any URL</span> for threats in seconds.
          </p>
        </motion.div>

        {/* Scanner */}
        <ScanCard />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          Dark Netra &copy; {new Date().getFullYear()} — Cybersecurity Intelligence Platform
        </p>
      </footer>
    </div>
  );
};

export default Index;
