import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Session {
  token: string;
  user: User;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedSession = localStorage.getItem('auth_session');
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
        setUser(parsedSession.user);
      } catch (error) {
        console.error('Failed to parse saved session:', error);
        localStorage.removeItem('auth_session');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { error: new Error(errorData.error || 'Sign in failed') };
      }

      const data = await response.json();
      const newSession: Session = {
        token: data.token,
        user: data.user,
      };

      setSession(newSession);
      setUser(data.user);
      localStorage.setItem('auth_session', JSON.stringify(newSession));
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setSession(null);
    setUser(null);
    localStorage.removeItem('auth_session');
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signOut }}>
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
