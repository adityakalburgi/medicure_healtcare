/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const FaqItem = ({ item, key }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      key={key} 
      className="bg-black border border-purple-800 rounded-xl mb-6 overflow-hidden transition-all duration-300"
    >
      <div
        className="flex justify-between items-center p-6 cursor-pointer group"
        onClick={toggleOpen}
      >
        <h4 className={`
          text-base md:text-lg lg:text-xl font-semibold 
          ${isOpen ? 'text-purple-400' : 'text-white'}
          transition duration-300
        `}>
          {item.question}
        </h4>
        <div 
          className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            ${isOpen 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-900/30 text-purple-400 group-hover:bg-purple-600/30'
            }
            transition duration-300
          `}
        >
          {isOpen ? (
            <AiOutlineMinus className="w-6 h-6" />
          ) : (
            <AiOutlinePlus className="w-6 h-6" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="border-t border-purple-800 pt-4 mt-4">
                <p className="text-white/80 text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;