/* eslint-disable react/jsx-key */

import { services } from "../../assets/data/services";
import ServiceCard from "./ServiceCard";
import { FaHandHoldingMedical } from "react-icons/fa";
import { motion } from "framer-motion";

const ServiceList = () => {
  return (
    <section className="bg-black text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <FaHandHoldingMedical className="text-purple-400 w-10 h-10 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Our <span className="text-purple-400">Medical</span> Services
            </h2>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to address your unique medical needs with precision, compassion, and advanced technology.
          </p>
        </motion.div>

        {/* Services Grid */}
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
          {services.map((item, idx) => (
            <ServiceCard 
              key={idx} 
              item={item} 
              idx={idx} 
            />
          ))}
        </motion.div>

        {/* Additional Services CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need More <span className="text-purple-400">Information?</span>
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Our dedicated team is ready to provide detailed insights into our comprehensive medical services and personalized care options.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
              >
                Contact Us
              </button>
              <button 
                onClick={() => window.location.href = '/services'}
                className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
              >
                Explore All Services
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceList;