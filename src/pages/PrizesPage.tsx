import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalWindow from "@/components/TerminalWindow";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const topPrizes = [
  { place: "2nd", amount: "₹35,000", icon: Medal, extras: "Trophy + Certificates", color: "text-muted-foreground", border: "border-muted-foreground/30", glow: "" },
  { place: "1st", amount: "₹60,000", icon: Trophy, extras: "Trophy + Certificates + Premium Goodies", color: "text-neon-yellow", border: "border-neon-yellow/30", glow: "shadow-[0_0_30px_hsl(45,100%,50%,0.15)]" },
  { place: "3rd", amount: "₹20,000", icon: Award, extras: "Trophy + Certificates", color: "text-orange-400", border: "border-orange-400/30", glow: "" },
];

const trackPrizes = [
  "Generative AI",
  "Blockchain & Cyber Security",
  "Workflow Automation",
  "Open Innovation",
];

const PrizesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-2">$ ./show_prizes.sh --total</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Prizes & Rewards
          </h1>
        </motion.div>

        {/* Total prize */}
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <TerminalWindow title="prize_pool.sh" className="mb-12 max-w-lg">
            <p className="text-muted-foreground">{">"} Calculating prize pool...</p>
            <p className="text-accent neon-text text-2xl font-bold mt-1">{">"} TOTAL REWARDS: ₹1,50,000+</p>
            <p className="text-neon-green text-xs mt-1">{">"} Status: READY_TO_CLAIM</p>
          </TerminalWindow>
        </motion.div>

        {/* Podium - 2nd, 1st, 3rd */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 items-end">
          {topPrizes.map((prize, i) => (
            <motion.div
              key={prize.place}
              {...fadeInUp}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={i === 1 ? "order-first sm:order-none" : ""}
            >
              <div className={`glass-card p-6 text-center ${prize.border} border ${prize.glow} ${i === 1 ? "sm:py-10" : ""}`}>
                <prize.icon className={`mx-auto mb-3 ${prize.color}`} size={i === 1 ? 48 : 36} />
                <p className="font-terminal text-xs text-muted-foreground mb-1">{prize.place} PLACE</p>
                <p className={`font-heading text-3xl font-bold ${prize.color} mb-2`}>{prize.amount}</p>
                <p className="font-terminal text-xs text-muted-foreground">{prize.extras}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Track winners */}
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-6">$ ./track_winners.sh</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {trackPrizes.map((track, i) => (
            <motion.div key={track} {...fadeInUp} transition={{ delay: 0.1 * i }}>
              <TerminalWindow title={`track_${i + 1}.prize`}>
                <p className="text-foreground font-semibold">{track}</p>
                <p className="text-accent text-lg font-bold mt-1">₹10,000</p>
                <p className="text-muted-foreground text-xs mt-1">+ Certificates + Goodies</p>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        {/* Special */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TerminalWindow title="best_fresher.prize">
              <div className="flex items-center gap-3">
                <Star className="text-neon-green" size={24} />
                <div>
                  <p className="text-foreground font-semibold">Best Fresher Team</p>
                  <p className="text-accent font-bold">₹5,000 + Goodies</p>
                </div>
              </div>
            </TerminalWindow>
            <TerminalWindow title="special.prize">
              <div className="flex items-center gap-3">
                <Award className="text-neon-purple" size={24} />
                <div>
                  <p className="text-foreground font-semibold">Special Mentions</p>
                  <p className="text-muted-foreground text-sm">Certificates + Swag</p>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </motion.div>

        <motion.p {...fadeInUp} className="font-terminal text-xs text-muted-foreground text-center mt-12">
          {">"} More prizes to be announced...
        </motion.p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrizesPage;
