import { useState } from 'react';
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleButtonSubmit = async (event) => {
    event.preventDefault();
  
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {  
      toast.error('Please fill out all the fields.');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),  
      });
  
      if (response.ok) {
        toast.success('Message sent successfully');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Contact <span className="text-purple-400">Us</span>
            </h1>
            <p className="text-base md:text-lg text-white max-w-xl mx-auto">
              Have a question, suggestion, or need assistance? We're here to help. Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>

          <form 
            onSubmit={handleButtonSubmit} 
            className="bg-purple-900/20 border border-purple-700 rounded-xl p-8 md:p-12 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-white text-sm font-bold mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  required
                />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-white text-sm font-bold mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label 
                htmlFor="subject" 
                className="block text-white text-sm font-bold mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is your message about?"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                required
              />
            </div>

            <div className="mt-6">
              <label 
                htmlFor="message" 
                className="block text-white text-sm font-bold mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                required
              ></textarea>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Information */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Additional <span className="text-purple-400">Contact</span> Information
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  ),
                  title: 'Phone',
                  content: '+1 (555) 123-4567'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  ),
                  title: 'Email',
                  content: 'support@healthcare.com'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  ),
                  title: 'Address',
                  content: '123 Healthcare St, Medical City'
                }
              ].map((contact, index) => (
                <div 
                  key={index} 
                  className="bg-purple-900/20 border border-purple-700 rounded-xl p-6 text-center transform transition duration-300 hover:scale-105"
                >
                  {contact.icon}
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-white">
                    {contact.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;