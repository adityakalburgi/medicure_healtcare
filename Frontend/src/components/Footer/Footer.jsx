import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const socialLinks = [
  {
    path: "https://www.linkedin.com/in/naman-omar-a54877259/",
    icon: <FaLinkedin className="w-6 h-6 text-purple-400 group-hover:text-white transition duration-300" />,
  },
  {
    path: "https://www.instagram.com/naman._.omar/",
    icon: <FaInstagram className="w-6 h-6 text-purple-400 group-hover:text-white transition duration-300" />,
  },
  {
    path: "https://github.com/naman-omar",
    icon: <FaGithub className="w-6 h-6 text-purple-400 group-hover:text-white transition duration-300" />,
  },
  {
    path: "https://twitter.com",
    icon: <FaTwitter className="w-6 h-6 text-purple-400 group-hover:text-white transition duration-300" />,
  },
];

const quickLinks1 = [
  { path: "/", display: "Home" },
  { path: "/home", display: "About us" },
  { path: "/services", display: "Services" },
];

const quickLinks2 = [
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/doctors", display: "Request an Appointment" },
  { path: "/contact", display: "Find a Location" },
];

const quickLinks3 = [
  { path: "/contact", display: "Donate" },
  { path: "/contact", display: "Contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Social Links */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/">
              <h1 className="text-white text-2xl font-bold">Medicure</h1>
            </Link>
            <p className="text-white/80 mb-6">
              Providing innovative healthcare solutions with compassion and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/60">
              &copy; {year} Healthcare. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks1.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-purple-400 transition duration-300"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* I Want To */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-6">I Want To</h3>
            <ul className="space-y-3">
              {quickLinks2.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-purple-400 transition duration-300"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-6">Support</h3>
            <ul className="space-y-3">
              {quickLinks3.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-purple-400 transition duration-300"
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-6 border-t border-purple-800">
          <div className="text-center text-sm text-white/60">
            Developed with ❤️ by Aditya Kalburgi
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;