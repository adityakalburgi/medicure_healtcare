import { faqs } from "../../assets/data/faqs";
import FaqItem from "./FaqItem";
import { FaQuestionCircle } from "react-icons/fa";

const FaqList = () => {
  return (
    <section className="bg-black text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <FaQuestionCircle className="text-purple-400 w-10 h-10 mr-3" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Frequently Asked <span className="text-purple-400">Questions</span>
              </h2>
            </div>
            <p className="text-white/80 max-w-2xl mx-auto">
              Find answers to the most common questions about our healthcare services, treatments, and patient care.
            </p>
          </div>

          {/* FAQ Grid */}
          <div className="space-y-6">
            {faqs.map((item, idx) => (
              <FaqItem 
                key={idx} 
                item={item} 
                className="transform transition duration-300 hover:scale-105"
              />
            ))}
          </div>

          {/* Additional Support CTA */}
          <div className="mt-12 text-center">
            <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Still Have <span className="text-purple-400">Questions?</span>
              </h3>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Our support team is always ready to help you with any additional inquiries or concerns.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                >
                  Contact Support
                </button>
                <button 
                  onClick={() => window.location.href = '/services'}
                  className="bg-transparent border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                >
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqList;