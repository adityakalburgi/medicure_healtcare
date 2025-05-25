import { useState } from "react";
import { MdError, MdVerified } from "react-icons/md";
import { FaUserMd, FaCalendarCheck, FaUserCog } from "react-icons/fa";
import Loader from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import useGetProfile from "../../hooks/useFetchData.js";
import { BASE_URL } from "../../config.js";
import Tabs from "./Tabs.jsx";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout.jsx";
import Profile from "./Profile.jsx";
import Appointments from "./Appointments.jsx";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");

  const renderApprovalStatus = () => {
    if (data.isApproved === "pending") {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-900/30 border border-yellow-700 text-yellow-400 p-4 rounded-xl mb-6 flex items-center"
        >
          <MdError className="mr-3 w-6 h-6" />
          <p>
            To get approval, please complete your profile. We'll review manually and approve within 3 days.
          </p>
        </motion.div>
      );
    }

    if (data.isApproved === "rejected") {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-700 text-red-400 p-4 rounded-xl mb-6 flex items-center"
        >
          <MdError className="mr-3 w-6 h-6" />
          <p>
            Your profile has been rejected. Please review and update your information.
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-900/30 border border-green-700 text-green-400 p-4 rounded-xl mb-6 flex items-center"
      >
        <MdVerified className="mr-3 w-6 h-6" />
        <p>
          Your profile is approved and verified.
        </p>
      </motion.div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center items-center mb-4">
            <FaUserMd className="text-purple-400 w-10 h-10 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Doctor <span className="text-purple-400">Dashboard</span>
            </h2>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Manage your professional profile, appointments, and medical information.
          </p>
        </motion.div>

        {loading && !error && <Loader />}
        {error && !loading && <Error errMsg={error}/>}
        
        {!loading && !error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid lg:grid-cols-4 gap-8"
          >
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1 bg-purple-900/30 border border-purple-700 rounded-xl p-6">
              <Tabs tab={tab} setTab={setTab} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 bg-purple-900/30 border border-purple-700 rounded-xl p-8">
              {renderApprovalStatus()}

              <div>
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-8 mb-10 flex-col md:flex-row">
                      <motion.figure 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500"
                      >
                        <img 
                          src={data.photo} 
                          alt="Doctor Profile" 
                          className="w-full h-full object-cover"
                        />
                      </motion.figure>
                      
                      <div>
                        <span className="bg-purple-600 text-white py-1 px-4 rounded text-sm font-semibold mb-4 inline-block">
                          {data.specialization}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          Dr. {data.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <img src={starIcon} alt="Rating" className="w-6 h-6" />
                          <span className="text-white font-semibold">
                            {data.averageRating} 
                            <span className="text-white/60 ml-2">
                              ({data.totalRating} reviews)
                            </span>
                          </span>
                        </div>
                        
                        <p className="text-white/80 max-w-xl">
                          {data.bio}
                        </p>
                      </div>
                    </div>
                    
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                
                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "profile" && <Profile doctorData={data} />}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;