import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-terminal text-accent neon-text text-lg mb-3">DEV_RUSH_2.0</h3>
          <p className="text-muted-foreground text-sm">
            A 24-hour offline hackathon by Numerano Club, Department of Mathematics, DSCE.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://instagram.com/official_hackdevrush" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-terminal text-sm text-foreground mb-3">$ ls /pages</h4>
          <div className="space-y-2">
            {["/home", "/timeline", "/tracks", "/prizes", "/sponsors", "/venue"].map((path) => (
              <Link key={path} to={path} className="block font-terminal text-xs text-muted-foreground hover:text-accent transition-colors">
                {">"} {path}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-terminal text-sm text-foreground mb-3">$ cat contact.txt</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="mailto:hack.devrush@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail size={14} /> hack.devrush@gmail.com
            </a>
            <a href="tel:+918247361513" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} /> +91 82473 61513
            </a>
            <a href="tel:+918217796609" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone size={14} /> +91 82177 96609
            </a>
          </div>
        </div>

        {/* Event Info */}
        <div>
          <h4 className="font-terminal text-sm text-foreground mb-3">$ echo $EVENT_INFO</h4>
          <div className="space-y-1 font-terminal text-xs text-muted-foreground">
            <p>DATE: March 13-14, 2026</p>
            <p>VENUE: DSCE, Bangalore</p>
            <p>TEAMS: 50+ (2-4 members)</p>
            <p>PRIZE_POOL: ₹1,50,000+</p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-terminal text-xs text-muted-foreground">
          © 2026 DevRush | Numerano Club, DSCE
        </p>
        <p className="font-terminal text-xs text-muted-foreground">
          Made with <span className="text-destructive">❤</span> by Numerano Tech Team
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
