import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  college: string;
  yearOfStudy: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Team {
  id: string;
  teamName: string;
  teamCode: string;
  leaderId: string;
  track: "GenAI" | "Blockchain" | "Automation" | "OpenInnovation";
  members: TeamMember[];
  approvalStatus: "pending" | "approved" | "rejected";
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  userName: string;
  email: string;
  isLeader: boolean;
  joinedAt: Date;
}

export interface Submission {
  id: string;
  teamId: string;
  projectTitle: string;
  tagline: string;
  problemStatement: string;
  solutionApproach: string;
  techStack: string[];
  novelty: string;
  presentationUrl?: string;
  demoVideoUrl?: string;
  githubRepoUrl?: string;
  submittedAt: Date;
  isFinal: boolean;
}

interface AuthContextType {
  user: User | null;
  team: Team | null;
  submission: Submission | null;
  allTeams: Team[];
  allUsers: User[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, "id" | "isAdmin" | "createdAt">) => Promise<boolean>;
  logout: () => void;
  createTeam: (teamData: { teamName: string; track: Team["track"] }) => Promise<string>;
  joinTeam: (teamCode: string) => Promise<boolean>;
  leaveTeam: () => void;
  submitIdea: (submissionData: Omit<Submission, "id" | "teamId" | "submittedAt" | "isFinal">) => void;
  approveTeam: (teamId: string) => void;
  rejectTeam: (teamId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate random team code
const generateTeamCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// Mock data
const mockUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@devrush.com",
    fullName: "Admin User",
    phone: "+91 9876543210",
    college: "DSCE",
    yearOfStudy: "4th",
    isAdmin: true,
    createdAt: new Date("2025-01-01"),
  },
];

const mockTeams: Team[] = [
  {
    id: "team-1",
    teamName: "CodeCrusaders",
    teamCode: "ABC123",
    leaderId: "user-1",
    track: "GenAI",
    members: [
      { userId: "user-1", userName: "John Doe", email: "john@example.com", isLeader: true, joinedAt: new Date() },
      { userId: "user-2", userName: "Jane Smith", email: "jane@example.com", isLeader: false, joinedAt: new Date() },
    ],
    approvalStatus: "pending",
    createdAt: new Date("2026-02-15"),
  },
  {
    id: "team-2",
    teamName: "BlockBuilders",
    teamCode: "XYZ789",
    leaderId: "user-3",
    track: "Blockchain",
    members: [
      { userId: "user-3", userName: "Alex Kumar", email: "alex@example.com", isLeader: true, joinedAt: new Date() },
      { userId: "user-4", userName: "Sara Wilson", email: "sara@example.com", isLeader: false, joinedAt: new Date() },
      { userId: "user-5", userName: "Mike Chen", email: "mike@example.com", isLeader: false, joinedAt: new Date() },
    ],
    approvalStatus: "approved",
    createdAt: new Date("2026-02-10"),
  },
  {
    id: "team-3",
    teamName: "AutoBots",
    teamCode: "DEF456",
    leaderId: "user-6",
    track: "Automation",
    members: [
      { userId: "user-6", userName: "Emma Brown", email: "emma@example.com", isLeader: true, joinedAt: new Date() },
      { userId: "user-7", userName: "Chris Lee", email: "chris@example.com", isLeader: false, joinedAt: new Date() },
    ],
    approvalStatus: "pending",
    createdAt: new Date("2026-02-18"),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [allTeams, setAllTeams] = useState<Team[]>(mockTeams);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    try {
      const savedUser = localStorage.getItem("devrush_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        // Find user's team
        const userTeam = allTeams.find((t) =>
          t.members.some((m) => m.userId === parsedUser.id)
        );
        if (userTeam) setTeam(userTeam);
      }
    } catch (error) {
      console.error("Failed to restore session:", error);
      localStorage.removeItem("devrush_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    // Check for admin
    if (email === "admin@devrush.com" && password === "admin123") {
      const adminUser = allUsers.find((u) => u.isAdmin);
      if (adminUser) {
        setUser(adminUser);
        localStorage.setItem("devrush_user", JSON.stringify(adminUser));
        setIsLoading(false);
        return true;
      }
    }

    // Check regular users or create demo user
    const foundUser = allUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("devrush_user", JSON.stringify(foundUser));
      const userTeam = allTeams.find((t) =>
        t.members.some((m) => m.userId === foundUser.id)
      );
      if (userTeam) setTeam(userTeam);
      setIsLoading(false);
      return true;
    }

    // Demo Mode: Allow any login as a new guest user
    const demoUser: User = {
      id: `user-${Date.now()}`,
      email: email,
      fullName: "Demo User",
      phone: "",
      college: "Demo Institute",
      yearOfStudy: "1st",
      isAdmin: false,
      createdAt: new Date(),
    };

    setUser(demoUser);
    localStorage.setItem("devrush_user", JSON.stringify(demoUser));
    // Don't add to allUsers to avoid cluttering state, or add it? Let's just set current user.
    // Actually, maybe better to add to allUsers so logout/login works? 
    // For demo simplicity, just setting user is fine.

    setIsLoading(false);
    return true;
  };

  const signup = async (userData: Omit<User, "id" | "isAdmin" | "createdAt">): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email exists
    if (allUsers.some((u) => u.email === userData.email)) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      isAdmin: false,
      createdAt: new Date(),
    };

    setAllUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem("devrush_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setTeam(null);
    setSubmission(null);
    localStorage.removeItem("devrush_user");
  };

  const createTeam = async (teamData: { teamName: string; track: Team["track"] }): Promise<string> => {
    if (!user) return "";

    const teamCode = generateTeamCode();
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      teamName: teamData.teamName,
      teamCode,
      leaderId: user.id,
      track: teamData.track,
      members: [
        {
          userId: user.id,
          userName: user.fullName,
          email: user.email,
          isLeader: true,
          joinedAt: new Date(),
        },
      ],
      approvalStatus: "pending",
      createdAt: new Date(),
    };

    setAllTeams((prev) => [...prev, newTeam]);
    setTeam(newTeam);
    return teamCode;
  };

  const joinTeam = async (teamCode: string): Promise<boolean> => {
    if (!user) return false;

    const foundTeam = allTeams.find((t) => t.teamCode === teamCode);
    if (!foundTeam || foundTeam.members.length >= 4) return false;

    const updatedTeam: Team = {
      ...foundTeam,
      members: [
        ...foundTeam.members,
        {
          userId: user.id,
          userName: user.fullName,
          email: user.email,
          isLeader: false,
          joinedAt: new Date(),
        },
      ],
    };

    setAllTeams((prev) =>
      prev.map((t) => (t.id === foundTeam.id ? updatedTeam : t))
    );
    setTeam(updatedTeam);
    return true;
  };

  const leaveTeam = () => {
    if (!user || !team) return;

    if (team.leaderId === user.id) {
      // Leader leaves - delete team
      setAllTeams((prev) => prev.filter((t) => t.id !== team.id));
    } else {
      // Member leaves
      const updatedTeam: Team = {
        ...team,
        members: team.members.filter((m) => m.userId !== user.id),
      };
      setAllTeams((prev) =>
        prev.map((t) => (t.id === team.id ? updatedTeam : t))
      );
    }
    setTeam(null);
    setSubmission(null);
  };

  const submitIdea = (submissionData: Omit<Submission, "id" | "teamId" | "submittedAt" | "isFinal">) => {
    if (!team) return;

    const newSubmission: Submission = {
      ...submissionData,
      id: `sub-${Date.now()}`,
      teamId: team.id,
      submittedAt: new Date(),
      isFinal: true,
    };

    setSubmission(newSubmission);
  };

  const approveTeam = (teamId: string) => {
    setAllTeams((prev) =>
      prev.map((t) =>
        t.id === teamId ? { ...t, approvalStatus: "approved" as const } : t
      )
    );
  };

  const rejectTeam = (teamId: string) => {
    setAllTeams((prev) =>
      prev.map((t) =>
        t.id === teamId ? { ...t, approvalStatus: "rejected" as const } : t
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        team,
        submission,
        allTeams,
        allUsers,
        isLoading,
        login,
        signup,
        logout,
        createTeam,
        joinTeam,
        leaveTeam,
        submitIdea,
        approveTeam,
        rejectTeam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
