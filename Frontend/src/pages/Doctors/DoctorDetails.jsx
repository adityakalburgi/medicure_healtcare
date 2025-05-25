import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserMd, 
  FaStar, 
  FaInfoCircle, 
  FaCommentMedical, 
  FaCalendarCheck 
} from "react-icons/fa";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config.js"
import Error from "../../components/Error/Error.jsx"
import Loader from "../../components/Loader/Loading.jsx"
import useFetchData from '../../hooks/useFetchData.js'
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`)

  const [tab, setTab] = useState("about");

  const tabItems = [
    { 
      key: "about", 
      icon: <FaInfoCircle />, 
      label: "About" 
    },
    { 
      key: "feedback", 
      icon: <FaCommentMedical />, 
      label: "Feedback" 
    }
  ];

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (!doctor) return null;

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Doctor Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {/* Doctor Image and Basic Info */}
          <div className="md:col-span-2 flex items-center space-x-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500"
            >
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="space-y-4">
              <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm inline-block">
                {doctor.specialization}
              </span>
              
              <h1 className="text-3xl font-bold text-white">
                Dr. {doctor.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src={starIcon} alt="Rating" className="w-6 h-6" />
                  <span className="text-white font-semibold">
                    {doctor.averageRating}
                    <span className="text-white/60 ml-2">
                      ({doctor.totalRating} reviews)
                    </span>
                  </span>
                </div>
              </div>
              
              <p className="text-white/80 max-w-xl">
                {doctor.bio}
              </p>
            </div>
          </div>

          {/* Side Panel */}
          <div className="md:col-span-1">
            <SidePanel 
              doctorId={doctor._id} 
              ticketPrice={doctor.ticketPrice} 
              timeSlots={doctor.timeSlots}
            />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-purple-900/30 border border-purple-700 rounded-full p-2 flex space-x-2">
            {tabItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-full transition duration-300
                  ${tab === item.key 
                    ? 'bg-purple-600 text-white' 
                    : 'text-white/80 hover:bg-purple-900/50'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
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
            {tab === "about" && (
              <DoctorAbout 
                name={doctor.name} 
                about={doctor.about} 
                qualifications={doctor.qualifications} 
                experiences={doctor.experiences}
              />
            )}
            {tab === "feedback" && (
              <Feedback 
                reviews={doctor.reviews} 
                totalRating={doctor.totalRating}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DoctorDetails;