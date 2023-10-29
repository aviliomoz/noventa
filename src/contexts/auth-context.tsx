import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";

type Profile = {
  id: string;
  name: string;
};

type AuthContextType = {
  session: Session | null | undefined;
  profile: Profile | null | undefined;
  signin: (email: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  signout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Error al obtener el Auth Context");

  return context;
};

type ProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [session, setSession] = useState<Session | null | undefined>();
  const [profile, setProfile] = useState<Profile | null | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) {
      supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id)
        .single()
        .then(({ data }) => setProfile(data));
    }
  }, [session]);

  useEffect(() => {
    if (session !== undefined && profile !== undefined) setLoading(false);
  }, [session, profile]);

  const signin = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw new Error();

      toast.success("Se ha enviado un enlace de inicio de sesión a tu correo");
    } catch (error) {
      toast.error("Ha ocurrido un error al iniciar sesión");
    }
  };

  const signup = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) throw new Error();

      toast.success("Se ha enviado un enlace de inicio de sesión a tu correo");
    } catch (error) {
      toast.error("Ha ocurrido un error al iniciar sesión");
    }
  };

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error();

      toast.success("Se ha cerrado tu sesión");
    } catch (error) {
      toast.error("Ha ocurrido un error al cerrar sesión");
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, profile, signin, signup, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
