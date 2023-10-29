import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

type Props = {
  description: string;
  time: string;
};

export function HabitItem({ description, time }: Props) {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleCheck = () => {
    setDone(!done);
  };

  return (
    <div className="flex items-center gap-6 mb-2">
      <span className="w-1/12 text-xs min-w-max text-zinc-600">{time}</span>
      <div className="flex items-center justify-between px-4 py-2 border rounded-md w-10/12">
        <span>{description}</span>
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={done}
          onChange={handleCheck}
        />
      </div>
      <button>
        <MoreHorizontal className="w-4 stroke-zinc-400 hover:stroke-zinc-600" />
      </button>
    </div>
  );
}
