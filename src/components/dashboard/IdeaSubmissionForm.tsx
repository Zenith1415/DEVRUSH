import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const techStackOptions = [
  "React",
  "Node.js",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Solidity",
  "Rust",
  "Go",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
];

const submissionSchema = z.object({
  projectTitle: z.string().min(5, "Title must be at least 5 characters").max(100),
  tagline: z.string().min(10, "Tagline must be at least 10 characters").max(50),
  problemStatement: z.string().min(100, "Problem statement must be at least 100 characters").max(2000),
  solutionApproach: z.string().min(150, "Solution approach must be at least 150 characters").max(3000),
  techStack: z.array(z.string()).min(1, "Select at least one technology"),
  novelty: z.string().min(50, "Explain what makes your solution unique").max(1000),
  presentationUrl: z.string().url().optional().or(z.literal("")),
  demoVideoUrl: z.string().url().optional().or(z.literal("")),
  githubRepoUrl: z.string().url().optional().or(z.literal("")),
  confirmation: z.boolean().refine((val) => val === true, "You must confirm team contribution"),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const IdeaSubmissionForm = () => {
  const { team, submission, submitIdea } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      techStack: [],
      confirmation: false,
    },
  });

  if (!team) {
    return (
      <TerminalWindow title="error">
        <div className="text-center py-8">
          <AlertTriangle size={48} className="mx-auto text-neon-yellow mb-4" />
          <p className="text-neon-yellow font-terminal">
            {"> "}ERROR: No team found
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            You must join or create a team before submitting an idea
          </p>
        </div>
      </TerminalWindow>
    );
  }

  if (submission) {
    return (
      <TerminalWindow title="submission_details">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-neon-green">
            <CheckCircle size={20} />
            <span className="font-terminal">{"> "}SUBMISSION RECEIVED</span>
          </div>

          <div className="p-4 bg-secondary/20 rounded border border-border space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Project Title:</p>
              <p className="text-foreground font-medium">{submission.projectTitle}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Tagline:</p>
              <p className="text-foreground">{submission.tagline}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Tech Stack:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {submission.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-primary/20 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{"> "}Submitted:</p>
              <p className="text-foreground">{submission.submittedAt.toLocaleString()}</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            {"> "}Your submission is locked. Contact organizers for changes.
          </p>
        </div>
      </TerminalWindow>
    );
  }

  const toggleTech = (tech: string) => {
    const updated = selectedTech.includes(tech)
      ? selectedTech.filter((t) => t !== tech)
      : [...selectedTech, tech];
    setSelectedTech(updated);
    setValue("techStack", updated);
  };

  const onSubmit = async (data: SubmissionFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    submitIdea({
      projectTitle: data.projectTitle,
      tagline: data.tagline,
      problemStatement: data.problemStatement,
      solutionApproach: data.solutionApproach,
      techStack: data.techStack,
      novelty: data.novelty,
      presentationUrl: data.presentationUrl || undefined,
      demoVideoUrl: data.demoVideoUrl || undefined,
      githubRepoUrl: data.githubRepoUrl || undefined,
    });

    setIsLoading(false);
    toast({
      title: "Idea Submitted!",
      description: "Your project has been successfully submitted",
    });
  };

  return (
    <TerminalWindow title="submit_idea.sh">
      <div className="space-y-4">
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            {"> "}$ init submission for team: <span className="text-accent">{team.teamName}</span>
          </p>
          <p className="text-muted-foreground text-sm">
            {"> "}Track: <span className="text-primary">{team.track}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}project_title *
            </Label>
            <Input
              {...register("projectTitle")}
              placeholder="AI-Powered Code Assistant"
              className="font-terminal bg-secondary/30 border-border"
            />
            {errors.projectTitle && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.projectTitle.message}
              </p>
            )}
          </div>

          {/* Tagline */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}tagline (max 50 chars) *
            </Label>
            <Input
              {...register("tagline")}
              placeholder="Revolutionizing Development"
              maxLength={50}
              className="font-terminal bg-secondary/30 border-border"
            />
            {errors.tagline && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.tagline.message}
              </p>
            )}
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}problem_statement (100-2000 chars) *
            </Label>
            <Textarea
              {...register("problemStatement")}
              placeholder="Describe the problem you are solving..."
              rows={5}
              className="font-terminal bg-secondary/30 border-border resize-none"
            />
            {errors.problemStatement && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.problemStatement.message}
              </p>
            )}
          </div>

          {/* Solution Approach */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}solution_approach (150-3000 chars) *
            </Label>
            <Textarea
              {...register("solutionApproach")}
              placeholder="Explain your solution and how it works..."
              rows={6}
              className="font-terminal bg-secondary/30 border-border resize-none"
            />
            {errors.solutionApproach && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.solutionApproach.message}
              </p>
            )}
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}tech_stack *
            </Label>
            <div className="flex flex-wrap gap-2">
              {techStackOptions.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1.5 text-xs font-terminal rounded border transition-colors ${
                    selectedTech.includes(tech)
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-secondary/30 border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
            {errors.techStack && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.techStack.message}
              </p>
            )}
          </div>

          {/* Novelty */}
          <div className="space-y-2">
            <Label className="font-terminal text-xs text-muted-foreground">
              {"> "}novelty (what makes it unique) *
            </Label>
            <Textarea
              {...register("novelty")}
              placeholder="Explain what makes your solution innovative..."
              rows={3}
              className="font-terminal bg-secondary/30 border-border resize-none"
            />
            {errors.novelty && (
              <p className="font-terminal text-xs text-destructive">
                {"> "}ERROR: {errors.novelty.message}
              </p>
            )}
          </div>

          {/* Optional URLs */}
          <div className="space-y-4 pt-4 border-t border-border">
            <p className="font-terminal text-xs text-muted-foreground">
              {"> "}Optional resources:
            </p>

            <div className="space-y-2">
              <Label className="font-terminal text-xs text-muted-foreground">
                presentation_url (PDF/PPT link)
              </Label>
              <Input
                {...register("presentationUrl")}
                placeholder="https://drive.google.com/..."
                className="font-terminal bg-secondary/30 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-terminal text-xs text-muted-foreground">
                demo_video_url (YouTube/Drive)
              </Label>
              <Input
                {...register("demoVideoUrl")}
                placeholder="https://youtube.com/..."
                className="font-terminal bg-secondary/30 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-terminal text-xs text-muted-foreground">
                github_repo_url
              </Label>
              <Input
                {...register("githubRepoUrl")}
                placeholder="https://github.com/..."
                className="font-terminal bg-secondary/30 border-border"
              />
            </div>
          </div>

          {/* Confirmation */}
          <div className="flex items-start gap-3 p-3 rounded bg-secondary/20 border border-border">
            <Checkbox
              id="confirmation"
              onCheckedChange={(checked) => setValue("confirmation", checked as boolean)}
            />
            <label htmlFor="confirmation" className="text-sm text-muted-foreground cursor-pointer">
              I confirm that all team members have contributed to this submission and we agree
              to the hackathon rules and code of conduct.
            </label>
          </div>
          {errors.confirmation && (
            <p className="font-terminal text-xs text-destructive">
              {"> "}ERROR: {errors.confirmation.message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full font-terminal bg-neon-green hover:bg-neon-green/90 text-background"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Submitting...
              </>
            ) : (
              "$ ./submit_final_idea.sh"
            )}
          </Button>
        </form>
      </div>
    </TerminalWindow>
  );
};

export default IdeaSubmissionForm;
