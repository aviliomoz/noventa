import { Logo } from "../components/logo";
import { AuthButtons } from "../components/auth-buttons";

export function HomePage() {
  return (
    <>
      <header className="h-16 flex items-center px-28 justify-between">
        <Logo />
        <AuthButtons />
      </header>
    </>
  );
}
