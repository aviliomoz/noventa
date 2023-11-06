import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth-context";

type Day = {
  num: number;
  time: string;
  active: boolean;
};

const InitialWeek: Day[] = [
  { num: 0, time: "00:00", active: false },
  { num: 1, time: "00:00", active: false },
  { num: 2, time: "00:00", active: false },
  { num: 3, time: "00:00", active: false },
  { num: 4, time: "00:00", active: false },
  { num: 5, time: "00:00", active: false },
  { num: 6, time: "00:00", active: false },
];

const days: string[] = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function AddHabitForm() {
  const { session } = useAuth();

  const [description, setDescription] = useState<string>("");
  const [week, setWeek] = useState<Day[]>(InitialWeek);

  const updateClickedDay = (num: number): Day[] => {
    return week.map((day) => {
      if (day.num === num) {
        day.active = !day.active;
        return day;
      } else {
        return day;
      }
    });
  };

  const updateDayTime = (num: number, time: string): Day[] => {
    return week.map((day) => {
      if (day.num === num) {
        day.time = time;
        return day;
      } else {
        return day;
      }
    });
  };

  const saveHabit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session) {
      const { error } = await supabase.from("habits").insert({
        description,
        user_id: session.user.id,
      });
    }
  };

  return (
    <form onSubmit={saveHabit}>
      <h2 className="border-b pb-2 mb-4 font-medium">Nuevo hábito</h2>
      <label className="flex items-center gap-4">
        <span>Descripción:</span>
        <input
          type="text"
          className="border rounded-md px-2 py-1 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <div className="flex flex-col border rounded-md mt-8 p-6 relative gap-1 mb-4">
        <h3 className="mx-auto absolute -top-4 p-1 bg-white">
          Días de la semana
        </h3>
        {week.map((day) => {
          return (
            <div key={day.num} className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={day.active}
                onChange={() => setWeek(updateClickedDay(day.num))}
              />
              <span>{days[day.num]}</span>
              {day.active && (
                <input
                  type="time"
                  value={day.time}
                  onChange={(e) =>
                    setWeek(updateDayTime(day.num, e.target.value))
                  }
                />
              )}
            </div>
          );
        })}
      </div>
      <button type="submit">Guardar hábito</button>
    </form>
  );
}
