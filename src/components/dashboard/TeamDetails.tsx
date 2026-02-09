import { useState } from "react";
import { Copy, CheckCircle, UserMinus, LogOut, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const TeamDetails = () => {
  const { user, team, leaveTeam } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!team || !user) return null;

  const isLeader = team.leaderId === user.id;

  const copyCode = () => {
    navigator.clipboard.writeText(team.teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveTeam = () => {
    leaveTeam();
    toast({
      title: isLeader ? "Team Disbanded" : "Left Team",
      description: isLeader
        ? "Your team has been deleted"
        : "You have left the team",
    });
  };

  return (
    <div className="space-y-6">
      <TerminalWindow title="team_info">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{"> "}Team Name:</p>
              <p className="text-xl font-bold text-accent">{team.teamName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">{"> "}Team Code:</p>
              <div className="flex items-center gap-2">
                <span className="font-terminal text-lg text-primary tracking-wider">
                  {team.teamCode}
                </span>
                <button
                  onClick={copyCode}
                  className="p-1.5 hover:bg-secondary rounded transition-colors"
                >
                  {copied ? (
                    <CheckCircle size={14} className="text-neon-green" />
                  ) : (
                    <Copy size={14} className="text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Track:</p>
              <p className="text-foreground">{team.track}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Status:</p>
              <p
                className={
                  team.approvalStatus === "approved"
                    ? "text-neon-green"
                    : team.approvalStatus === "rejected"
                    ? "text-destructive"
                    : "text-neon-yellow"
                }
              >
                {team.approvalStatus.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Members:</p>
              <p className="text-foreground">{team.members.length}/4</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Created:</p>
              <p className="text-foreground">
                {team.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <TerminalWindow title="team_members">
        <p className="text-muted-foreground text-sm mb-4">
          {"> "}$ list_members --all
        </p>
        <div className="space-y-3">
          {team.members.map((member, index) => (
            <div
              key={member.userId}
              className="flex items-center justify-between p-3 rounded bg-secondary/20 border border-border"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground font-terminal text-sm">
                  [{index + 1}]
                </span>
                <div>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    {member.userName}
                    {member.isLeader && (
                      <Crown size={14} className="text-neon-yellow" />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              {isLeader && !member.isLeader && (
                <button
                  className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                  title="Remove member"
                >
                  <UserMinus size={16} />
                </button>
              )}
            </div>
          ))}

          {team.members.length < 4 && (
            <div className="p-3 rounded border border-dashed border-border text-center">
              <p className="text-muted-foreground text-sm">
                + {4 - team.members.length} slots available
              </p>
              <p className="text-xs text-primary mt-1">
                Share code: {team.teamCode}
              </p>
            </div>
          )}
        </div>
      </TerminalWindow>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="font-terminal text-destructive border-destructive/50 hover:bg-destructive/10"
          >
            <LogOut size={16} className="mr-2" />
            {isLeader ? "$ ./disband_team.sh" : "$ ./leave_team.sh"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-terminal text-destructive">
              {isLeader ? "Disband Team?" : "Leave Team?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-terminal text-muted-foreground">
              {isLeader
                ? "This will permanently delete the team and all members will be removed. This action cannot be undone."
                : "You will be removed from the team. You can join another team or create a new one."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-terminal">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeaveTeam}
              className="font-terminal bg-destructive hover:bg-destructive/90"
            >
              {isLeader ? "Disband" : "Leave"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamDetails;
