import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TerminalWindow from "@/components/TerminalWindow";

const events = [
  { date: "2026-02-01", time: "00:00:00", title: "Registration Opens", desc: "Teams can begin registering for DevRush 2.0.", status: "completed" },
  { date: "2026-03-10", time: "23:59:59", title: "Registration Closes", desc: "Final deadline to register your team.", status: "upcoming" },
  { date: "2026-03-13", time: "09:00:00", title: "Hackathon Kickoff", desc: "Opening ceremony and problem statement release.", status: "upcoming" },
  { date: "2026-03-13", time: "12:00:00", title: "Lunch Break", desc: "Refuel and network with fellow hackers.", status: "upcoming" },
  { date: "2026-03-13", time: "18:00:00", title: "Mentor Sessions", desc: "One-on-one mentoring with industry experts.", status: "upcoming" },
  { date: "2026-03-14", time: "00:00:00", title: "Midnight Checkpoint", desc: "Progress review and midnight snacks.", status: "upcoming" },
  { date: "2026-03-14", time: "09:00:00", title: "Final Submissions", desc: "All projects must be submitted.", status: "upcoming" },
  { date: "2026-03-14", time: "11:00:00", title: "Judging Begins", desc: "Teams present their projects to judges.", status: "upcoming" },
  { date: "2026-03-14", time: "15:00:00", title: "Winner Announcement", desc: "Awards ceremony and closing.", status: "upcoming" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const TimelinePage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp}>
          <p className="font-terminal text-sm text-accent mb-2">$ cat timeline.log | grep --color events</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-12">
            Event Timeline
          </h1>
        </motion.div>

        {/* Terminal timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20" />

          {events.map((event, i) => (
            <motion.div
              key={event.title}
              {...fadeInUp}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative flex items-start mb-8 ${
                i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              } flex-row`}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-accent neon-glow-cyan -translate-x-1.5 mt-4 z-10" />

              {/* Spacer */}
              <div className="hidden sm:block sm:w-1/2" />

              {/* Card */}
              <div className={`ml-10 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
                <TerminalWindow title={`event_${String(i + 1).padStart(2, "0")}.log`}>
                  <p className="text-accent/60 text-xs mb-1">[{event.date} {event.time}]</p>
                  <p className="text-foreground font-semibold mb-1">{">"} {event.title}</p>
                  <p className="text-muted-foreground text-xs">{event.desc}</p>
                </TerminalWindow>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default TimelinePage;
