import { NavLink } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  const baseClass =
    "px-3 py-1 rounded-md transition-colors font-medium";
  
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-slate-700";

  return (
    <nav className="bg-slate-800 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">

        {/* Left side: menu links */}
        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Previsão
          </NavLink>

          <NavLink
            to="/pokemon"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Pokémon API
          </NavLink>
        </div>

        {/* Right side: Logout */}
        <div>
          <LogoutButton />
        </div>

      </div>
    </nav>
  );
}
