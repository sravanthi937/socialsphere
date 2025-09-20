import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">SocialSphere</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to={`/profile/${user._id}`}>{user.name}</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
