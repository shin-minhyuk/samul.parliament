"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  userProfile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return profile;
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // 3초 타임아웃
          const timeout = setTimeout(() => {
            supabase.auth.signOut();
            setUserProfile(null);
            setLoading(false);
          }, 3000);

          try {
            const profile = await getUserProfile(session.user.id);
            clearTimeout(timeout);
            setUserProfile(profile);
          } catch {
            clearTimeout(timeout);
            await supabase.auth.signOut();
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
        } catch {
          await supabase.auth.signOut();
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        loading,
        isAdmin: userProfile?.role === "admin",
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
