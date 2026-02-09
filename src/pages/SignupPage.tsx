import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import MatrixRain from "@/components/effects/MatrixRain";
import GlitchText from "@/components/effects/GlitchText";
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

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address").max(255),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    college: z.string().min(2, "College name is required").max(200),
    yearOfStudy: z.string().min(1, "Select your year of study"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Initializing registration protocol...",
    "> Please enter your credentials",
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data: SignupFormData) => {
    setTerminalLines((prev) => [...prev, "> Processing registration..."]);

    const success = await signup({
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      college: data.college,
      yearOfStudy: data.yearOfStudy,
    });

    if (success) {
      setTerminalLines((prev) => [
        ...prev,
        "> Creating account...",
        "> SUCCESS: Account created ✓",
      ]);
      toast({
        title: "Registration Successful",
        description: "Welcome to DevRush 2.0!",
      });
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setTerminalLines((prev) => [
        ...prev,
        "> ERROR: Email already exists ✗",
      ]);
      toast({
        title: "Registration Failed",
        description: "Email already exists. Please login instead.",
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
              JOIN THE REVOLUTION
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
                register.sh
              </span>
            </div>

            <div className="p-6">
              {/* Terminal output */}
              <div className="mb-6 font-terminal text-sm space-y-1">
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={
                      line.includes("SUCCESS")
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
                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} full_name
                  </Label>
                  <Input
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="font-terminal bg-secondary/30 border-border focus:border-primary"
                  />
                  {errors.fullName && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} email
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="font-terminal bg-secondary/30 border-border focus:border-primary"
                  />
                  {errors.email && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} phone
                  </Label>
                  <Input
                    {...register("phone")}
                    placeholder="+91 9876543210"
                    className="font-terminal bg-secondary/30 border-border focus:border-primary"
                  />
                  {errors.phone && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* College */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} college
                  </Label>
                  <Input
                    {...register("college")}
                    placeholder="Dayananda Sagar College of Engineering"
                    className="font-terminal bg-secondary/30 border-border focus:border-primary"
                  />
                  {errors.college && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.college.message}
                    </p>
                  )}
                </div>

                {/* Year of Study */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} year_of_study
                  </Label>
                  <Select onValueChange={(value) => setValue("yearOfStudy", value)}>
                    <SelectTrigger className="font-terminal bg-secondary/30 border-border">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="5th">5th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.yearOfStudy && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.yearOfStudy.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} password
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
                  {/* Password strength meter */}
                  {password && (
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            passwordStrength >= level
                              ? level <= 1
                                ? "bg-destructive"
                                : level <= 2
                                ? "bg-neon-yellow"
                                : "bg-neon-green"
                              : "bg-secondary"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {errors.password && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label className="font-terminal text-xs text-muted-foreground">
                    {">"} confirm_password
                  </Label>
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="font-terminal bg-secondary/30 border-border focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="font-terminal text-xs text-destructive flex items-center gap-1">
                      <XCircle size={12} /> {errors.confirmPassword.message}
                    </p>
                  )}
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
                    "$ ./submit_registration.sh"
                  )}
                </Button>
              </form>

              {/* Login link */}
              <p className="mt-6 text-center font-terminal text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  $ ./login.sh
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
