import { FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingPlacement } from "../hook/UseBooking";
import { useAuthContext } from "../hook/UseAuthContext";
import axios from 'axios';
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const { BookingPlacement, dispatch } = useBookingPlacement();
  const [productForUser, setProductForUser] = useState([]);
  const { user } = useAuthContext();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");

    // Update auth context
    dispatch({ type: "LOGOUT" });

    // Redirect to login page (optional)
    navigate("/login");
  };
  // Handle Delete Booking
  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await axios.delete(
          `${process.env.SERVER_ADDRESS}/api/booking/appointments/${bookingId}`,
          {
            headers: { 
              'Authorization': `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Delete successful:', response);
        setProductForUser((prevBookings) => 
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } catch (error) {
        console.error('Error deleting the order:', error);
      }
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user.token) {
        console.error("No user or token available");
        return;
      }
  
      try {
        const response = await fetch(`${process.env.SERVER_ADDRESS}/api/booking/appointments`, {
          method: 'GET',
          headers: { 
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched booking data:", data);
  
        // If the response structure has a key 'appointments', use it. 
        // Otherwise, directly use the fetched data.
        if (data.appointments) {
          setProductForUser(data.appointments); 
        } else {
          setProductForUser(data);  // If the data is already an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchBookings();
  }, [user]);
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 pt-6">
      <div className="w-2/3 mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-800">Guest User</h2>
            <p className="text-gray-600 text-lg">Welcome to your profile!</p>
            <p className="text-sm text-gray-500">{user?.user.email || "No Email Address"}</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Booked Appointments Section */}
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800">Your Appointments</h3>
          <ul className="mt-4 text-gray-700">
            {productForUser.length > 0 ? (
              productForUser.map((booking) => (
                <li key={booking._id} className="flex justify-between items-center bg-white p-4 my-3 rounded-lg shadow-sm transition duration-300 ease-in-out hover:bg-gray-100">
                  <span className="text-gray-800">
                    {booking.name} - <strong>{booking.date}</strong> at <strong>{booking.time}</strong>
                  </span>
                  <button 
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">You have no appointments booked yet.</p>
            )}
          </ul>
        </div>

        {/* Social Media Links (Optional) */}
        <div className="mt-6 flex justify-center space-x-6">
          <a href="https://twitter.com" target="_blank" className="text-blue-500 hover:text-blue-700">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin size={24} />
          </a>
          <a href="https://facebook.com" target="_blank" className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </a>
          <a href={`mailto:${user?.email}`} className="text-gray-600 hover:text-gray-800">
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
