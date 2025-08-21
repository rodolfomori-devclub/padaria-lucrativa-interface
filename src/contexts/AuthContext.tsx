/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authService } from "~/services/auth";
import type { AuthResponse } from "~/types/auth";
import { PlanType } from "~/types/plan";
import type { User } from "~/types/user";

interface AuthState {
  user: User | null;
  isProUser: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (data: AuthResponse) => void;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isProUser: false,
    isLoading: true,
    isInitialized: false,
    error: null,
  });

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  const login = useCallback((data: AuthResponse) => {
    localStorage.setItem("token", data.token);
    const isProUser = data.user.plan?.type === PlanType.PRO;
    setAuthState({
      user: data.user,
      isProUser,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthState({
      user: null,
      isProUser: false,
      isLoading: false,
      isInitialized: true,
      error: null,
    });
  }, []);

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        isInitialized: true,
      }));
      return;
    }

    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const user = await authService.me();

      setAuthState({
        user,
        isProUser: user.plan?.type === PlanType.PRO,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    } catch (error) {
      // Invalid token or network error - clear it and logout
      localStorage.removeItem("token");
      setAuthState({
        user: null,
        isProUser: false,
        isLoading: false,
        isInitialized: true,
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    }
  }, []);

  // Initialize authentication on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const value: AuthContextValue = {
    ...authState,
    login,
    logout,
    clearError,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
