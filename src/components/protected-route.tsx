import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth-context";
import LoginPage from "./login-page";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
        <p className="text-lg font-medium text-slate-700">Loading...</p>
      </div>
    </div>
  );
}
