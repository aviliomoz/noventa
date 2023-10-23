import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-md flex items-center justify-center text-zinc-50 font-medium bg-zinc-950">
        90
      </div>
      <h1 className="text-xl font-semibold">Noventa</h1>
    </Link>
  );
}
