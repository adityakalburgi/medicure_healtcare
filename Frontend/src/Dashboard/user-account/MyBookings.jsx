import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarCheck, FaNotesMedical } from "react-icons/fa";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error.jsx";

const MyBookings = () => {
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <FaCalendarCheck className="text-purple-400 w-10 h-10 mr-3" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              My <span className="text-purple-400">Appointments</span>
            </h1>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            View and manage your scheduled medical consultations and appointments.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && !error && (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        )}

        {/* Error State */}
        {error && !loading && <Error errMsg={error} />}

        {/* Appointments Content */}
        <AnimatePresence>
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {doctors.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {doctors.map((doctor) => (
                    <motion.div
                      key={doctor._id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          transition: { duration: 0.3 }
                        }
                      }}
                    >
                      <DoctorCard doctor={doctor} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center bg-purple-900/30 border border-purple-700 rounded-xl p-12"
                >
                  <div className="flex justify-center mb-6">
                    <FaNotesMedical className="text-purple-400 w-16 h-16" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    No Appointments Yet
                  </h2>
                  <p className="text-white/80 mb-6">
                    You haven't scheduled any medical consultations at the moment.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/doctors'}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                  >
                    Book an Appointment
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyBookings;