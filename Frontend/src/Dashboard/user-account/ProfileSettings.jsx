/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaUserEdit, 
  FaCloudUploadAlt, 
  FaTint, 
  FaEnvelope, 
  FaUser 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const ProfileSettings = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    bloodGroup: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      bloodGroup: user.bloodGroup,
    });
  }, [user]);

  const handleInputData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setFormData((prevState) => ({ ...prevState, photo: data.url }));
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Update failed");
      }

      setLoading(false);
      toast.success(resData.message || "Profile updated successfully");
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-4">
            <FaUserEdit className="text-purple-400 w-10 h-10 mr-3" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Profile <span className="text-purple-400">Settings</span>
            </h1>
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Update your personal information and profile picture
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto bg-purple-900/30 border border-purple-700 rounded-xl p-8 shadow-2xl"
        >
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-white/80 mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputData}
                  placeholder="Enter Your Name"
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-white/80 mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputData}
                  placeholder="Enter Your Email"
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  readOnly
                />
              </div>
            </div>

            {/* Blood Group Input */}
            <div>
              <label className="block text-white/80 mb-2">Blood Group</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputData}
                  placeholder="Enter Blood Group"
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex items-center space-x-6">
              {formData.photo && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500">
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <label 
                  htmlFor="customFile" 
                  className="block text-white/80 mb-2"
                >
                  Profile Picture
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png, .jpeg"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button
                    type="button"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                  >
                    <FaCloudUploadAlt className="w-6 h-6" />
                    <span>Upload Photo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <HashLoader size={25} color="#fff" />
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSettings;