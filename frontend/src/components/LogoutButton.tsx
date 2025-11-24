import { logout } from "../api/authApi";

export function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
    >
      Logout
    </button>
  );
}
