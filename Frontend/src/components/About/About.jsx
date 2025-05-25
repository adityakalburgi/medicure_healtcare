import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-black text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <img 
                src={aboutImg} 
                alt="About Us" 
                className="w-full rounded-xl shadow-2xl transform transition duration-300 hover:scale-105"
              />
              <div className="absolute -bottom-10 -right-10 md:-right-20 w-[200px] md:w-[300px]">
                <img 
                  src={aboutCardImg} 
                  alt="About Card" 
                  className="w-full rounded-xl shadow-2xl transform transition duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Proud to be <span className="text-purple-400">Nation's Best</span>
            </h2>
            
            <div className="space-y-6">
              <p className="text-white/80 leading-relaxed">
                We are honored to be recognized as one of the nation's top healthcare providers. Our commitment to excellence in patient care, advanced medical treatments, and compassionate service sets us apart.
              </p>
              
              <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-6">
                <p className="text-white/80 leading-relaxed mb-4">
                  Our mission is to continuously improve and innovate in healthcare, focusing on:
                </p>
                <ul className="space-y-3">
                  {[
                    "Cutting-edge medical treatments",
                    "Personalized patient care",
                    "Continuous medical research",
                    "Compassionate healthcare approach"
                  ].map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-white"
                    >
                      <FaCheckCircle className="text-purple-400 mr-3 w-6 h-6" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-white/80 leading-relaxed">
                We don't just look back at our achievements, but constantly strive towards creating a better healthcare future.
              </p>
            </div>

            <div className="mt-8">
              <Link to="/about">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;