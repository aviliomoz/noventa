import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";
import { useAuth } from "../contexts/auth-context";

const titles: {
  path: string;
  name: string;
}[] = [
  {
    path: "/auth/sign-in",
    name: "Login",
  },
  {
    path: "/auth/sign-up",
    name: "Create account",
  },
  {
    path: "/auth/reset-password",
    name: "Reset Password",
  },
];

export function AuthLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) {
      navigate("/habits");
    }
  }, [pathname]);

  if (loading) return <></>;

  return (
    <>
      <header className="flex justify-center items-center h-40 mb-4">
        <Logo />
      </header>
      <main className="flex flex-col gap-4 items-center">
        <h2 className="font-semibold text-xl">
          {titles.find((title) => pathname === title.path)?.name}
        </h2>
        <Outlet />
      </main>
    </>
  );
}
