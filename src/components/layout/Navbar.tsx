import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/home", label: "/home" },
  { path: "/timeline", label: "/timeline" },
  { path: "/tracks", label: "/tracks" },
  { path: "/prizes", label: "/prizes" },
  { path: "/sponsors", label: "/sponsors" },
  { path: "/venue", label: "/venue" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="font-terminal text-sm sm:text-base font-bold text-accent neon-text">
            DEV_RUSH_2.0<span className="animate-blink">▊</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-terminal text-xs px-3 py-1.5 rounded transition-colors ${
                  location.pathname === link.path
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {location.pathname === link.path && "> "}
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              className="font-terminal text-xs px-4 py-1.5 ml-2 border border-primary/50 text-primary rounded hover:bg-primary/10 transition-colors neon-glow"
            >
              $ REGISTER
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block font-terminal text-sm px-3 py-2 rounded transition-colors ${
                  location.pathname === link.path
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground"
                }`}
              >
                {location.pathname === link.path ? "> " : "  "}
                {link.label}
              </Link>
            ))}
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block font-terminal text-sm px-3 py-2 text-primary"
            >
              $ REGISTER
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
