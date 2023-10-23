import { Link } from "react-router-dom";
import { Logo } from "../components/logo";

export function HomePage() {
  return (
    <>
      <header className="h-16 flex items-center px-24 justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <Link to={"/auth/sign-in"} className="text-sm">
            Login
          </Link>
          <Link
            to={"/auth/sign-up"}
            className="text-sm bg-zinc-950 px-4 py-1.5 rounded-md hover:bg-zinc-900 text-zinc-50"
          >
            Sign up
          </Link>
        </div>
      </header>
    </>
  );
}
