/* eslint-disable react/jsx-key */
import { services } from "../assets/data/services";
import ServiceCard from "../components/Services/ServiceCard";

const Services = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="pt-16 md:pt-20 lg:pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-purple-400">Comprehensive</span> Services
            </h1>
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto">
              Innovative healthcare solutions designed to provide personalized, cutting-edge medical care tailored to your unique needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <div 
                key={idx} 
                className="transform transition duration-300 hover:scale-105"
              >
                <ServiceCard 
                  item={item} 
                  idx={idx} 
                  className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 hover:shadow-2xl transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 md:py-20 bg-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our <span className="text-purple-400">Services</span>
            </h2>
            <p className="text-base md:text-lg text-white max-w-2xl mx-auto">
              We are committed to delivering exceptional healthcare through advanced technology, compassionate care, and personalized treatment plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Advanced Technology",
                description: "Utilizing the latest medical technologies to ensure precise diagnosis and effective treatment.",
                icon: (
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17c.612-1.576 1-3.5 1-5a4 4 0 018 0c0 1.5.388 3.424 1 5m-10 0h10"></path>
                  </svg>
                )
              },
              {
                title: "Personalized Care",
                description: "Tailored healthcare solutions that address your individual medical needs and concerns.",
                icon: (
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.768-.231-1.48-.634-2.026M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.768.231-1.48.634-2.026M14 10a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                )
              },
              {
                title: "Comprehensive Support",
                description: "24/7 medical support and guidance to ensure your health and well-being.",
                icon: (
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-black/50 border border-purple-700 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-400 mb-4">
                  {feature.title}
                </h3>
                <p className="text-white">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore Our <span className="text-purple-400">Services</span>?
          </h2>
          <p className="text-base md:text-lg text-white max-w-2xl mx-auto mb-8">
            Schedule a consultation with our expert medical team and take the first step towards comprehensive, personalized healthcare.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.href='/contact'}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Book Consultation
            </button>
            <button 
              onClick={() => window.location.href='/doctors'}
              className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Meet Our Doctors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;