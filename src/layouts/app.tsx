import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";
import { supabase } from "../lib/supabase";
import { Settings } from "lucide-react";
import { SignoutButton } from "../components/sign-out-button";

export function AppLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!session) {
          navigate("/auth/sign-in");
        }
      })
      .finally(() => setLoading(false));
  }, [pathname]);

  if (loading) return <></>;

  return (
    <>
      <header className="h-16 border-b border-zinc-100 px-24 flex items-center justify-between bg-white">
        <div>
          <Logo />
          <nav></nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <picture className="bg-pink-200 w-8 h-8 rounded-full flex items-center justify-center p-1 relative">
              <img src="/person.webp" alt="profile pic" />
            </picture>
            <span>Avilio Muñoz</span>
          </div>
          <button className="border p-1 flex items-center justify-center w-7 h-7 rounded-md hover:bg-zinc-50">
            <Settings />
          </button>
          <SignoutButton />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
