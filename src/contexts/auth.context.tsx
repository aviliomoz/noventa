import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";

type AuthContextType = {
  session: Session | null;
  signin: (email: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  signout: () => Promise<void>;
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
  }, []);

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
    <AuthContext.Provider value={{ session, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
