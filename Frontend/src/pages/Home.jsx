import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import featureImg from "../assets/images/feature-img.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonials from "../components/Testimonials/Testimonials";

const Home = () => {
  const Navigate = useNavigate();
  const handleReqBtnClick = () => {
    Navigate("/doctors");
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero Section with Responsive Layout */}
      <section className="relative bg-gradient-to-br from-purple-900 to-black py-16 md:py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                Transforming Healthcare,
                <span className="text-purple-400"> One Patient at a Time</span>
              </h1>
              <p className="text-base md:text-lg text-white leading-relaxed">
                Our cutting-edge medical approach combines advanced technology
                with compassionate care, ensuring personalized health solutions
                for every individual.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleReqBtnClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                >
                  Request Appointment
                </button>
                <Link
                  to="/services"
                  className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center space-x-4 md:space-x-6">
              <div className="space-y-4 md:space-y-6">
                <img
                  src={heroImg01}
                  alt="Medical Professional"
                  className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 w-full"
                />
              </div>
              <div className="space-y-4 md:space-y-6 mt-10">
                <img
                  src={heroImg02}
                  alt="Medical Treatment"
                  className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 w-full"
                />
                <img
                  src={heroImg03}
                  alt="Healthcare Technology"
                  className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-300 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="bg-purple-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-base md:text-xl text-white max-w-2xl mx-auto">
              Innovative healthcare solutions designed to meet your unique
              medical needs with precision and care.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: icon01,
                title: "Find a Doctor",
                description:
                  "Connect with top-tier medical professionals tailored to your specific health requirements.",
                link: "/doctors",
              },
              {
                icon: icon02,
                title: "Find a Location",
                description:
                  "Locate our state-of-the-art medical facilities conveniently positioned across the region.",
                link: "/contact",
              },
              {
                icon: icon03,
                title: "Book Appointment",
                description:
                  "Seamless online scheduling for quick and efficient healthcare access.",
                link: "/doctors",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-black/50 border border-purple-700 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mx-auto mb-6 w-16 md:w-20 h-16 md:h-20"
                />
                <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4">
                  {service.title}
                </h3>
                <p className="text-white mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-purple-500 hover:text-purple-300 flex items-center justify-center"
                >
                  <BsArrowRightCircle className="w-8 h-8" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Healthcare Section */}
      <section className="bg-black py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                Virtual Healthcare Solutions
              </h2>
              <p className="text-white mb-6">
                Experience cutting-edge telemedicine with our advanced virtual
                consultation platform.
              </p>
              <ul className="space-y-3 text-white mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Instant Online Consultations
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Secure Medical Records
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  24/7 Healthcare Support
                </li>
              </ul>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full w-full md:w-auto">
                Start Virtual Consultation
              </button>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={featureImg}
                alt="Virtual Healthcare"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">
                Virtual Healthcare Solutions
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Wrapper for Remaining Sections */}
      <div className="container mx-auto px-4">
        <About />
        <div className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
            Our Medical Services
          </h2>
          <ServiceList />
        </div>
        <div className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
            Our Expert Doctors
          </h2>
          <DoctorList />
        </div>
        <div className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
            Frequently Asked Questions
          </h2>
          <FaqList />
        </div>
        <div className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-400 mb-8">
            Patient Testimonials
          </h2>
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Home;
