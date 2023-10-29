import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export function AuthButtons() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <></>;

  if (!session)
    return (
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
    );

  return (
    <Link
      to={"/habits"}
      className="text-sm bg-zinc-950 px-4 py-1.5 rounded-md hover:bg-zinc-900 text-zinc-50"
    >
      Go to dashboard
    </Link>
  );
}
