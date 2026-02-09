import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalWindow from "@/components/TerminalWindow";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const tiers = [
  { name: "Platinum", amount: "₹80,000", size: "text-3xl", cols: "col-span-full" },
  { name: "Gold", amount: "₹50,000", size: "text-2xl", cols: "col-span-full sm:col-span-1" },
  { name: "Silver", amount: "₹40,000", size: "text-xl", cols: "col-span-full sm:col-span-1" },
  { name: "Bronze", amount: "₹20,000", size: "text-lg", cols: "col-span-full sm:col-span-1" },
];

const SponsorsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-2">$ cat sponsors.yml</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Sponsors
          </h1>
          <p className="text-muted-foreground mb-12">
            DevRush 2.0 is made possible by the generous support of our sponsors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} {...fadeInUp} transition={{ delay: i * 0.1 }} className={tier.cols}>
              <TerminalWindow title={`${tier.name.toLowerCase()}_tier.cfg`}>
                <div className="text-center py-8">
                  <p className="font-terminal text-xs text-muted-foreground mb-2">{tier.name.toUpperCase()} TIER</p>
                  <p className={`font-heading font-bold text-foreground ${tier.size} mb-4`}>{tier.amount}</p>
                  <div className="w-32 h-32 mx-auto border border-dashed border-border rounded-lg flex items-center justify-center">
                    <span className="font-terminal text-xs text-muted-foreground">Your Logo Here</span>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeInUp} className="text-center">
          <TerminalWindow title="become_sponsor.sh" className="max-w-lg mx-auto">
            <p className="text-muted-foreground mb-4">{">"} Interested in sponsoring DevRush 2.0?</p>
            <a
              href="mailto:hack.devrush@gmail.com"
              className="inline-block font-terminal text-sm px-6 py-2 border border-primary/50 text-primary rounded neon-glow hover:bg-primary/10 transition-colors"
            >
              $ ./contact_us.sh
            </a>
          </TerminalWindow>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default SponsorsPage;
