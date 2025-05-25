import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { HiStar } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../../assets/data/testimonials";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section className="bg-black text-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Patient <span className="text-purple-400">Testimonials</span>
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear directly from our patients about their transformative healthcare experiences and the compassionate care they received.
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          spaceBetween={30}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                className="bg-purple-900/30 border border-purple-700 rounded-xl p-6 h-full flex flex-col"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-purple-400 opacity-50">
                  <FaQuoteLeft className="w-8 h-8" />
                </div>

                {/* Testimonial Content */}
                <p className="text-white/80 mb-6 flex-grow italic">
                  "{item.content}"
                </p>

                {/* User Details */}
                <div className="flex items-center space-x-4 mt-auto">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
                    <img 
                      src={item.photo} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {item.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <HiStar 
                          key={i} 
                          className="text-yellow-400 w-5 h-5" 
                        />
                      ))}
                      <span className="text-white/60 ml-2 text-sm">
                        ({item.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Testimonial CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Share Your <span className="text-purple-400">Experience</span>
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              We value your feedback and would love to hear about your healthcare journey with us.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Write a Testimonial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;