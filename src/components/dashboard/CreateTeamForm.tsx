import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const createTeamSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters").max(50),
  track: z.enum(["GenAI", "Blockchain", "Automation", "OpenInnovation"]),
});

type CreateTeamFormData = z.infer<typeof createTeamSchema>;

const CreateTeamForm = () => {
  const { createTeam } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),
  });

  const onSubmit = async (data: CreateTeamFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const teamCode = await createTeam({
      teamName: data.teamName,
      track: data.track,
    });

    setGeneratedCode(teamCode);
    setIsLoading(false);
    toast({
      title: "Team Created!",
      description: `Share code ${teamCode} with your teammates`,
    });
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (generatedCode) {
    return (
      <TerminalWindow title="team_created">
        <div className="space-y-4 text-center">
          <p className="text-neon-green text-lg">✓ Team created successfully!</p>
          <div className="p-4 bg-secondary/30 rounded border border-border">
            <p className="text-muted-foreground text-sm mb-2">Your Team Code:</p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-terminal text-2xl text-accent tracking-wider">
                {generatedCode}
              </span>
              <button
                onClick={copyCode}
                className="p-2 hover:bg-secondary rounded transition-colors"
              >
                {copied ? (
                  <CheckCircle size={16} className="text-neon-green" />
                ) : (
                  <Copy size={16} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Share this code with your teammates to join your team
          </p>
        </div>
      </TerminalWindow>
    );
  }

  return (
    <TerminalWindow title="create_team.sh">
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {"> "}Initialize new team...
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}team_name
            </Label>
            <Input
              {...register("teamName")}
              placeholder="CodeCrusaders"
              className="font-terminal bg-secondary/30 border-border"
            />
            {errors.teamName && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.teamName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}track
            </Label>
            <Select onValueChange={(value) => setValue("track", value as "GenAI" | "Blockchain" | "Automation" | "OpenInnovation")}>
              <SelectTrigger className="font-terminal bg-secondary/30 border-border">
                <SelectValue placeholder="Select track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GenAI">Generative AI</SelectItem>
                <SelectItem value="Blockchain">Blockchain & Cyber Security</SelectItem>
                <SelectItem value="Automation">Workflow Automation</SelectItem>
                <SelectItem value="OpenInnovation">Open Innovation</SelectItem>
              </SelectContent>
            </Select>
            {errors.track && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.track.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full font-terminal bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              "$ ./create_team.sh"
            )}
          </Button>
        </form>
      </div>
    </TerminalWindow>
  );
};

export default CreateTeamForm;
