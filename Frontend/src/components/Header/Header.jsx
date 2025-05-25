import { useState } from "react";
import { useRef, useContext } from "react";
import userImg from "../../assets/images/defaultUser.jpg";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const [menuStatus, setMenuStatus] = useState(false);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
    menuRef.current.classList.toggle("show_menu");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link to="/Home">
            <h1 className="text-white text-2xl font-bold">Medicure</h1>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav 
            className={`fixed top-0 right-0 w-64 md:w-auto md:static bg-black/90 md:bg-transparent h-full md:h-auto transform transition-transform duration-300 ease-in-out ${
              menuStatus ? 'translate-x-0' : 'translate-x-full'
            } md:translate-x-0`}
            ref={menuRef}
          >
            <ul className="flex flex-col md:flex-row items-center justify-center md:justify-start h-full md:h-auto gap-6 md:gap-8 p-8 md:p-0">
              {navLinks.map((link, idx) => (
                <li key={idx} className="w-full md:w-auto text-center">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      text-lg font-medium 
                      ${isActive 
                        ? 'text-purple-400' 
                        : 'text-white hover:text-purple-400'
                      } 
                      transition duration-300
                    `}
                    onClick={() => {
                      if (window.innerWidth < 768) toggleMenu();
                    }}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {token && user ? (
              <Link
                to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`}
                className="flex items-center space-x-2 group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 group-hover:border-purple-400 transition duration-300">
                  <img
                    src={user?.photo || userImg}
                    alt="Profile"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                  />
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {!menuStatus ? (
                <BiMenu className="w-8 h-8 text-purple-400" />
              ) : (
                <BiX className="w-8 h-8 text-purple-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuStatus && (
        <div 
          className="fixed inset-0 bg-black/70 md:hidden z-40" 
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;