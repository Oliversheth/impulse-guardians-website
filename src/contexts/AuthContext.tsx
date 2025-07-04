
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
  getCurrentStreak: () => Promise<number>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Streak tracking functionality integrated directly
  const recordTodaysLogin = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];

    try {
      const { data: existingLogin } = await (supabase as any)
        .from('user_login_streaks')
        .select('*')
        .eq('user_id', userId)
        .eq('login_date', today)
        .maybeSingle();

      if (!existingLogin) {
        await (supabase as any)
          .from('user_login_streaks')
          .insert({
            user_id: userId,
            login_date: today
          });
      }
    } catch (error) {
      console.error('Error recording login:', error);
    }
  };

  const getCurrentStreak = async (): Promise<number> => {
    if (!user) return 0;

    try {
      const { data: logins } = await (supabase as any)
        .from('user_login_streaks')
        .select('*')
        .eq('user_id', user.id)
        .order('login_date', { ascending: false });

      if (!logins || logins.length === 0) return 0;

      let streak = 0;
      const today = new Date();
      
      for (let i = 0; i < logins.length; i++) {
        const loginDate = new Date(logins[i].login_date + 'T00:00:00');
        const expectedDate = new Date(today);
        expectedDate.setDate(today.getDate() - i);
        
        const loginDateStr = loginDate.toISOString().split('T')[0];
        const expectedDateStr = expectedDate.toISOString().split('T')[0];
        
        if (loginDateStr === expectedDateStr) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
        
        // Record today's login for streak tracking
        recordTodaysLogin(session.user.id);
      }
    });

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // If user is already logged in, record today's login
      if (session?.user) {
        recordTodaysLogin(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        let errorMessage = 'Failed to sign in';
        
        if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else {
          errorMessage = error.message;
        }
        
        toast({
          title: "Sign In Failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        return { error: errorMessage };
      }

      return { error: undefined };
    } catch (error) {
      console.error('Unexpected login error:', error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast({
        title: "Sign In Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Failed to create account';
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else {
          errorMessage = error.message;
        }
        
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
        
        return { error: errorMessage };
      }

      if (data.user && !data.session) {
        toast({
          title: "Account Created!",
          description: "Please check your email and click the confirmation link to complete your registration.",
        });
      }

      return { error: undefined };
    } catch (error) {
      console.error('Unexpected registration error:', error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      console.error('Unexpected logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!session,
        login,
        register,
        logout,
        loading,
        getCurrentStreak
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
