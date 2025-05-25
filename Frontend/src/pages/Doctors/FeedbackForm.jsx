import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaStar, 
  FaPaperPlane, 
  FaTimesCircle 
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import Loading from "../../components/Loader/Loading.jsx";

const FeedbackForm = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!rating || !reviewText) {
      setLoading(false);
      return toast.error("Rating & Review fields are required");
    }

    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, reviewText })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message);
      
      // Optional: Close the form or reset fields
      if (onClose) onClose();
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-purple-900/30 border border-purple-700 rounded-xl p-8 max-w-2xl mx-auto"
    >
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-purple-400 transition duration-300"
        >
          <FaTimesCircle className="w-6 h-6" />
        </button>
      )}

      <form onSubmit={handleReviewSubmit} className="space-y-6">
        {/* Form Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your <span className="text-purple-400">Feedback</span>
          </h2>
          <p className="text-white/80">
            Help us improve our services by sharing your honest experience
          </p>
        </div>

        {/* Rating Section */}
        <div>
          <h3 className="text-xl text-white font-semibold mb-4">
            Rate Your Overall Experience
          </h3>
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <motion.button
                  type="button"
                  key={currentRating}
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(rating)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    text-3xl transition duration-300
                    ${currentRating <= ((rating && hover) || hover) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300'}
                  `}
                >
                  <FaStar />
                </motion.button>
              );
            })}
          </div>
          <p className="text-center text-white/60">
            {rating ? `You rated ${rating} out of 5` : 'Click to rate'}
          </p>
        </div>

        {/* Review Textarea */}
        <div>
          <label className="block text-xl text-white font-semibold mb-4">
            Share Your Detailed Feedback
          </label>
          <textarea
            rows="5"
            placeholder="Write about your experience, treatment, and any suggestions"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full flex items-center justify-center space-x-2 transition duration-300 disabled:opacity-50"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Submit Feedback
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default FeedbackForm;