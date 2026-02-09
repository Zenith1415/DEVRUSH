import { useAuth } from "@/contexts/AuthContext";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const ProfileSection = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <TerminalWindow title="user_profile">
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            {"> "}$ cat /etc/user.conf
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}full_name:</p>
              <p className="text-foreground font-medium">{user.fullName}</p>
            </div>
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}email:</p>
              <p className="text-foreground">{user.email}</p>
            </div>
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}phone:</p>
              <p className="text-foreground">{user.phone}</p>
            </div>
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}college:</p>
              <p className="text-foreground">{user.college}</p>
            </div>
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}year_of_study:</p>
              <p className="text-foreground">{user.yearOfStudy} Year</p>
            </div>
            <div className="p-3 rounded bg-secondary/20 border border-border">
              <p className="text-xs text-muted-foreground mb-1">{"> "}registered_on:</p>
              <p className="text-foreground">
                {user.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm mb-3">
              {"> "}Account status:{" "}
              <span className="text-neon-green">ACTIVE</span>
            </p>
            <p className="text-muted-foreground text-sm">
              {"> "}Role:{" "}
              <span className={user.isAdmin ? "text-neon-yellow" : "text-accent"}>
                {user.isAdmin ? "ADMIN" : "PARTICIPANT"}
              </span>
            </p>
          </div>
        </div>
      </TerminalWindow>

      <Button
        variant="outline"
        className="font-terminal border-border hover:bg-secondary/50"
      >
        <Edit size={16} className="mr-2" />
        $ edit_profile
      </Button>
    </div>
  );
};

export default ProfileSection;
