type Props = {
  children: JSX.Element | JSX.Element[];
  open: boolean;
};

export function MandatoryModal({ children, open }: Props) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-zinc-800 bg-opacity-20 transition-colors z-30 ${
        open ? "visible" : "invisible"
      }`}
    >
      <div
        className={`p-6 bg-white border rounded-md shadow-sm relative transition-all ${
          open ? "scale-100" : "scale-105"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
