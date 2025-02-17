import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hook/UseAuthContext";
import { useBookingPlacement } from "../hook/UseBooking";

function Appointment() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = useBookingPlacement();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_ADDRESS}/api/doc/slots`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDoctor();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const bookingData = { name, age, mail, mobile, date, time };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/booking/appointments",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log(response)
      // Remove booked slot from appointments
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === selectedAppointmentId
            ? {
                ...appointment,
                timeSlot: appointment.timeSlot.filter((slot) => slot !== time),
              }
            : appointment
        )
      );

      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setEmptyFields(error.response?.data?.emptyFields || []);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-400 flex">
      <div className="w-full bg-white shadow-lg overflow-hidden flex">
        <div className="w-1/3 bg-blue-800 rounded-r-3xl text-white p-6">
          <h1 className="text-2xl font-bold border-b pb-2 mb-4">Categories</h1>
          <ul className="space-y-2">
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Cardiology</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Neurology</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Pediatrics</li>
            <li className="hover:bg-blue-700 p-2 rounded cursor-pointer">Orthopedics</li>
          </ul>
        </div>

        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">Available Doctors</h1>
          {appointments.map((appointment) => (
            <div key={appointment._id} className="shadow-lg w-full p-6 bg-white rounded-lg flex items-center space-x-6 mb-6 border border-gray-200 transition hover:shadow-xl">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{appointment.drName}</h2>
                <h6 className="text-md text-gray-500">{appointment.checkFor}</h6>
                <p className="text-gray-600 mt-2">Our Doctor Appointment Booking System is designed to make healthcare access seamless and efficient.</p>
                <button
                  onClick={() => {
                    setSelectedAppointmentId(appointment._id);
                    setShowModal(true);
                    setTime("");
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Patient Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded mb-2" />
              <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border p-2 rounded mb-2" />
              <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="w-full border p-2 rounded mb-2" />
              <input type="tel" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border p-2 rounded mb-2" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded mb-2" />
              <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border p-2 rounded mb-2">
                <option value="">Select a time slot</option>
                {appointments.find((appt) => appt._id === selectedAppointmentId)?.timeSlot.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              <div className="flex justify-end mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointment;
