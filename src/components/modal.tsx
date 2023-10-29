import { X } from "lucide-react";

type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  onClose: () => void;
};

export function Modal({ children, open, onClose }: Props) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center bg-zinc-800 bg-opacity-20 transition-colors z-30 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`p-6 bg-white border rounded-md shadow-sm relative transition-all ${
          open ? "scale-100" : "scale-105"
        }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
