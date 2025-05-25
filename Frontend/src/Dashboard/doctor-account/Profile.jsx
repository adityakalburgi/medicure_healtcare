import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserEdit, 
  FaTrash, 
  FaPlus, 
  FaCalendarAlt, 
  FaUserGraduate, 
  FaBriefcaseMedical 
} from "react-icons/fa";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        bio: doctorData.bio || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        ticketPrice: doctorData.ticketPrice || "",
        qualifications: doctorData.qualifications || [],
        experiences: doctorData.experiences || [],
        timeSlots: doctorData.timeSlots || [],
        about: doctorData.about || "",
        photo: doctorData.photo || "",
      });
    }
  }, [doctorData]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);
      setFormData({ ...formData, photo: data?.url });
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addItem = (key, item) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], item],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div>
              <label className="text-white/80 mb-2 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="text-white/80 mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {/* Add more personal details inputs */}
          </motion.div>
        );
      case "professional":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-white/80 mb-2 block">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Specialization</option>
                  <option value="Surgeon">Surgeon</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                </select>
              </div>
              <div>
                <label className="text-white/80 mb-2 block">Ticket Price</label>
                <input
                  type="number"
                  name="ticketPrice"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-white/80 mb-2 block">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {/* Add more professional details */}
          </motion.div>
        );
      case "qualifications":
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {formData.qualifications.map((qual, index) => (
              <div 
                key={index} 
                className="bg-purple-900/30 border border-purple-700 rounded-lg p-6 relative"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/80 mb-2 block">Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={qual.degree}
                      onChange={(e) => {
                        const newQualifications = [...formData.qualifications];
                        newQualifications[index].degree = e.target.value;
                        setFormData({ ...formData, qualifications: newQualifications });
                      }}
                      className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 mb-2 block">University</label>
                    <input
                      type="text"
                      name="university"
                      value={qual.university}
                      onChange={(e) => {
                        const newQualifications = [...formData.qualifications];
                        newQualifications[index].university = e.target.value;
                        setFormData({ ...formData, qualifications: newQualifications });
                      }}
                      className="w-full bg-black/50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => deleteItem('qualifications', index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              onClick={() => addItem('qualifications', { degree: '', university: '' })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <FaPlus /> Add Qualification
            </button>
          </motion.div>
        );
      // Add more sections as needed
      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Doctor <span className="text-purple-400">Profile</span>
          </h1>
          <p className="text-white/80">
            Manage and update your professional profile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-6">
            <nav className="space-y-4">
              {[
                { key: "personal", icon: <FaUserEdit />, label: "Personal Info" },
                { key: "professional", icon: <FaBriefcaseMedical />, label: "Professional Details" },
                { key: "qualifications", icon: <FaUserGraduate />, label: "Qualifications" },
                { key: "timeslots", icon: <FaCalendarAlt />, label: "Time Slots" }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300
                    ${activeSection === item.key 
                      ? 'bg-purple-600 text-white' 
                      : 'text-white/80 hover:bg-purple-900/50'}
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 bg-purple-900/30 border border-purple-700 rounded-xl p-8">
            <AnimatePresence mode="wait">
              {renderSectionContent()}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={updateProfileHandler}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 transform hover:scale-105"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;