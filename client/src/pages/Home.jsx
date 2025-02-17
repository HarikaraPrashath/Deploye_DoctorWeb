import React from "react";
import doctor from "../assets/doctor.jpg";
import { Link } from "react-router-dom";
import About from "./About";
import Service from "./Service";
import Contact from "./Contact";

function Home() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 mt-8 gap-8 ">
        {/* Left Section - Text Content */}
        <div className="max-w-[600px] text-center md:text-left">
          <p className="text-gray-500 font-semibold tracking-wide">
            — Committed to Success
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            We care about your <span className="text-blue-500">Health</span>
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Hospital care plays a crucial role in providing medical treatment,
            emergency services, and specialized care to patients. With advanced
            technology, skilled healthcare professionals, and compassionate
            support, hospitals ensure the well-being of individuals by
            diagnosing, treating, and preventing illnesses.
          </p>
          <div className="mt-10">
            <Link
              to={"/appoinment/:id"}
              className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Book the Appointment
            </Link>
          </div>
        </div>

        {/* Right Section - Doctor Image */}
        <div>
          <img
            src={doctor}
            alt="Doctor"
            className="w-[100px] md:w-[500px] lg:w-[600px] h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Sections with matching IDs */}
      <div id="about">
        <About />
      </div>
      <div id="service">
        <Service />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
