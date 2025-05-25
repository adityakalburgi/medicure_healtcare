/* eslint-disable react/prop-types */

import { BsArrowRightCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const ServiceCard = ({ item, idx }) => {
  return (
    <motion.div 
      key={idx}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: idx * 0.1,
        ease: "easeInOut"
      }}
      className="bg-black border border-purple-800 rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-purple-900/50"
    >
      <div className="p-6 h-full flex flex-col">
        {/* Service Number */}
        <div className="absolute top-4 right-4">
          <span
            className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full"
            style={{
              background: item.bgColor,
              color: item.textColor,
            }}
          >
            {idx + 1}
          </span>
        </div>

        {/* Service Icon or Placeholder */}
        <div 
          className="mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: item.bgColor + '20', // Translucent background
            color: item.bgColor 
          }}
        >
          <svg 
            className="w-8 h-8"
            fill="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14a1 1 0 11-2 0v-4a1 1 0 112 0v4zm-1-8a1 1 0 100 2 1 1 0 000-2z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>

        {/* Service Details */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white mb-4">
            {item.name}
          </h2>
          <p className="text-white/80 mb-6">
            {item.desc}
          </p>
        </div>

        {/* Action Section */}
        <div className="flex justify-between items-center mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 transition duration-300"
            onClick={() => {/* Add navigation or modal logic */}}
          >
            <span>Learn More</span>
            <BsArrowRightCircle className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;