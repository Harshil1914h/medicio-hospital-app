import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


export default function MyAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/my-appointments/${user.email}`);
        const data = await response.json();
        
        if (response.ok) {
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchAppointments();
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/cancel/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Remove the cancelled appointment from the local state
          setAppointments(appointments.filter(apt => apt._id !== id));
          alert("Appointment cancelled successfully.");
        } else {
          alert("Failed to cancel appointment.");
        }
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        alert("An error occurred while cancelling.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">My Appointments</h2>
        
        {loading ? (
          <div className="text-center text-cyan-600 font-bold mt-10">Loading your appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">You haven't booked any appointments yet.</p>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-full">Book Now</button>
          </div>
        ) : (
          <div className="bg-white shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <li key={apt._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    {/* Display Patient Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Patient: {apt.name || user.name || "Unknown"}
                    </h3>
                    <p className="text-md font-semibold text-gray-700">Doctor: {apt.doctor}</p>
                    <p className="text-sm font-semibold text-cyan-600 mb-1">{apt.department}</p>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(apt.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.status}
                    </span>
                    {/* Cancel Button */}
                    <button 
                      onClick={() => handleCancel(apt._id)}
                      className="text-sm text-red-500 hover:text-red-700 font-semibold underline mt-2"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}