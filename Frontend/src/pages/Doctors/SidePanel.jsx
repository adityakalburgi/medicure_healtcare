/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { 
  FaCalendarCheck, 
  FaClock, 
  FaMoneyBillWave, 
  FaBookMedical 
} from "react-icons/fa";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from '../../config.js';
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        if (res.headers.get('content-type')?.includes('application/json')) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        } else {
          throw new Error('An unexpected error occurred. Please try again');
        }
      }

      const data = await res.json();
      if (data.session_url) {
        window.location.href = data.session_url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-purple-900/30 border border-purple-700 rounded-xl p-8 shadow-2xl"
    >
      <div className="space-y-6">
        {/* Consultation Fee */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FaMoneyBillWave className="text-purple-400 w-8 h-8" />
            <span className="text-white font-semibold">
              Consultation Fee
            </span>
          </div>
          <span className="text-2xl font-bold text-purple-400">
            {ticketPrice} INR
          </span>
        </div>

        {/* Time Slots */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <FaCalendarCheck className="text-purple-400 w-8 h-8" />
            <h3 className="text-xl font-semibold text-white">
              Available Time Slots
            </h3>
          </div>
          
          {timeSlots?.length > 0 ? (
            <motion.ul 
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
              className="space-y-3"
            >
              {timeSlots.map((time, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.3 }
                    }
                  }}
                  className="flex items-center justify-between bg-black/50 border border-purple-700 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-purple-400" />
                    <span className="text-white">{time.day}</span>
                  </div>
                  <span className="text-white/80">
                    {convertTime(time.startingTime)} - {convertTime(time.endingTime)}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="text-center text-white/60 bg-black/50 border border-purple-700 rounded-lg p-4">
              No available time slots
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={bookingHandler}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full flex items-center justify-center space-x-2 transition duration-300"
        >
          <FaBookMedical className="mr-2" />
          Book Appointment
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SidePanel;