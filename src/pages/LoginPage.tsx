import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import MatrixRain from "@/components/effects/MatrixRain";
import GlitchText from "@/components/effects/GlitchText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Authentication required",
    "> Enter credentials to continue",
  ]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setTerminalLines((prev) => [...prev, "> Verifying credentials..."]);

    const success = await login(data.email, data.password);

    if (success) {
      setTerminalLines((prev) => [
        ...prev,
        "> Establishing secure connection...",
        "> Access granted ✓",
      ]);
      toast({
        title: "Login Successful",
        description: "Welcome back to DevRush 2.0!",
      });
      // Check if admin
      if (data.email === "admin@devrush.com") {
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } else {
      setTerminalLines((prev) => [
        ...prev,
        "> ERROR: Invalid credentials ✗",
        "> Please try again or reset password",
      ]);
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Matrix animation */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background">
        <MatrixRain />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <GlitchText
              text="DEV RUSH"
              className="text-6xl font-bold text-primary neon-text mb-4"
            />
            <p className="font-terminal text-xl text-muted-foreground">
              ACCESS THE MAINFRAME
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background/95">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Terminal window */}
          <div className="terminal-window">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-neon-yellow/70" />
                <div className="w-3 h-3 rounded-full bg-neon-green/70" />
              </div>
              <span className="font-terminal text-xs text-muted-foreground ml-2">
                login.sh
              </span>
            </div>

            <div className="p-6">
              {/* Terminal output */}
              <div className="mb-6 font-terminal text-sm space-y-1">
                <p className="text-accent">user@devrush:~$ ./login.sh</p>
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={
                      line.includes("granted")
                        ? "text-neon-green"
                        : line.includes("ERROR")
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} username_
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="font-terminal bg-secondary/30 border-border focus:border-primary"
                  />
                  {errors.email && (
                    <p className="font-terminal text-xs text-destructive">
                      {">"} ERROR: {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} password_
                  </Label>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="font-terminal bg-secondary/30 border-border focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="font-terminal text-xs text-destructive">
                      {">"} ERROR: {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <label
                      htmlFor="remember"
                      className="font-terminal text-xs text-muted-foreground"
                    >
                      [✓] Remember this device
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="font-terminal text-xs text-primary hover:underline"
                  >
                    --help forgot_password
                  </Link>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full font-terminal bg-primary hover:bg-primary/90 neon-glow"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" size={16} />
                  ) : (
                    "$ ./authenticate.sh"
                  )}
                </Button>

                {/* Google login */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full font-terminal border-border hover:bg-secondary/50"
                  onClick={() =>
                    toast({
                      title: "Google Auth",
                      description: "Google authentication coming soon!",
                    })
                  }
                >
                  $ auth --provider=google
                </Button>
              </form>

              {/* Demo credentials hint */}
              <div className="mt-6 p-3 rounded border border-border bg-secondary/20">
                <p className="font-terminal text-xs text-muted-foreground mb-2">
                  {">"} Demo credentials:
                </p>
                <p className="font-terminal text-xs text-accent">
                  Admin: admin@devrush.com / admin123
                </p>
              </div>

              {/* Signup link */}
              <p className="mt-6 text-center font-terminal text-sm text-muted-foreground">
                New to DevRush?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  $ ./register.sh
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
