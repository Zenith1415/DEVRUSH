import { motion } from "framer-motion";
import { MapPin, Wifi, Clock, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalWindow from "@/components/TerminalWindow";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const highlights = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Clock, label: "24/7 Mentorship" },
  { icon: Users, label: "State-of-the-art Labs" },
  { icon: MapPin, label: "Central Bangalore" },
];

const VenuePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-2">$ echo $VENUE_INFO</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Venue
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...fadeInUp}>
            <TerminalWindow title="location.txt">
              <p className="text-foreground font-semibold mb-2">Dayananda Sagar College of Engineering</p>
              <p className="text-muted-foreground text-sm mb-4">
                Shavige Malleshwara Hills, Kumaraswamy Layout,<br />
                Bangalore, Karnataka 560078
              </p>
              <a
                href="https://maps.google.com/?q=Dayananda+Sagar+College+of+Engineering+Bangalore"
                target="_blank"
                rel="noreferrer"
                className="font-terminal text-sm text-accent hover:underline"
              >
                {">"} Open in Google Maps →
              </a>
            </TerminalWindow>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map((h) => (
                <div key={h.label} className="glass-card p-4 flex items-center gap-3">
                  <h.icon className="text-accent" size={20} />
                  <span className="text-sm text-foreground">{h.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <div className="rounded-lg overflow-hidden border border-border h-80 lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7095767862536!2d77.5646!3d12.9116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae156310100001%3A0x71be53da4480fbbe!2sDayananda%20Sagar%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
                allowFullScreen
                loading="lazy"
                title="DSCE Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default VenuePage;
