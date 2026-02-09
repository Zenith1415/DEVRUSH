import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { useAuth, Team } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TerminalWindow from "@/components/TerminalWindow";
import { toast } from "@/hooks/use-toast";

type AdminTab = "overview" | "teams" | "users" | "announcements" | "settings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, allTeams, allUsers, approveTeam, rejectTeam, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [trackFilter, setTrackFilter] = useState<string>("all");

  if (!user?.isAdmin) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const navItems = [
    { id: "overview" as AdminTab, label: "/admin/overview", icon: LayoutDashboard },
    { id: "teams" as AdminTab, label: "/admin/teams", icon: UserCheck },
    { id: "users" as AdminTab, label: "/admin/users", icon: Users },
    { id: "announcements" as AdminTab, label: "/admin/announcements", icon: Megaphone },
    { id: "settings" as AdminTab, label: "/admin/settings", icon: Settings },
  ];

  // Stats
  const stats = {
    totalRegistrations: allUsers.length,
    teamsFormed: allTeams.length,
    pendingApprovals: allTeams.filter((t) => t.approvalStatus === "pending").length,
    approvedTeams: allTeams.filter((t) => t.approvalStatus === "approved").length,
    rejectedTeams: allTeams.filter((t) => t.approvalStatus === "rejected").length,
  };

  // Filtered teams
  const filteredTeams = allTeams.filter((team) => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || team.approvalStatus === statusFilter;
    const matchesTrack = trackFilter === "all" || team.track === trackFilter;
    return matchesSearch && matchesStatus && matchesTrack;
  });

  const handleApprove = (teamId: string) => {
    approveTeam(teamId);
    toast({ title: "Team Approved", description: "Team has been approved successfully" });
    setSelectedTeam(null);
  };

  const handleReject = (teamId: string) => {
    rejectTeam(teamId);
    toast({ title: "Team Rejected", description: "Team has been rejected", variant: "destructive" });
    setSelectedTeam(null);
  };

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
          <div className="p-4 border-b border-border">
            <Link to="/home" className="font-terminal text-lg font-bold text-neon-yellow">
              ADMIN_PANEL<span className="animate-blink">▊</span>
            </Link>
          </div>

          <nav className="flex-1 p-4">
            <p className="font-terminal text-xs text-muted-foreground mb-4">
              root@devrush-admin:~$
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
                        ? "text-neon-yellow bg-neon-yellow/10"
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
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <TerminalWindow title="system_status" className="mb-6">
                <p className="text-neon-green">admin@devrush:~$ system --status</p>
                <p className="text-muted-foreground">{"> "}All systems operational</p>
                <p className="text-muted-foreground">
                  {"> "}Active connections: {allUsers.length} users online
                </p>
              </TerminalWindow>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TerminalWindow title="registrations">
                  <p className="text-3xl font-bold text-primary">{stats.totalRegistrations}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </TerminalWindow>
                <TerminalWindow title="teams">
                  <p className="text-3xl font-bold text-accent">{stats.teamsFormed}</p>
                  <p className="text-xs text-muted-foreground">Teams Formed</p>
                </TerminalWindow>
                <TerminalWindow title="pending">
                  <p className="text-3xl font-bold text-neon-yellow">{stats.pendingApprovals}</p>
                  <p className="text-xs text-muted-foreground">Pending Approvals</p>
                </TerminalWindow>
                <TerminalWindow title="approved">
                  <p className="text-3xl font-bold text-neon-green">{stats.approvedTeams}</p>
                  <p className="text-xs text-muted-foreground">Approved Teams</p>
                </TerminalWindow>
              </div>

              {/* Recent Teams */}
              <TerminalWindow title="recent_teams">
                <p className="text-muted-foreground mb-4">{"> "}$ tail -n 5 teams.log</p>
                <div className="overflow-x-auto">
                  <table className="w-full font-terminal text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 text-muted-foreground">ID</th>
                        <th className="pb-2 text-muted-foreground">TEAM_NAME</th>
                        <th className="pb-2 text-muted-foreground">TRACK</th>
                        <th className="pb-2 text-muted-foreground">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTeams.slice(0, 5).map((team, i) => (
                        <tr key={team.id} className="border-b border-border/50">
                          <td className="py-2 text-muted-foreground">{String(i + 1).padStart(3, "0")}</td>
                          <td className="py-2 text-foreground">{team.teamName}</td>
                          <td className="py-2 text-accent">{team.track}</td>
                          <td className="py-2">
                            <span
                              className={
                                team.approvalStatus === "approved"
                                  ? "text-neon-green"
                                  : team.approvalStatus === "rejected"
                                  ? "text-destructive"
                                  : "text-neon-yellow"
                              }
                            >
                              {team.approvalStatus.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TerminalWindow>
            </div>
          )}

          {activeTab === "teams" && (
            <div className="space-y-6">
              <TerminalWindow title="manage_teams.sh">
                <p className="text-muted-foreground mb-4">{"> "}$ ./manage_teams.sh --all</p>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input
                        placeholder="Search teams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 font-terminal bg-secondary/30 border-border"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px] font-terminal bg-secondary/30 border-border">
                      <Filter size={14} className="mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={trackFilter} onValueChange={setTrackFilter}>
                    <SelectTrigger className="w-[180px] font-terminal bg-secondary/30 border-border">
                      <SelectValue placeholder="Track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tracks</SelectItem>
                      <SelectItem value="GenAI">Generative AI</SelectItem>
                      <SelectItem value="Blockchain">Blockchain</SelectItem>
                      <SelectItem value="Automation">Automation</SelectItem>
                      <SelectItem value="OpenInnovation">Open Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Teams Table */}
                <div className="overflow-x-auto">
                  <table className="w-full font-terminal text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 text-muted-foreground">ID</th>
                        <th className="pb-2 text-muted-foreground">TEAM_NAME</th>
                        <th className="pb-2 text-muted-foreground">MEMBERS</th>
                        <th className="pb-2 text-muted-foreground">TRACK</th>
                        <th className="pb-2 text-muted-foreground">STATUS</th>
                        <th className="pb-2 text-muted-foreground">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeams.map((team, i) => (
                        <tr key={team.id} className="border-b border-border/50 hover:bg-secondary/20">
                          <td className="py-3 text-muted-foreground">{String(i + 1).padStart(3, "0")}</td>
                          <td className="py-3 text-foreground">{team.teamName}</td>
                          <td className="py-3 text-muted-foreground">{team.members.length}/4</td>
                          <td className="py-3 text-accent">{team.track}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center gap-1 ${
                                team.approvalStatus === "approved"
                                  ? "text-neon-green"
                                  : team.approvalStatus === "rejected"
                                  ? "text-destructive"
                                  : "text-neon-yellow"
                              }`}
                            >
                              {team.approvalStatus === "approved" ? (
                                <CheckCircle size={12} />
                              ) : team.approvalStatus === "rejected" ? (
                                <XCircle size={12} />
                              ) : (
                                <Clock size={12} />
                              )}
                              {team.approvalStatus.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedTeam(team)}
                                className="font-terminal text-xs"
                              >
                                <Eye size={14} />
                              </Button>
                              {team.approvalStatus === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleApprove(team.id)}
                                    className="font-terminal text-xs text-neon-green hover:bg-neon-green/10"
                                  >
                                    <CheckCircle size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleReject(team.id)}
                                    className="font-terminal text-xs text-destructive hover:bg-destructive/10"
                                  >
                                    <XCircle size={14} />
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                  <span>Showing {filteredTeams.length} of {allTeams.length} teams</span>
                  <Button variant="outline" size="sm" className="font-terminal text-xs">
                    <Download size={12} className="mr-2" />
                    Export CSV
                  </Button>
                </div>
              </TerminalWindow>
            </div>
          )}

          {activeTab === "users" && (
            <TerminalWindow title="user_management">
              <p className="text-muted-foreground mb-4">{"> "}$ ./list_users.sh --all</p>
              <div className="overflow-x-auto">
                <table className="w-full font-terminal text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 text-muted-foreground">USER_ID</th>
                      <th className="pb-2 text-muted-foreground">NAME</th>
                      <th className="pb-2 text-muted-foreground">EMAIL</th>
                      <th className="pb-2 text-muted-foreground">COLLEGE</th>
                      <th className="pb-2 text-muted-foreground">ROLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.id} className="border-b border-border/50">
                        <td className="py-2 text-muted-foreground">{u.id.slice(0, 8)}</td>
                        <td className="py-2 text-foreground">{u.fullName}</td>
                        <td className="py-2 text-accent">{u.email}</td>
                        <td className="py-2 text-muted-foreground">{u.college}</td>
                        <td className="py-2">
                          <span className={u.isAdmin ? "text-neon-yellow" : "text-muted-foreground"}>
                            {u.isAdmin ? "ADMIN" : "USER"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TerminalWindow>
          )}

          {activeTab === "announcements" && (
            <TerminalWindow title="announcements">
              <p className="text-muted-foreground mb-4">{"> "}Create New Announcement</p>
              <div className="space-y-4">
                <Input
                  placeholder="Announcement title..."
                  className="font-terminal bg-secondary/30 border-border"
                />
                <textarea
                  placeholder="Announcement message..."
                  className="w-full min-h-[100px] p-3 font-terminal bg-secondary/30 border border-border rounded-md resize-none"
                />
                <div className="flex gap-4">
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-[150px] font-terminal bg-secondary/30 border-border">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">HIGH</SelectItem>
                      <SelectItem value="medium">MEDIUM</SelectItem>
                      <SelectItem value="low">LOW</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="font-terminal bg-primary hover:bg-primary/90">
                    $ ./publish_announcement.sh
                  </Button>
                </div>
              </div>
            </TerminalWindow>
          )}

          {activeTab === "settings" && (
            <TerminalWindow title="system_config">
              <p className="text-muted-foreground mb-4">{"> "}Configuration:</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded bg-secondary/20 border border-border">
                  <span className="text-foreground">[✓] Registrations Open</span>
                  <Button variant="outline" size="sm" className="font-terminal text-xs">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-secondary/20 border border-border">
                  <span className="text-foreground">[✓] Team Formation Enabled</span>
                  <Button variant="outline" size="sm" className="font-terminal text-xs">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-secondary/20 border border-border">
                  <span className="text-muted-foreground">[ ] Submissions Open</span>
                  <Button variant="outline" size="sm" className="font-terminal text-xs">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-secondary/20 border border-border">
                  <span className="text-muted-foreground">[ ] Judging Mode</span>
                  <Button variant="outline" size="sm" className="font-terminal text-xs">
                    Toggle
                  </Button>
                </div>
              </div>
            </TerminalWindow>
          )}
        </motion.div>
      </main>

      {/* Team Details Modal */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-terminal text-xl text-accent">
              TEAM DETAILS - {selectedTeam?.teamName}
            </DialogTitle>
          </DialogHeader>
          {selectedTeam && (
            <div className="space-y-4 font-terminal text-sm">
              <div className="p-4 bg-secondary/20 rounded border border-border space-y-2">
                <p><span className="text-muted-foreground">Team ID:</span> <span className="text-foreground">{selectedTeam.id}</span></p>
                <p><span className="text-muted-foreground">Team Code:</span> <span className="text-accent">{selectedTeam.teamCode}</span></p>
                <p><span className="text-muted-foreground">Track:</span> <span className="text-primary">{selectedTeam.track}</span></p>
                <p><span className="text-muted-foreground">Created:</span> <span className="text-foreground">{selectedTeam.createdAt.toLocaleDateString()}</span></p>
              </div>

              <div>
                <p className="text-muted-foreground mb-2">MEMBERS:</p>
                <div className="space-y-2">
                  {selectedTeam.members.map((member, i) => (
                    <div key={member.userId} className="p-2 bg-secondary/10 rounded border border-border/50">
                      <p className="text-foreground">
                        {i + 1}. {member.userName} {member.isLeader && <span className="text-neon-yellow">(Leader)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTeam.approvalStatus === "pending" && (
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Button
                    onClick={() => handleApprove(selectedTeam.id)}
                    className="flex-1 font-terminal bg-neon-green hover:bg-neon-green/90 text-background"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    $ approve --send-email
                  </Button>
                  <Button
                    onClick={() => handleReject(selectedTeam.id)}
                    variant="destructive"
                    className="flex-1 font-terminal"
                  >
                    <XCircle size={16} className="mr-2" />
                    $ reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
