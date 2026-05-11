'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, MockUser, MOCK_USERS } from '@/lib/mock-data';

interface AuthContextType {
  user: MockUser | null;
  login: (id: string | MockUser) => boolean;
  logout: () => void;
  updateLinguisticProfile: (motherLang: string | null, targetLang?: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // Check localStorage for user on mount
    const stoblueUser = localStorage.getItem('user');
    if (stoblueUser) {
      try {
        setUser(JSON.parse(stoblueUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: string | MockUser) => {
    let foundUser: MockUser | undefined;
    if (typeof userData === 'string') {
      foundUser = MOCK_USERS.find(u => u.id === userData);
    } else {
      foundUser = userData;
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateLinguisticProfile = (motherLang: string | null, targetLang?: string | null) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        motherLang: motherLang || user.motherLang,
        targetLang: targetLang !== undefined ? targetLang : user.targetLang 
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLinguisticProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRole() {
  const { user } = useAuth();
  return user?.role;
}

