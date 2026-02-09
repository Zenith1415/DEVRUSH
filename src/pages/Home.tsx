import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, Brain, Shield, Cog, Lightbulb, Users, Trophy, Clock, Zap } from "lucide-react";
import TypewriterText from "@/components/effects/TypewriterText";
import FloatingShapes from "@/components/effects/FloatingShapes";
import MatrixRain from "@/components/effects/MatrixRain";
import CountdownTimer from "@/components/CountdownTimer";
import TerminalWindow from "@/components/TerminalWindow";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tracks = [
  { icon: Brain, title: "Generative AI", cmd: "$ python train_model.py", desc: "Build cutting-edge AI solutions using LLMs, diffusion models, and neural architectures.", gradient: "from-neon-blue to-neon-cyan" },
  { icon: Shield, title: "Blockchain & Cyber Security", cmd: "$ solidity compile contract.sol", desc: "Smart contracts, DeFi protocols, and next-gen security solutions.", gradient: "from-neon-cyan to-neon-purple" },
  { icon: Cog, title: "Workflow Automation", cmd: "$ npm run automate", desc: "RPA, integrations, and productivity tools that transform workflows.", gradient: "from-neon-blue to-neon-green" },
  { icon: Lightbulb, title: "Open Innovation", cmd: "$ git push origin innovation", desc: "Any domain, any technology. Surprise us with your creativity.", gradient: "from-neon-purple to-neon-cyan" },
];

const stats = [
  { icon: Users, value: "200+", label: "PARTICIPANTS" },
  { icon: Trophy, value: "₹1.5L+", label: "PRIZE POOL" },
  { icon: Clock, value: "24", label: "HOURS" },
  { icon: Zap, value: "4", label: "TRACKS" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const Home = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <MatrixRain />
      <FloatingShapes />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 grid-bg">
        <motion.div
          className="text-center relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TypewriterText
            text="DEVRUSH 2.0"
            as="h1"
            className="font-heading text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight gradient-text leading-none cursor-default"
            speed={150}
          />
          <motion.p
            className="font-terminal text-sm sm:text-base text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            24-HOUR HACKATHON | MARCH 13-14, 2026
          </motion.p>
          <motion.p
            className="font-terminal text-sm text-accent/80 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {">"} WHERE_INNOVATION_MEETS_CODE<span className="animate-blink">▊</span>
          </motion.p>

          {/* Countdown */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CountdownTimer />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Link
              to="/signup"
              className="font-terminal text-sm px-8 py-3 bg-primary/10 border border-primary/50 text-primary rounded-md neon-glow hover:bg-primary/20 transition-all"
            >
              $ ./register_now.sh
            </Link>
            <Link
              to="/tracks"
              className="font-terminal text-sm px-8 py-3 border border-border text-foreground rounded-md hover:border-accent/50 hover:text-accent transition-all"
            >
              $ ./view_tracks.sh
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 font-terminal text-xs text-muted-foreground flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>SCROLL_DOWN</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* About */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp}>
            <p className="font-terminal text-sm text-accent mb-6">$ cat about.txt</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeInUp}>
              <TerminalWindow title="about_devrush.md">
                <p className="text-muted-foreground leading-relaxed">
                  DevRush 2.0 is a <span className="text-accent">24-hour offline hackathon</span> organized
                  by <span className="text-primary">Numerano Club</span>, Department of Mathematics,
                  Dayananda Sagar College of Engineering, Bangalore.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Bring your boldest ideas, form a team, and build something extraordinary across
                  four innovation tracks. Whether you're into AI, blockchain, automation, or
                  open innovation — this is your arena.
                </p>
              </TerminalWindow>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
              <TerminalWindow title="stats.sh">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3">
                      <stat.icon className="mx-auto mb-2 text-accent" size={24} />
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </TerminalWindow>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp}>
            <p className="font-terminal text-sm text-accent mb-2">$ ./list_tracks.sh --all</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-12">
              Innovation Tracks
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={track.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="glass-card p-6 h-full group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${track.gradient} bg-opacity-10 mb-4`}>
                    <track.icon className="text-foreground" size={24} />
                  </div>
                  <p className="font-terminal text-xs text-accent/60 mb-2">{track.cmd}</p>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">{track.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-8">
            <Link to="/tracks" className="font-terminal text-sm text-accent hover:underline">
              {">"} View detailed track info →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeInUp}>
            <TerminalWindow title="register.sh" className="text-center">
              <p className="text-muted-foreground text-sm">{">"} Initializing registration...</p>
              <p className="text-muted-foreground text-sm">{">"} Checking eligibility...</p>
              <p className="text-accent text-sm mt-2 neon-text">{">"} READY TO INNOVATE?</p>
              <div className="mt-6">
                <Link
                  to="/signup"
                  className="inline-block font-terminal text-sm px-10 py-4 bg-primary/10 border border-primary/50 text-primary rounded-md neon-glow hover:bg-primary/20 transition-all animate-pulse-glow"
                >
                  $ ./REGISTER_NOW.sh
                </Link>
              </div>
              <p className="font-terminal text-xs text-muted-foreground mt-6">
                [50+] TEAMS REGISTERED
              </p>
            </TerminalWindow>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
