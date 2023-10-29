import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { signUpSchema } from "../schemas/auth-schema";
import { useAuth } from "../contexts/auth-context";

export function SignUpForm() {
  const { signup } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = signUpSchema.safeParse({
      email: email.length === 0 ? undefined : email,
    });

    if (!validation.success)
      return toast.error(validation.error.errors[0].message);

    setLoading(true);
    await signup(validation.data.email);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSignUp}
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
      <button
        type="submit"
        disabled={loading}
        className="bg-zinc-950 mt-2 text-zinc-50 text-sm font-medium w-full py-2 rounded-md hover:bg-zinc-900"
      >
        {loading ? "Signing up new user" : "Submit"}
      </button>
      <Link className="text-sm mt-4" to="/auth/sign-in">
        Already have an account? Sign in
      </Link>
    </form>
  );
}
