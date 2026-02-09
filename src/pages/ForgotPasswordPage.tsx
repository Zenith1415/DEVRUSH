import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setSubmitted(true);
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <TerminalWindow title="forgot_password.sh">
          <div className="space-y-6">
            <div className="font-terminal text-sm space-y-1">
              <p className="text-accent">user@devrush:~$ ./forgot_password.sh</p>
              <p className="text-muted-foreground">{"> "}Password recovery initiated</p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-neon-green font-terminal mb-4">
                  {"> "}SUCCESS: Reset link sent ✓
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Check your email for instructions to reset your password.
                </p>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="font-terminal"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {"> "}email_address
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="font-terminal bg-secondary/30 border-border"
                  />
                  {errors.email && (
                    <p className="font-terminal text-xs text-destructive">
                      {"> "}ERROR: {errors.email.message}
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
                    "$ ./send_reset_link.sh"
                  )}
                </Button>

                <p className="text-center font-terminal text-sm text-muted-foreground">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    $ ./login.sh
                  </Link>
                </p>
              </form>
            )}
          </div>
        </TerminalWindow>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
