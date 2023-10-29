import { NavLink } from "react-router-dom";

const links: { name: string; path: string }[] = [
  { name: "Habits", path: "/habits" },
  { name: "Progress", path: "/progress" },
];

export function Navigation() {
  return (
    <nav className="h-full flex">
      {links.map((link, index) => {
        return (
          <NavLink
            className={({ isActive }) => {
              return `h-full px-6 flex items-center ${
                isActive ? "font-medium border-b-2 border-b-zinc-900" : ""
              }`;
            }}
            to={link.path}
            key={index}
          >
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
