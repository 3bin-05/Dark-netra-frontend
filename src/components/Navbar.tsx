import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shield className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Dark <span className="text-primary">Netra</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground font-mono">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          <span>System Online</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
