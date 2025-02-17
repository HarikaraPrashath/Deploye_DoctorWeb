import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";
import { useAuthContext } from "../hook/UseAuthContext";

function Navbar() {
  const { user } = useAuthContext();

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (user && user.user) {
      console.log("User from AuthContext in navbar", user);
     
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <BiPlusMedical className="text-blue-500 text-3xl" />
        <span className="text-2xl font-bold text-gray-800">Medically</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 text-lg font-semibold text-gray-700">
        <li className="cursor-pointer hover:text-blue-500 transition">
          <Link to="/">Home</Link>
        </li>
        <li
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => handleScroll("about")}
        >
          About
        </li>
        <li
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => handleScroll("service")}
        >
          Services
        </li>
        <li
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => handleScroll("contact")}
        >
          Contact
        </li>
        <li className="cursor-pointer px-4 py-1 rounded-lg transition">
        {user && user.user ? (
            user.user.role === "admin" ? (
              <Link
                to="/admin"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
              >
                 Dashboard
              </Link>
            ) : (
              <Link
                to={`/profile/${user.user.id}`}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
              >
                Profile
              </Link>
            )
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
<Link to="/login">Login</Link>;
