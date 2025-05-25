/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaStar, 
  FaCommentMedical, 
  FaUserCircle, 
  FaPaperPlane 
} from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Feedback Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-4">
            <FaCommentMedical className="text-purple-400 w-10 h-10" />
            <h2 className="text-3xl font-bold">
              Patient <span className="text-purple-400">Reviews</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <FaStar className="text-yellow-400 w-6 h-6" />
            <span className="text-xl font-semibold">
              {totalRating} Total Reviews
            </span>
          </div>
        </motion.div>

        {/* Reviews List */}
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
          className="space-y-6"
        >
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { duration: 0.3 }
                  }
                }}
                className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 flex justify-between items-start"
              >
                <div className="flex space-x-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                    <img 
                      src={review?.user?.photo} 
                      alt={review?.user?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {review?.user?.name}
                      </h3>
                      <span className="text-sm text-white/60">
                        {formatDate(review?.createdAt)}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(review?.rating)}
                    </div>
                    <p className="text-white/80">
                      {review?.reviewText}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center bg-purple-900/30 border border-purple-700 rounded-xl p-12"
            >
              <FaCommentMedical className="mx-auto text-purple-400 w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">
                No Reviews Yet
              </h3>
              <p className="text-white/80 mb-6">
                Be the first to share your experience!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Feedback Form Toggle */}
        <AnimatePresence>
          {!showFeedback ? (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-12 text-center"
            >
              <button 
                onClick={() => setShowFeedback(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center mx-auto space-x-2 transition duration-300 transform hover:scale-105"
              >
                <FaPaperPlane className="mr-2" />
                Write a Review
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="mt-12"
            >
              <FeedbackForm onClose={() => setShowFeedback(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback;