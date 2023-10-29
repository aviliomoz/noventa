import { ChevronLeft, ChevronRight } from "lucide-react";
import { HabitsList } from "../components/habits-list";
import { AddHabitButton } from "../components/add-habit-button";
import { AddSeparatorButton } from "../components/add-separator-button";

export function HabitsPage() {
  return (
    <>
      <section className="w-4/6 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3>Miércoles, 24 de Julio</h3>
            <div className="flex items-center gap-2">
              <button className="border rounded-full px-2 hover:bg-zinc-50">
                <ChevronLeft className="w-4" />
              </button>
              <button className="border rounded-full px-2 hover:bg-zinc-50">
                <ChevronRight className="w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AddHabitButton />
            <AddSeparatorButton />
          </div>
        </div>
        <HabitsList />
      </section>
      <aside className="w-2/6 z-10"></aside>
    </>
  );
}
