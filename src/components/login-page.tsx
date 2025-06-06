import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, User, AlertCircle, Languages } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/hooks/use-translate";
import { useLanguage } from "@/hooks/use-language";

export default function LoginPage() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-end mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLanguage(language === "vi" ? "zh" : "vi");
              }}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white hover:text-white"
            >
              <Languages className="w-4 h-4" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold">
            {t("Employee Management")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">{t("Username")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  placeholder={t("Enter username")}
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("Password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t("Enter password")}
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? t("Logging in...") : t("Login")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-600">
          <p>{t("Default login information:")}</p>
          <p>
            <strong>{t("Username:")}</strong> admin |{" "}
            <strong>{t("Password:")}</strong> admin123
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
