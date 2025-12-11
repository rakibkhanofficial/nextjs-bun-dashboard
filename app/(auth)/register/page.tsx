"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // API call to register user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Registration response:", data);
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Success toast
      toast({
        title: "Account created!",
        description:
          "Your account has been successfully created. Please sign in.",
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        newsletter: true,
      });

      // Redirect to login page
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleCheckboxChange =
    (name: keyof typeof formData) => (checked: boolean) => {
      setFormData({
        ...formData,
        [name]: checked,
      });
    };

  // Handle social login
  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: `Unable to sign in with ${provider}. Please try again.`,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-gray-200";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const strength = passwordStrength(formData.password);
  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"][
    strength
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] flex flex-col">
        <CardHeader className="space-y-1 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your details to create your dashboard account
              </CardDescription>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icons.user className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>

        {/* Scrollable content area */}
        <CardContent className="flex-1 overflow-y-auto space-y-4 pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icons.user className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icons.mail className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icons.lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator - Collapsible */}
              {formData.password && (
                <div className="mt-2 p-3 bg-muted/30 rounded-lg space-y-2 border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Password strength
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        strength === 0
                          ? "text-red-600"
                          : strength === 1
                          ? "text-red-500"
                          : strength === 2
                          ? "text-orange-500"
                          : strength === 3
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {strengthText}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor(
                        strength
                      )} transition-all duration-300`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Check
                        className={`h-3 w-3 ${
                          formData.password.length >= 8
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check
                        className={`h-3 w-3 ${
                          /[A-Z]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      <span>Uppercase</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check
                        className={`h-3 w-3 ${
                          /[0-9]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      <span>Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check
                        className={`h-3 w-3 ${
                          /[^A-Za-z0-9]/.test(formData.password)
                            ? "text-green-500"
                            : "text-gray-300"
                        }`}
                      />
                      <span>Special char</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Icons.lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Checkboxes - Compact layout */}
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange("acceptTerms")}
                  className="mt-1 flex-shrink-0"
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-xs font-normal cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={handleCheckboxChange("newsletter")}
                  className="mt-1 flex-shrink-0"
                />
                <Label
                  htmlFor="newsletter"
                  className="text-xs font-normal cursor-pointer leading-relaxed"
                >
                  Subscribe to our newsletter for updates and tips
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="w-full text-sm"
            >
              <Icons.google className="mr-2 h-3 w-3" />
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
              className="w-full text-sm"
            >
              <Icons.github className="mr-2 h-3 w-3" />
              GitHub
            </Button>
          </div>

          {/* Already have account */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>

        {/* Fixed Footer - Always at bottom, no overlap */}
        <CardFooter className="border-t pt-3 mt-2 flex flex-col space-y-1 flex-shrink-0">
          <div className="text-xs text-muted-foreground text-center">
            <p>
              By creating an account, you agree to receive occasional product
              updates.
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Icons.shield className="h-3 w-3" />
            <span>Your data is protected</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
