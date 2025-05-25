import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaHome 
} from 'react-icons/fa';
import { BASE_URL } from '../config';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutSuccess = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const success = query.get('success');
    const bookingId = query.get('bookingId');

    useEffect(() => {
        const verifyBooking = async () => {
            try {
                const res = await fetch(`${BASE_URL}/bookings/verify`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookingId, success })
                });

                const data = await res.json();
                
                if (success === "true") {
                    toast.success("Payment completed successfully!");
                } else {
                    toast.error("Payment was cancelled.");
                }
            } catch (err) {
                toast.error("An error occurred while processing your payment.");
            }
        };

        verifyBooking();
    }, [success, bookingId]);

    const renderContent = () => {
        const isSuccess = success === "true";
        
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black min-h-screen flex items-center justify-center px-4"
            >
                <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-12 max-w-md w-full text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {isSuccess ? (
                            <FaCheckCircle className="mx-auto text-green-400 w-24 h-24 mb-6" />
                        ) : (
                            <FaTimesCircle className="mx-auto text-red-400 w-24 h-24 mb-6" />
                        )}
                    </motion.div>

                    <h2 className="text-3xl font-bold mb-4 text-white">
                        {isSuccess ? "Payment Successful!" : "Payment Cancelled"}
                    </h2>

                    <p className="text-white/80 mb-6">
                        {isSuccess 
                            ? "Thank you for completing your secure online payment." 
                            : "Your payment process was cancelled."}
                    </p>

                    <p className="text-white/60 mb-8">
                        {isSuccess 
                            ? "Your booking has been confirmed." 
                            : "No charges have been made."}
                    </p>

                    <Link 
                        to="/home"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition duration-300 transform hover:scale-105"
                    >
                        <FaHome className="mr-2" />
                        Return to Home
                    </Link>
                </div>
            </motion.div>
        );
    };

    return renderContent();
};

export default CheckoutSuccess;