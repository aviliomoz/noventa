import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

type AuthContextType = {
  session: Session | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
  }, [pathname]);

  const signin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data) throw new Error();

      setSession(data.session);

      navigate("/habits");
    } catch (error) {
      toast.error("Ha ocurrido un error al iniciar sesión");
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error || !data) throw new Error();

      setSession(data.session);

      navigate("/habits");
    } catch (error) {
      toast.error("Ha ocurrido un error al registrar el usuario");
    }
  };

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw new Error();

      setSession(null);

      navigate("/");
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
