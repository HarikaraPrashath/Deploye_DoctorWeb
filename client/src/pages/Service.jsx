import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import { FaLungs } from "react-icons/fa";
import { BsCapsule } from "react-icons/bs";
import { MdScience } from "react-icons/md";


function Service() {
  return (
    <div className="py-16 px-6 md:px-16 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Our Services
      </h1>
      <p className="text-center text-lg text-gray-600 mt-3 max-w-3xl mx-auto">
        Our highly qualified doctors are committed to helping you recover from your illness with the best medical expertise.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-7xl mx-auto">
        {/* Cardiology */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
          <FaHeartbeat className="text-4xl text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Cardiology</h2>
          <p className="text-gray-600 mt-2">
            Specialized treatment for heart-related diseases with expert care.
          </p>
        </div>

        {/* Pulmonology */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
          <FaLungs className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Pulmonology</h2>
          <p className="text-gray-600 mt-2">
            Comprehensive lung disease treatment with state-of-the-art facilities.
          </p>
        </div>

        {/* Medicine */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
          <BsCapsule className="text-4xl text-green-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Medicine</h2>
          <p className="text-gray-600 mt-2">
            Effective medical treatments tailored to your health needs.
          </p>
        </div>

        {/* Lab Service */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition">
          <MdScience className="text-4xl text-purple-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Lab Service</h2>
          <p className="text-gray-600 mt-2">
            Accurate and timely diagnostic lab services for all medical tests.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Service;
