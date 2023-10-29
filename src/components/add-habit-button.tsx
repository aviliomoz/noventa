import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "./modal";
import { AddHabitForm } from "./add-habit-form";

export function AddHabitButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="border rounded-md px-3 py-0.5 text-sm bg-white flex items-center gap-2 hover:bg-zinc-50"
      >
        <Plus className="w-4" /> <span>Add habit</span>
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <AddHabitForm />
      </Modal>
    </>
  );
}
