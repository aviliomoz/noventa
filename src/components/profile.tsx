export function Profile() {
  return (
    <div className="flex items-center gap-2">
      <picture className="bg-pink-200 w-8 h-8 rounded-full flex items-center justify-center p-1 relative">
        <img src="/person.webp" alt="profile pic" />
      </picture>
      <span>Avilio Muñoz</span>
    </div>
  );
}
