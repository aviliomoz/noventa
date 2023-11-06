import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";
import { SignoutButton } from "../components/sign-out-button";
import { SettingsButton } from "../components/settings-button";
import { Profile } from "../components/profile";
import { Navigation } from "../components/navigation";
import { useAuth } from "../contexts/auth-context";
import { MandatoryModal } from "../components/mandatory-modal";

export function AppLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      navigate("/auth/sign-in");
    }
  }, [pathname, session]);

  return (
    <>
      <header className="h-16 border-b border-zinc-100 px-28 flex items-center justify-between bg-white">
        <div className="flex gap-10 h-full">
          <Logo />
          <Navigation />
        </div>
        <div className="flex items-center gap-6">
          {<Profile />}
          <SettingsButton />
          <SignoutButton />
        </div>
      </header>
      <main className="relative bg-zinc-50 min-h-[calc(100vh-64px)] px-28 pt-20 flex">
        <div className="absolute bg-white h-52 w-full left-0 top-0"></div>
        <Outlet />
      </main>

      <MandatoryModal open={false}>
        <p>Prueba</p>
      </MandatoryModal>
    </>
  );
}
