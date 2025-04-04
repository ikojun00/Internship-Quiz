import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
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

        const payload = JSON.parse(jsonPayload);
        setUser({
          id: payload.sub,
          username: payload.username,
          role: payload.role,
        });
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { access_token } = response.data;

      localStorage.setItem("access_token", access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

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
      toast.error(error.response?.data?.message);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);

    toast.info("Logged out.");
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
