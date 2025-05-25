/* eslint-disable react/prop-types */

import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaUserMd, FaHospital } from "react-icons/fa";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-black border border-purple-800 rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-purple-900/50">
      <div className="relative">
        <img 
          src={doctor.photo} 
          className="w-full h-64 object-cover" 
          alt={doctor.name} 
        />
        <div className="absolute top-4 right-4 bg-purple-600/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {doctor.specialization}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Dr. {doctor.name}
          </h2>
          <div className="flex items-center space-x-2">
            <img src={starIcon} alt="Star" className="w-6 h-6" />
            <span className="text-purple-400 font-semibold">
              {doctor.averageRating}
              <span className="text-white/60 text-sm ml-1">
                ({doctor.totalRating})
              </span>
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-white/80">
            <FaHospital className="mr-3 text-purple-400" />
            <span>
              {doctor.experiences.length > 0 
                ? doctor.experiences[doctor.experiences.length - 1].hospital 
                : "No Hospital Information"}
            </span>
          </div>
          <div className="flex items-center text-white/80">
            <FaUserMd className="mr-3 text-purple-400" />
            <span>
              Specialization: {doctor.specialization}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link 
            to={`/doctors/${doctor._id}`}
            className="text-purple-400 hover:text-purple-300 flex items-center space-x-2 transition duration-300"
          >
            <span>View Profile</span>
            <BsArrowRightCircle className="w-6 h-6" />
          </Link>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition duration-300 transform hover:scale-105"
            onClick={() => {/* Book Appointment Logic */}}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;