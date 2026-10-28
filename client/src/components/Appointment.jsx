import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Appointment() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    department: "",
    doctor: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        alert(`Success! Appointment saved for ${formData.patientName}!`);
        setFormData({ ...formData, phone: "", date: "", department: "", doctor: "", message: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error booking appointment", error);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Make an <span className="text-cyan-600 underline decoration-4 underline-offset-8">Appointment</span></h2>
            <p className="text-gray-500">Please fill out the form below to book your appointment with our specialized doctors.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Patient Name" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-gray-600" />
              
              {/* 7 Departments */}
              <select name="department" value={formData.department} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-gray-600">
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Oncology">Oncology</option>
              </select>

              {/* 7 Doctors */}
              <select name="doctor" value={formData.doctor} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-gray-600">
                <option value="">Select Doctor</option>
                <option value="Dr. Walter White">Dr. Walter White (Cardiology)</option>
                <option value="Dr. Sarah Smith">Dr. Sarah Smith (Neurology)</option>
                <option value="Dr. John Doe">Dr. John Doe (Pediatrics)</option>
                <option value="Dr. Emily Chen">Dr. Emily Chen (Orthopedics)</option>
                <option value="Dr. Michael Brown">Dr. Michael Brown (Dermatology)</option>
                <option value="Dr. Jessica Taylor">Dr. Jessica Taylor (Gynecology)</option>
                <option value="Dr. David Wilson">Dr. David Wilson (Oncology)</option>
              </select>
            </div>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Additional Message (Optional)" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none"></textarea>
            <div className="text-center pt-4">
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-10 rounded-full transition-colors shadow-lg shadow-cyan-600/30">Book Appointment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}