import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCloudUploadAlt, 
  FaTransgender, 
  FaUserMd 
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import signupImg from "../assets/images/signup.gif";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

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
      setPreviewUrl(data.url);
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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Registration failed");
      }

      setLoading(false);
      toast.success(resData.message || "Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-purple-900/30 border border-purple-700 rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Image Section */}
        <div className="hidden md:block bg-purple-900/50 relative">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            src={signupImg} 
            alt="Signup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
              <p className="text-white/80">
                Join our healthcare community and take the first step towards better health
              </p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Create an <span className="text-purple-400">Account</span>
            </h1>
            <p className="text-white/80">
              Sign up to access personalized healthcare services
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputData}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputData}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputData}
                  className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Role and Gender */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <FaUserMd className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputData}
                    className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="relative">
                  <FaTransgender className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputData}
                    className="w-full bg-black/50 border border-purple-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex items-center space-x-6">
              {selectedFile && (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500">
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 disabled:opacity-50"
            >
              {loading ? (
                <HashLoader size={25} color="#fff" />
              ) : (
                "Create Account"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-white/80">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;