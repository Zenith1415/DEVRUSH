import { motion } from "framer-motion";
import { Brain, Shield, Cog, Lightbulb } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalWindow from "@/components/TerminalWindow";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const tracks = [
  {
    icon: Brain,
    title: "Generative AI",
    cmd: "$ python train_model.py",
    desc: "Build cutting-edge AI solutions using large language models, diffusion models, and neural architectures. From conversational AI to creative content generation.",
    techStack: ["Python", "TensorFlow", "PyTorch", "Hugging Face", "OpenAI API", "LangChain"],
    examples: ["AI-powered code assistant", "Multimodal content generator", "Intelligent tutoring system"],
  },
  {
    icon: Shield,
    title: "Blockchain & Cyber Security",
    cmd: "$ solidity compile contract.sol",
    desc: "Smart contracts, DeFi protocols, and next-generation security solutions. Build decentralized applications or tools that make the digital world safer.",
    techStack: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "IPFS", "Rust"],
    examples: ["Decentralized identity system", "Smart contract auditing tool", "Zero-knowledge proof application"],
  },
  {
    icon: Cog,
    title: "Workflow Automation",
    cmd: "$ npm run automate",
    desc: "RPA, integrations, and productivity tools that transform how teams work. Automate repetitive tasks and build intelligent workflow engines.",
    techStack: ["Node.js", "Python", "Zapier API", "n8n", "GitHub Actions", "REST APIs"],
    examples: ["Intelligent task orchestrator", "Cross-platform integration hub", "No-code workflow builder"],
  },
  {
    icon: Lightbulb,
    title: "Open Innovation",
    cmd: "$ git push origin innovation",
    desc: "Any domain, any technology. If it solves a real problem and showcases innovation, it belongs here. Surprise us with your creativity.",
    techStack: ["React", "Node.js", "Flutter", "IoT", "AR/VR", "Any tech"],
    examples: ["Accessibility tool for the visually impaired", "Climate change data visualizer", "Community health platform"],
  },
];

const TracksPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-2">$ ./list_tracks.sh --verbose</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Hackathon Tracks
          </h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Choose your battlefield. Each track presents unique challenges and opportunities to showcase your skills.
          </p>
        </motion.div>

        <div className="space-y-8">
          {tracks.map((track, i) => (
            <motion.div key={track.title} {...fadeInUp} transition={{ delay: i * 0.1 }}>
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <track.icon className="text-accent" size={28} />
                  </div>
                  <div>
                    <p className="font-terminal text-xs text-accent/60 mb-1">{track.cmd}</p>
                    <h2 className="font-heading text-2xl font-bold text-foreground">{track.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{track.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TerminalWindow title="tech_stack.json">
                    <div className="flex flex-wrap gap-2">
                      {track.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-secondary text-foreground border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TerminalWindow>
                  <TerminalWindow title="sample_ideas.txt">
                    {track.examples.map((ex) => (
                      <p key={ex} className="text-muted-foreground text-xs mb-1">{">"} {ex}</p>
                    ))}
                  </TerminalWindow>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TracksPage;
