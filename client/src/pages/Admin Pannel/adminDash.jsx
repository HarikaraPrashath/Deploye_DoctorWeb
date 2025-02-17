import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopUpFrom from "../../components/DashboardPopUp";
import { useAuthContext } from "../../hook/UseAuthContext";

function Dashboard() {
  const [usersCount, setUserCount] = useState([]);  // Updated state variable name
  const { user ,dispatch} = useAuthContext();
  const { id } = useParams();
  const [PopUp, setPopUp] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = usersCount.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(usersCount.length / itemsPerPage)) {  // Use usersCount.length
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");

    // Update auth context
    dispatch({ type: "LOGOUT" });

    // Redirect to login page (optional)
    navigate("/login");
  };

  useEffect(() => {
    
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${process.env.SERVER_ADDRESS}/api/doc/slots`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched booking data:", data);
  
        if (data.appointments) {
          setUserCount(data.appointments);
        } else {
          setUserCount(data); // If the data is already an array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDoctor();
  }, [user]); // Re-run the effect when the `user` object changes
  

  // Delete function
  const deleteDoc = async (id) => {
    try {
      // Make the API request to delete the doctor entry
      const response = await fetch(`http://localhost:5000/api/doc/slot/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }

      // Filter out the deleted doctor from the state
      setUserCount((prevUsers) => prevUsers.filter((user) => user._id !== id));

      console.log('Doctor deleted successfully');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 p-10">
      <h2 className="text-5xl font-bold text-white text-center mb-6">
        Welcome, Admin Super!
      </h2>
      <p className="text-lg text-gray-200 text-center mb-8">
        Manage all profiles and booking details here.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setPopUp(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Add New Doc Details
          </button>
          <div className="relative w-1/4">
          <button
           onClick={handleLogout}
            className=" bg-red-600 p-3  text-white font-semibold text-sm rounded-lg shadow-md hover:bg-red-700 transition"
          >
           Logout
          </button>
          </div>
        </div>

        {PopUp && <PopUpFrom onClose={() => setPopUp(false)} />}

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Dr Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Check-up For</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time Slots</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((result) => (
                <tr
                  key={result._id}
                  className="border-t even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {result._id}
                  </td>
                  <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                    {result.drName}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {result.checkFor}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {result.timeSlot}
                  </td>
                  <td className="px-6 py-3 text-center">
                  <button
                      onClick={() => deleteDoc(result._id)} // Call deleteDoc with the doctor's ID
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevPage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {Math.ceil(usersCount.length / itemsPerPage)}  {/* Use usersCount */}
          </span>
          <button
            onClick={handleNextPage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={currentPage === Math.ceil(usersCount.length / itemsPerPage)}  
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
