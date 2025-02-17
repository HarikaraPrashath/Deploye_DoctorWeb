import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { RiEmotionHappyLine } from "react-icons/ri";
import doc1 from "../assets/doc1.jpg";
import doc2 from "../assets/doc2.jpg";
import doc3 from "../assets/doc3.jpg";
import doc4 from "../assets/doc4.jpg";

function About() {
  return (
    <div className="my-12 px-6 lg:px-20">
      {/* Steps Section */}
      <h1 className="text-4xl font-semibold text-center text-gray-800">
        3 Easy Steps to Get Your Solution
      </h1>
      <div className="flex justify-center gap-12 mt-10">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-500 w-20 h-20 flex items-center justify-center rounded-full shadow-lg">
            <FiSearch className="text-white w-10 h-10" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">Find a Doctor</p>
          <span className="text-gray-500 text-sm">
            Find the best doctor with minimum effort
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-yellow-500 w-20 h-20 flex items-center justify-center rounded-full shadow-lg">
            <FaRegCalendarDays className="text-white w-10 h-10" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Get an Appointment
          </p>
          <span className="text-gray-500 text-sm">
            Schedule an appointment effortlessly
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 w-20 h-20 flex items-center justify-center rounded-full shadow-lg">
            <RiEmotionHappyLine className="text-white w-10 h-10" />
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Happy Consultation
          </p>
          <span className="text-gray-500 text-sm">
            Receive quality treatment & guidance
          </span>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="mt-16">
        <h1 className="text-4xl font-semibold text-center text-gray-800">
          Meet Our Certified Doctors
        </h1>
        <p className="text-center text-gray-500 mt-3">
          Our doctors have an average of 15+ years of experience and a 99%
          satisfaction rating.
        </p>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {/* Doctor 1 */}
          <div className="bg-white p-4 shadow-lg rounded-2xl text-center">
            <img src={doc1} alt="Doctor" className="w-full h-60 object-cover rounded-xl" />
            <h6 className="font-bold text-lg mt-4 text-gray-800">
              Dr. Jack Lindan
            </h6>
            <span className="text-blue-500 text-sm">Dentist Specialist</span>
          </div>

          {/* Doctor 2 */}
          <div className="bg-white p-4 shadow-lg rounded-2xl text-center">
            <img src={doc2} alt="Doctor" className="w-full h-60 object-cover rounded-xl" />
            <h6 className="font-bold text-lg mt-4 text-gray-800">
              Dr. Sarah Johnson
            </h6>
            <span className="text-blue-500 text-sm">Cardiologist</span>
          </div>

          {/* Doctor 3 */}
          <div className="bg-white p-4 shadow-lg rounded-2xl text-center">
            <img src={doc3} alt="Doctor" className="w-full h-60 object-cover rounded-xl" />
            <h6 className="font-bold text-lg mt-4 text-gray-800">
              Dr. Mark Spencer
            </h6>
            <span className="text-blue-500 text-sm">Neurologist</span>
          </div>

          {/* Doctor 4 */}
          <div className="bg-white p-4 shadow-lg rounded-2xl text-center">
            <img src={doc4} alt="Doctor" className="w-full h-60 object-cover rounded-xl" />
            <h6 className="font-bold text-lg mt-4 text-gray-800">
              Dr. Emily Carter
            </h6>
            <span className="text-blue-500 text-sm">Pediatrician</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
