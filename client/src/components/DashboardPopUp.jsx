import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hook/UseAuthContext";
import axios from "axios";

function PopUpForm({ onClose }) {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    drName: "",
    checkFor: "",
    timeSlot: [],
    userid: "",  // Initialize with an empty string or a default value
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Set the initial form data once the user is available
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        userid: user.user.id,  // Safely set userid once user is available
      }));
    }
  }, [user]);  // Run this effect only when 'user' changes

  // Generate random time slots between 9 AM and 9 PM
  useEffect(() => {
    const generateTimeSlots = () => {
      const startTime = 9; // 9:00 AM
      const endTime = 21; // 9:00 PM
      const slots = new Set();

      while (slots.size < 4) {
        let randomHour = Math.floor(
          Math.random() * (endTime - startTime) + startTime
        );
        let randomMinutes = Math.random() < 0.5 ? "00" : "30";
        let period = randomHour >= 12 ? "PM" : "AM";
        let formattedHour = randomHour > 12 ? randomHour - 12 : randomHour;
        let timeSlot = `${formattedHour}:${randomMinutes} ${period}`;
        slots.add(timeSlot);
      }

      setAvailableSlots([...slots].sort());
    };

    generateTimeSlots();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("uSERFROM",formData)

  const handleTimeSlotChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      timeSlot: checked
        ? [...prevData.timeSlot, value]
        : prevData.timeSlot.filter((slot) => slot !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.log("User is not authenticated!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.SERVER_ADDRESS}/api/doc/slot`,
        formData
      );
      console.log("Bus details added successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.log("Error while submitting form:", error);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Add Bus Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="drName"
            placeholder="Doctor Name"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded"
            required
          />
          <input
            type="text"
            name="checkFor"
            placeholder="Checkup For"
            onChange={handleChange}
            className="w-full p-2 border border-blue-300 rounded"
            required
          />

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              Select Available Time Slots:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <label key={slot} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={slot}
                    checked={formData.timeSlot.includes(slot)}
                    onChange={handleTimeSlotChange}
                    className="h-4 w-4"
                  />
                  <span className="text-gray-700">{slot}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUpForm;
