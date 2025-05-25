/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { 
  FaGraduationCap, 
  FaBriefcaseMedical, 
  FaCalendarAlt, 
  FaUniversity, 
  FaHospital 
} from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaBriefcaseMedical className="text-purple-400" />
            About{" "}
            <span className="text-purple-400">
              Dr. {name}
            </span>
          </h3>
          <p className="text-white/80 leading-relaxed">
            {about}
          </p>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaGraduationCap className="text-purple-400" />
            Education
          </h3>
          {qualifications && qualifications.length > 0 ? (
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
              className="grid md:grid-cols-2 gap-6"
            >
              {qualifications.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 transform transition duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <FaUniversity className="text-purple-400 mr-3 w-8 h-8" />
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {item.degree}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {item.university}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-white/80">
                    <FaCalendarAlt className="mr-2 text-purple-400" />
                    <span>
                      {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-white/60">No educational qualifications available</p>
          )}
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaBriefcaseMedical className="text-purple-400" />
            Professional Experience
          </h3>
          {experiences && experiences.length > 0 ? (
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
              className="grid md:grid-cols-2 gap-6"
            >
              {experiences.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 transform transition duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <FaHospital className="text-purple-400 mr-3 w-8 h-8" />
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {item.position}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {item.hospital}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-white/80">
                    <FaCalendarAlt className="mr-2 text-purple-400" />
                    <span>
                      {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-white/60">No professional experience available</p>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default DoctorAbout;