import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import useFetchData from '../../hooks/useFetchData.js';
import { FaUserMd } from "react-icons/fa";



const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <div className="bg-black text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <FaUserMd className="text-purple-400 w-10 h-10 mr-3" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Our <span className="text-purple-400">Expert</span> Doctors
            </h2>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Meet our team of highly skilled and compassionate medical professionals dedicated to providing exceptional healthcare.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center">
            <Error errMsg={error?.message || "Something went wrong. Please try again later."} />
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div>
            {doctors?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.slice(0, 3).map((doctor) => (
                  <DoctorCard 
                    key={doctor._id} 
                    doctor={doctor} 
                    className="transform transition duration-300 hover:scale-105"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-white/60">
                No doctors available at the moment.
              </div>
            )}
          </div>
        )}

        {/* View All Doctors CTA */}
        {!loading && !error && doctors?.length > 3 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/doctors'}
              aria-label="View all doctors"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              View All Doctors
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
