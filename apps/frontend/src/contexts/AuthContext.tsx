import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "sonner";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

interface TokenPayload {
  sub: number;
  username: string;
  role: "ADMIN" | "USER";
  exp: number;
  iat: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = (): string | null => {
    return localStorage.getItem("access_token");
  };

  const setToken = (token: string): void => {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const clearToken = (): void => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const decodeToken = (token: string): TokenPayload | null => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const isTokenExpired = (payload: TokenPayload): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= currentTime;
  };

  const isTokenExpiringSoon = (
    payload: TokenPayload,
    thresholdSeconds = 300
  ): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp - currentTime < thresholdSeconds;
  };

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    toast.info("Logged out.");
  }, []);

  const validateToken = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return false;
    }

    try {
      const payload = decodeToken(token);

      if (!payload) {
        logout();
        toast.error("Invalid session. Please log in again.");
        setIsLoading(false);
        return false;
      }

      if (isTokenExpired(payload)) {
        logout();
        toast.error("Your session has expired. Please log in again.");
        setIsLoading(false);
        return false;
      }

      setUser({
        id: payload.sub,
        username: payload.username,
        role: payload.role,
      });
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      logout();
      setIsLoading(false);
      return false;
    }
  }, [logout]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, [validateToken]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.message;
          const isTokenError = errorMessage === "Invalid token.";
          if (isTokenError && user) {
            logout();
            toast.error("Your session has expired. Please log in again.");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [user, logout]);

  useEffect(() => {
    if (!user) return;

    const checkTokenExpiration = () => {
      const token = getToken();
      if (!token) return;

      const payload = decodeToken(token);
      if (!payload) return;

      if (isTokenExpired(payload)) {
        logout();
        toast.error("Your session has expired. Please log in again.");
      } else if (isTokenExpiringSoon(payload)) {
        toast.warning("Your session will expire soon.");
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [user, logout]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { access_token } = response.data;
      setToken(access_token);

      await validateToken();
      toast.success("Login successful");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (username: string, password: string, role: string) => {
    try {
      await axios.post("/api/auth/register", { username, password, role });
      toast.success("Registration successful. Please sign in.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
