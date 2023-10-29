import { useState } from "react";
import { useAuth } from "../contexts/auth-context";

export function SignoutButton() {
  const { signout } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);
    await signout();
    setLoading(true);
  };

  return (
    <button
      onClick={handleSignout}
      disabled={loading}
      className="text-sm border h-7 flex items-center justify-center px-4 rounded-md hover:bg-zinc-50"
    >
      Logout
    </button>
  );
}
