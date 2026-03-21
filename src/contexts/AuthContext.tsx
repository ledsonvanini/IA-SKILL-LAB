"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "manager" | "customer";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  unitId?: string; // Para gerentes vinculados a uma loja específica
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const MOCK_PROFILES: Record<UserRole, UserProfile> = {
  admin: {
    id: "mock-admin-999",
    name: "Paula (Agência)",
    email: "paula@agenciameta21.com.br",
    role: "admin",
    avatarUrl: "https://i.pravatar.cc/150?u=paula",
  },
  manager: {
    id: "mock-manager-111",
    name: "Roberto (Gerente Loja Centro)",
    email: "roberto.centro@meta21.com.br",
    role: "manager",
    unitId: "unit-centro-01",
    avatarUrl: "https://i.pravatar.cc/150?u=roberto",
  },
  customer: {
    id: "mock-customer-555",
    name: "Carla Silva",
    email: "carla.silva@email.com",
    role: "customer",
    avatarUrl: "https://i.pravatar.cc/150?u=carla",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("@meta21:mock_user");
      if (stored) {
        setUser(JSON.parse(stored) as UserProfile);
      }
    } catch (e) {
      console.error("Failed to load user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAs = (role: UserRole) => {
    const profile = MOCK_PROFILES[role];
    setUser(profile);
    localStorage.setItem("@meta21:mock_user", JSON.stringify(profile));

    // Redirecionamento condicional baseado no papel
    if (role === "admin" || role === "manager") {
      router.push("/admin");
    } else if (role === "customer") {
      router.push("/area-do-cliente");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@meta21:mock_user");
    router.push("/");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginAs,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
