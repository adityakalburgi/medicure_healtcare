/* eslint-disable react/prop-types */
import { useContext, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaUserEdit, 
  FaSignOutAlt, 
  FaTrashAlt, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config.js";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const newRef = useRef(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.success("You have successfully logged out");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
    if (confirmed) {
      try {
        const res = await fetch(`${BASE_URL}/doctors/deleteAccount`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
  
        const result = await res.json();
  
        if (!res.ok) {
          throw new Error(result.message);
        }
  
        dispatch({ type: "LOGOUT" });
        navigate("/home");
        toast.success("Your account has been successfully deleted");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.info("Account deletion canceled");
    }
  };
  
  const toggle = () => {
    setMenu(!menu);
    newRef.current.classList.toggle("show_options");
  }

  const tabItems = [
    { 
      key: "overview", 
      icon: <FaUser />, 
      label: "Overview" 
    },
    { 
      key: "appointments", 
      icon: <FaCalendarAlt />, 
      label: "Appointments" 
    },
    { 
      key: "profile", 
      icon: <FaUserEdit />, 
      label: "Profile" 
    }
  ];

  return (
    <div className="relative">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden absolute top-0 right-0 z-50">
        <button 
          onClick={toggle} 
          className="text-white p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300"
        >
          {!menu ? <FaBars className="w-6 h-6" /> : <FaTimes className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.div 
        ref={newRef}
        initial={{ opacity: 0, x: -100 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          transition: { 
            duration: 0.3,
            type: "spring",
            stiffness: 120 
          }
        }}
        className={`
          fixed lg:static top-0 left-0 w-64 lg:w-full h-full lg:h-auto 
          bg-black border-r border-purple-800 lg:border-none 
          transform transition-transform duration-300 z-40
          ${menu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 h-full flex flex-col">
          {/* Tab Navigation */}
          <nav className="space-y-4 flex-grow">
            {tabItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setTab(item.key);
                  // Close mobile menu
                  if (window.innerWidth < 1024) toggle();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300
                  ${tab === item.key 
                    ? 'bg-purple-600 text-white' 
                    : 'text-white/80 hover:bg-purple-900/50'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="mt-auto space-y-4">
            <button
              onClick={handleLogout}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg transition duration-300"
            >
              <FaSignOutAlt /> Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg transition duration-300"
            >
              <FaTrashAlt /> Delete Account
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {menu && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30" 
          onClick={toggle}
        />
      )}
    </div>
  );
};

export default Tabs;