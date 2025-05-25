import { useState } from "react";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserCog, 
  FaCalendarAlt, 
  FaSignOutAlt, 
  FaTrashAlt 
} from "react-icons/fa";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyBookings from "./MyBookings.jsx";
import ProfileSettings from "./ProfileSettings.jsx";
import useGetProfile from "../../hooks/useFetchData.js";
import { BASE_URL, token} from "../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import user from "../../assets/images/defaultUser.jpg";

const UserAccount = () => {
  const [tab, setTab] = useState("settings");
  const { dispatch } = useContext(authContext);

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.success("You have successfully logged out");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  
    if (confirmed) {
      try {
        const res = await fetch(`${BASE_URL}/users/deleteUserAccount`, {
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

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-14"
        >
          <h1 className="text-4xl font-bold mb-4 ">
            User <span className="text-purple-400">Account</span>
          </h1>
          <p className="text-white/80">
            Manage your profile, appointments, and account settings
          </p>
        </motion.div>

        {loading && !error && <Loading />}
        {error && !loading && <Error errMsg={error} />}
        
        {!error && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-4 gap-8"
          >
            {/* Sidebar Profile Section */}
            <div className="lg:col-span-1 bg-purple-900/30 border border-purple-700 rounded-xl p-8">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="w-48 h-48 rounded-full border-4 border-purple-500 overflow-hidden mb-6"
                >
                  <img
                    src={userData.photo || user}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {userData.name}
                </h3>
                <p className="text-white/80 mb-4">
                  {userData.email}
                </p>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-white/80">Blood Type:</span>
                  <span className="text-purple-400 font-bold text-xl">
                    {userData.bloodGroup}
                  </span>
                </div>
                
                <div className="w-full space-y-4">
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
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 bg-purple-900/30 border border-purple-700 rounded-xl p-8">
              {/* Tab Navigation */}
              <div className="flex mb-8 space-x-4">
                {[
                  { 
                    key: "settings", 
                    icon: <FaUserCog />, 
                    label: "Profile Settings" 
                  },
                  { 
                    key: "bookings", 
                    icon: <FaCalendarAlt />, 
                    label: "My Appointments" 
                  }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300
                      ${tab === item.key 
                        ? 'bg-purple-600 text-white' 
                        : 'text-white/80 hover:bg-purple-900/50'}
                    `}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tab === "bookings" && <MyBookings />}
                  {tab === "settings" && <ProfileSettings user={userData} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAccount;