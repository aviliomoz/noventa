import { HabitItem } from "./habit-item";

const habits: { id: number; description: string; time: string }[] = [
  { id: 1, description: "Levantarme temprano", time: "06:00 a.m." },
  { id: 2, description: "Almorzar sano", time: "06:00 a.m." },
  { id: 3, description: "Ir al gimnasio", time: "06:00 a.m." },
  { id: 4, description: "Avanzar con proyectos", time: "06:00 a.m." },
];

export function HabitsList() {
  return (
    <div className="border rounded-md bg-white shadow-sm p-8">
      <div className="flex items-center justify-between border-b pb-5 mb-8">
        <h2 className="font-medium">Habits list</h2>
        <div className="flex items-center gap-6">
          <div className="h-1.5 w-56 bg-zinc-100 rounded-full overflow-hidden relative">
            <div className="w-full h-full bg-black absolute rounded-full right-[40%]"></div>
          </div>
          <p className="text-sm">60% Completed</p>
        </div>
      </div>
      {habits.map((habit) => {
        return (
          <HabitItem
            key={habit.id}
            description={habit.description}
            time={habit.time}
          />
        );
      })}
    </div>
  );
}
