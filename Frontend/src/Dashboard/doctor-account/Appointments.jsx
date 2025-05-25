/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaUserMd } from "react-icons/fa";

const Appointments = ({ appointments }) => {
    // Filter only the approved appointments
    const approvedAppointments = appointments.filter(item => item.status === "approved");

    return (
        <div className="bg-black text-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <div className="flex justify-center items-center mb-4">
                        <FaUserMd className="text-purple-400 w-10 h-10 mr-3" />
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            My <span className="text-purple-400">Appointments</span>
                        </h2>
                    </div>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        View and manage your scheduled medical appointments with ease.
                    </p>
                </motion.div>

                {/* Desktop Table View */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hidden md:block overflow-x-auto"
                >
                    <table className="w-full border border-purple-800 rounded-xl overflow-hidden">
                        <thead className="bg-purple-900/30">
                            <tr>
                                {['Name', 'Gender', 'Payment', 'Price', 'Booked on'].map((header, index) => (
                                    <th 
                                        key={index} 
                                        className="px-6 py-4 text-left text-white/80 font-semibold"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {approvedAppointments.length > 0 ? (
                                approvedAppointments.map((item, index) => (
                                    <tr 
                                        key={item._id} 
                                        className="border-b border-purple-800 hover:bg-purple-900/20 transition duration-300"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img 
                                                    src={item.user.photo} 
                                                    alt="User" 
                                                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500"
                                                />
                                                <div>
                                                    <div className="font-bold text-white">{item.user.name}</div>
                                                    <div className="text-white/60">{item.user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/80">{item.user.gender}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {item.isPaid ? (
                                                    <>
                                                        <FaCheckCircle className="text-green-500 mr-2" />
                                                        <span className="text-green-400">Paid</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaTimesCircle className="text-red-500 mr-2" />
                                                        <span className="text-red-400">Unpaid</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white/80">${item.ticketPrice}</td>
                                        <td className="px-6 py-4 text-white/80">{formatDate(item.createdAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-white/60">
                                        No appointments scheduled yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Mobile Card View */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="block md:hidden space-y-4"
                >
                    {approvedAppointments.length > 0 ? (
                        approvedAppointments.map((item) => (
                            <div 
                                key={item._id} 
                                className="bg-purple-900/30 border border-purple-700 rounded-xl p-6"
                            >
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={item.user.photo} 
                                        alt="User" 
                                        className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                                    />
                                    <div>
                                        <div className="font-bold text-white text-xl">{item.user.name}</div>
                                        <div className="text-white/60">{item.user.email}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-white/80">Gender:</span>
                                        <span className="text-white">{item.user.gender}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/80">Payment Status:</span>
                                        <div className="flex items-center">
                                            {item.isPaid ? (
                                                <>
                                                    <FaCheckCircle className="text-green-500 mr-2" />
                                                    <span className="text-green-400">Paid</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaTimesCircle className="text-red-500 mr-2" />
                                                    <span className="text-red-400">Unpaid</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/80">Price:</span>
                                        <span className="text-white">${item.ticketPrice}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-white/80">Booked on:</span>
                                        <span className="text-white">{formatDate(item.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white/60 bg-purple-900/30 p-8 rounded-xl">
                            No appointments found
                        </div>
                    )}
                </motion.div>

                {/* No Appointments CTA */}
                {approvedAppointments.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-8 max-w-3xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Ready to <span className="text-purple-400">Book</span> an Appointment?
                            </h3>
                            <p className="text-white/80 mb-6 max-w-xl mx-auto">
                                Schedule your next medical consultation and take a proactive step towards your health.
                            </p>
                            <button 
                                onClick={() => window.location.href = '/doctors'}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                            >
                                Find a Doctor
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Appointments;