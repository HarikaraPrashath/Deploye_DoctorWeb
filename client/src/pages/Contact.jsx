import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Google Map Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.93242381539!2d79.84911897558501!3d6.898685793100565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595e3e2c9461%3A0x8d7c700bc3878693!2sMarine%20Drive%2C%20Colombo!5e0!3m2!1sen!2slk!4v1739251023848!5m2!1sen!2slk" 
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form Card */}
      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">Get in Touch</h2>
          <p className="text-gray-600">We would love to hear from you!</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-blue-600">Contact Details</h2>
          <p className="text-gray-600">
            Reach out to us anytime! Our team is here to assist you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-600 text-xl" />
              <p className="text-lg font-medium">+94 434 324 2345</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-600 text-xl" />
              <p className="text-lg font-medium">contact@medically.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <p className="text-lg font-medium">
                Marine Dive, Colombo Rd, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
