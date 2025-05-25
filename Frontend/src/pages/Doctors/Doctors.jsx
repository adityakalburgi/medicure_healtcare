import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaUserMd, 
  FaStethoscope 
} from "react-icons/fa";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData.js";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonials from "../../components/Testimonials/Testimonials";
import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);
    return () => clearTimeout(timeOut);
  }, [query]);

  const { 
    data: doctors = [], 
    loading, 
    error 
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Search Section */}
      <motion.section 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-purple-900/30"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <FaUserMd className="text-purple-400 w-10 h-10 mr-3" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Find a <span className="text-purple-400">Doctor</span>
            </h1>
          </div>
          
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Search for expert medical professionals tailored to your specific healthcare needs.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input
                type="search"
                placeholder="Search Doctor by name or specialization"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-black/50 border border-purple-700 rounded-full pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading && <Loader />}
          {error && <Error />}
          
          {!loading && !error && (
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
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
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
                ))
              ) : (
                <div className="col-span-full text-center">
                  <FaStethoscope className="mx-auto text-purple-400 w-16 h-16 mb-4" />
                  <p className="text-2xl text-white/80">
                    No doctors found matching your search
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-purple-900/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Patient <span className="text-purple-400">Testimonials</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Hear directly from our patients about their transformative healthcare experiences and the compassionate care they received.
            </p>
          </motion.div>
          
          <Testimonials />
        </div>
      </section>
    </div>
  );
};

export default Doctors;