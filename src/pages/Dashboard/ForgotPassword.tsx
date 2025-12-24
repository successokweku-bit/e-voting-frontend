import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd, ArrowLeft, Mail, KeyRound, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { requestPasswordReset, resetPassword } from "@/services/miscService";

type Step = "email" | "token" | "success";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1: Request Reset Token
  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      toast.success("Reset code sent to your email!");
      setStep("token");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send reset code";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset Password with Token
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error("Please enter the reset code from your email");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({ token, new_password: newPassword });
      toast.success("Password reset successfully!");
      setStep("success");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to reset password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend Token
  const handleResendToken = async () => {
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      toast.success("A new reset code has been sent!");
      setToken("");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to resend code";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Voter App
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* Step 1: Enter Email */}
            {step === "email" && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto h-12 w-12 rounded-full bg-[#134E4A]/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-[#134E4A]" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                  <CardDescription className="text-base">
                    No worries! Enter your email address and we'll send you a reset code.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRequestToken} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11"
                        disabled={isLoading}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-[#134E4A] hover:bg-[#134E4A]/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Code"
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => navigate("/login")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Token and New Password */}
            {step === "token" && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto h-12 w-12 rounded-full bg-[#134E4A]/10 flex items-center justify-center mb-4">
                    <KeyRound className="h-6 w-6 text-[#134E4A]" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
                  <CardDescription className="text-base">
                    We sent a reset code to <span className="font-medium text-slate-700">{email}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleResetPassword} className="space-y-5">
                    {/* Token Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        Reset Code
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter reset code from email"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="h-11 font-mono"
                        disabled={isLoading}
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="h-11 pr-20"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Confirm Password
                      </label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-11"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Requirements */}
                    <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1">
                      <p className="font-medium">Password must:</p>
                      <ul className="space-y-0.5">
                        <li className={newPassword.length >= 8 ? "text-green-600" : ""}>
                          • Be at least 8 characters long
                        </li>
                        <li className={newPassword === confirmPassword && newPassword.length > 0 ? "text-green-600" : ""}>
                          • Match the confirmation
                        </li>
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 bg-[#134E4A] hover:bg-[#134E4A]/90"
                      disabled={isLoading || !token.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>

                    <div className="text-center text-sm text-slate-500">
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        className="text-[#134E4A] font-medium hover:underline disabled:opacity-50"
                        onClick={handleResendToken}
                        disabled={isLoading}
                      >
                        Resend
                      </button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setStep("email")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Use a different email
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700">Password Reset!</CardTitle>
                  <CardDescription className="text-base">
                    Your password has been successfully reset. You can now log in with your new password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    className="w-full h-11 bg-[#134E4A] hover:bg-[#134E4A]/90"
                    onClick={() => navigate("/login")}
                  >
                    Go to Login
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/bg-img.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
