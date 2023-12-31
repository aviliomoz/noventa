import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { signInSchema } from "../schemas/auth-schema";
import { useAuth } from "../contexts/auth-context";

export function SignInForm() {
  const { signin } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = signInSchema.safeParse({
      email: email.length === 0 ? undefined : email,
      password: password.length === 0 ? undefined : password,
    });

    if (!validation.success)
      return toast.error(validation.error.errors[0].message);

    setLoading(true);
    await signin(validation.data.email, validation.data.password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="flex flex-col w-1/5 min-w-[300px] mt-2 items-center gap-2"
    >
      <label className="flex items-center gap-3 w-full">
        <p>Email:</p>
        <input
          className="outline-none px-2 py-0.5 border rounded-md w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex items-center gap-3 w-full">
        <p>Password:</p>
        <input
          className="outline-none px-2 py-0.5 border rounded-md w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-zinc-950 mt-2 text-zinc-50 text-sm font-medium w-full py-2 rounded-md hover:bg-zinc-900"
      >
        {loading ? "Signing in" : "Submit"}
      </button>
      <Link className="text-sm mt-4" to="/auth/sign-up">
        Do not have an account? Sign up
      </Link>
    </form>
  );
}
