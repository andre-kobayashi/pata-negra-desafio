import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { supabase } from "@/lib/customSupabaseClient";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback((session) => {
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        console.error("Auth session error:", error);
        setLoading(false);
        return;
      }

      handleSession(data.session);
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      handleSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const signUp = useCallback(
    async (email, password, options) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Falha no cadastro",
          description: error.message,
        });
      }

      return { error };
    },
    [toast]
  );

  const signIn = useCallback(
    async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Falha no login",
          description: error.message,
        });
      }

      return { error };
    },
    [toast]
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: error.message,
      });
    }

    return { error };
  }, [toast]);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !!session,
      signUp,
      signIn,
      signOut,
    }),
    [user, session, loading, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};