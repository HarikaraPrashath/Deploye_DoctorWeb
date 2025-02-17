import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Address */}
          <div>
            <h1 className="text-4xl font-bold text-blue-500">Medically</h1>
            <p className="mt-3 text-gray-300">
              Marine Dive, Colombo Rd, Sri Lanka
            </p>
            <p className="text-gray-300">Contact us: +94 434 324 2345</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h5 className="text-2xl text-blue-500 mb-3">Category</h5>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">Home</li>
              <li className="hover:text-blue-400 cursor-pointer">About</li>
              <li className="hover:text-blue-400 cursor-pointer">Services</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h5 className="text-2xl text-blue-500 mb-3">Social Media</h5>
            <ul className="space-y-2 flex flex-col">
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaFacebook /> Facebook
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaInstagram /> Instagram
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaTwitter /> Twitter
              </li>
              <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaWhatsapp /> WhatsApp
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h5 className="text-2xl text-blue-500 mb-3">Subscribe Newsletter</h5>
            <p className="text-gray-300 mb-2">Register for tips and updates</p>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full p-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © 2025 Medically. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
