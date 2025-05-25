import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../context/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const handleInputData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Login failed");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: resData.data,
          token: resData.token,
          role: resData.role,
        },
      });

      setLoading(false);
      toast.success(resData.message || "Login successful");
      navigate("/home");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
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
        className="w-full max-w-md bg-purple-900/30 border border-purple-700 rounded-xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hello! <span className="text-purple-400">Welcome</span> Back 🎉
          </h2>
          <p className="text-white/80">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
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
            <div className="text-right mt-2">
              <Link 
                to="/forgot-password" 
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Forgot Password?
              </Link>
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
              <>
                <FaSignInAlt className="mr-2" />
                Login
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-white/80">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </form>

        {/* Social Login (Optional) */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-purple-900/30 text-white/80">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            {["Google", "Facebook", "Apple"].map((provider) => (
              <button
                key={provider}
                className="w-full bg-black/50 border border-purple-700 text-white py-2 rounded-lg hover:bg-purple-900/50 transition duration-300"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;