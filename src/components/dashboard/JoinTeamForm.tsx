import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const joinTeamSchema = z.object({
  teamCode: z.string().length(6, "Team code must be 6 characters"),
});

type JoinTeamFormData = z.infer<typeof joinTeamSchema>;

const JoinTeamForm = () => {
  const { joinTeam } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinTeamFormData>({
    resolver: zodResolver(joinTeamSchema),
  });

  const onSubmit = async (data: JoinTeamFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = await joinTeam(data.teamCode.toUpperCase());

    setIsLoading(false);
    if (success) {
      toast({
        title: "Joined Team!",
        description: "You are now part of the team",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid team code or team is full",
        variant: "destructive",
      });
    }
  };

  return (
    <TerminalWindow title="join_team.sh">
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {"> "}Enter team code to join...
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}team_code
            </Label>
            <Input
              {...register("teamCode")}
              placeholder="ABC123"
              maxLength={6}
              className="font-terminal bg-secondary/30 border-border uppercase tracking-widest text-center text-lg"
            />
            {errors.teamCode && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.teamCode.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full font-terminal bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              "$ ./join_team.sh"
            )}
          </Button>
        </form>

        <p className="text-muted-foreground text-xs text-center">
          Ask your team leader for the 6-digit code
        </p>
      </div>
    </TerminalWindow>
  );
};

export default JoinTeamForm;
