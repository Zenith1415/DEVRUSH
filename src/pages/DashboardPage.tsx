import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Send,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import TerminalWindow from "@/components/TerminalWindow";
import CountdownTimer from "@/components/CountdownTimer";
import CreateTeamForm from "@/components/dashboard/CreateTeamForm";
import JoinTeamForm from "@/components/dashboard/JoinTeamForm";
import TeamDetails from "@/components/dashboard/TeamDetails";
import IdeaSubmissionForm from "@/components/dashboard/IdeaSubmissionForm";
import ProfileSection from "@/components/dashboard/ProfileSection";

type DashboardTab = "overview" | "team" | "submit" | "resources" | "profile";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, team, submission, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const navItems = [
    { id: "overview" as DashboardTab, label: "/dashboard", icon: LayoutDashboard },
    { id: "team" as DashboardTab, label: "/team", icon: Users },
    { id: "submit" as DashboardTab, label: "/submit", icon: Send },
    { id: "resources" as DashboardTab, label: "/resources", icon: FileText },
    { id: "profile" as DashboardTab, label: "/profile", icon: User },
  ];

  const announcements = [
    { date: "2026-03-10", message: "Problem statements released" },
    { date: "2026-03-08", message: "Mentor schedule published" },
    { date: "2026-03-05", message: "Registration extended" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded bg-secondary/80 text-foreground"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card/95 backdrop-blur border-r border-border transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <Link to="/home" className="font-terminal text-lg font-bold text-accent neon-text">
              DEV_RUSH_2.0<span className="animate-blink">▊</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <p className="font-terminal text-xs text-muted-foreground mb-4">
              root@devrush:~$ ls -l
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded font-terminal text-sm transition-colors ${
                      activeTab === item.id
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {activeTab === item.id && "> "}
                    <item.icon size={16} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded font-terminal text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              $ logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Top bar with countdown */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <p className="font-terminal text-sm text-muted-foreground">
              user@devrush:~$ whoami
            </p>
            <h1 className="font-terminal text-xl font-bold text-foreground">
              {user.fullName}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
            </button>
            <CountdownTimer compact />
          </div>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Welcome banner */}
              <TerminalWindow title="system_status" className="lg:col-span-2">
                <div className="text-neon-green">
                  <p>╔════════════════════════════════════╗</p>
                  <p>║ Welcome back, {user.fullName.padEnd(20)}║</p>
                  <p>║ System Status: ACTIVE{" ".repeat(14)}║</p>
                  <p>║ Last Login: {new Date().toLocaleString().padEnd(20)}║</p>
                  <p>╚════════════════════════════════════╝</p>
                </div>
              </TerminalWindow>

              {/* Team status */}
              <TerminalWindow title="team_status">
                {team ? (
                  <div className="space-y-2">
                    <p className="text-neon-green">{"> "}Team: {team.teamName}</p>
                    <p className="text-muted-foreground">
                      {"> "}Members: {team.members.length}/4
                    </p>
                    <p className="text-muted-foreground">
                      {"> "}Team Code: <span className="text-accent">{team.teamCode}</span>
                    </p>
                    <p className="text-muted-foreground">
                      {"> "}Track: {team.track}
                    </p>
                    <p className="flex items-center gap-2">
                      {"> "}Status:{" "}
                      {team.approvalStatus === "approved" ? (
                        <span className="text-neon-green flex items-center gap-1">
                          <CheckCircle size={14} /> APPROVED
                        </span>
                      ) : team.approvalStatus === "rejected" ? (
                        <span className="text-destructive flex items-center gap-1">
                          <X size={14} /> REJECTED
                        </span>
                      ) : (
                        <span className="text-neon-yellow flex items-center gap-1">
                          <Clock size={14} /> PENDING
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-neon-yellow flex items-center gap-2">
                      <AlertTriangle size={14} /> WARNING: No team assigned
                    </p>
                    <p className="text-muted-foreground">{"> "}Available actions:</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("team")}
                      className="font-terminal text-xs"
                    >
                      $ ./create_team.sh
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("team")}
                      className="font-terminal text-xs ml-2"
                    >
                      $ ./join_team.sh
                    </Button>
                  </div>
                )}
              </TerminalWindow>

              {/* Submission status */}
              <TerminalWindow title="submission_status">
                {submission ? (
                  <div className="space-y-2">
                    <p className="text-neon-green">{"> "}Idea Status: SUBMITTED ✓</p>
                    <p className="text-muted-foreground">
                      {"> "}Project: {submission.projectTitle}
                    </p>
                    <p className="text-muted-foreground">
                      {"> "}Submitted: {submission.submittedAt.toLocaleString()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("submit")}
                      className="font-terminal text-xs mt-2"
                    >
                      $ view_submission
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-neon-yellow">{"> "}Idea Status: PENDING</p>
                    <p className="text-muted-foreground">{"> "}Deadline countdown active</p>
                    {team ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("submit")}
                        className="font-terminal text-xs mt-2"
                      >
                        $ ./submit_idea.sh
                      </Button>
                    ) : (
                      <p className="text-destructive text-xs mt-2">
                        {"> "}ERROR: Join a team first
                      </p>
                    )}
                  </div>
                )}
              </TerminalWindow>

              {/* Announcements */}
              <TerminalWindow title="announcements.log" className="lg:col-span-2">
                <p className="text-muted-foreground mb-3">{"> "}Latest Updates:</p>
                <div className="space-y-2">
                  {announcements.map((ann, i) => (
                    <p key={i} className="text-sm">
                      <span className="text-accent">[{ann.date}]</span>{" "}
                      <span className="text-foreground">{ann.message}</span>
                    </p>
                  ))}
                </div>
                <p className="text-primary text-xs mt-4 cursor-pointer hover:underline">
                  $ view_all --announcements
                </p>
              </TerminalWindow>
            </div>
          )}

          {activeTab === "team" && (
            <div className="max-w-4xl">
              {team ? (
                <TeamDetails />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CreateTeamForm />
                  <JoinTeamForm />
                </div>
              )}
            </div>
          )}

          {activeTab === "submit" && (
            <div className="max-w-3xl">
              <IdeaSubmissionForm />
            </div>
          )}

          {activeTab === "resources" && (
            <TerminalWindow title="resources">
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2">{"> "}Documentation:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="text-primary hover:underline cursor-pointer">
                      • Problem Statements [Download]
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      • Mentorship Schedule [View]
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      • Submission Guidelines [Read]
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      • Code of Conduct [PDF]
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">{"> "}Support:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="text-primary hover:underline cursor-pointer">
                      • Discord Server [Join]
                    </li>
                    <li className="text-primary hover:underline cursor-pointer">
                      • Contact Organizers [Email]
                    </li>
                  </ul>
                </div>
              </div>
            </TerminalWindow>
          )}

          {activeTab === "profile" && <ProfileSection />}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
