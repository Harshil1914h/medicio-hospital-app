import { useState } from "react";

export default function DoctorSchedule() {
  // 1. આપણી વેબસાઈટના અસલી 7 ડોક્ટર્સનો ડેટા (જેથી ફોર્મમાં ડ્રોપડાઉન બની શકે)
  const ourDoctors = [
    { id: 1, name: "Dr. Walter White", dept: "Cardiology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150" },
    { id: 2, name: "Dr. Sarah Smith", dept: "Neurology", image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Dr. John Doe", dept: "Pediatrics", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" },
    { id: 4, name: "Dr. Emily Chen", dept: "Dermatology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" },
    { id: 5, name: "Dr. Michael Brown", dept: "Orthopedics", image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=150" },
    { id: 6, name: "Dr. Lisa Wong", dept: "Gynecology", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=150" },
    { id: 7, name: "Dr. David Miller", dept: "General Surgery", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150" },
  ];

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // 2. ટેબલમાં દેખાતું હાલનું શિડ્યુલ (શરૂઆતથી જ 3 ડોક્ટર્સ લોડ રાખ્યા છે)
  const [schedules, setSchedules] = useState([
    { 
      id: 101, name: "Dr. Walter White", dept: "Cardiology", image: ourDoctors[0].image, 
      times: ["09:00 - 12:00", "09:00 - 12:00", "09:00 - 12:00", "09:00 - 12:00", "09:00 - 12:00", "-", "-"], 
      color: "bg-blue-100 text-blue-700 border-blue-200" 
    },
    { 
      id: 102, name: "Dr. Sarah Smith", dept: "Neurology", image: ourDoctors[1].image, 
      times: ["10:00 - 01:00", "-", "10:00 - 01:00", "-", "10:00 - 01:00", "-", "-"], 
      color: "bg-emerald-100 text-emerald-700 border-emerald-200" 
    },
    { 
      id: 103, name: "Dr. John Doe", dept: "Pediatrics", image: ourDoctors[2].image, 
      times: ["02:00 - 05:00", "02:00 - 05:00", "-", "02:00 - 05:00", "02:00 - 05:00", "-", "-"], 
      color: "bg-purple-100 text-purple-700 border-purple-200" 
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 3. ફોર્મનો નવો State (Doctor ID, Time, અને Selected Days સાથે)
  const [newDoc, setNewDoc] = useState({
    doctorId: "", time: "", selectedDays: [], color: "bg-cyan-100 text-cyan-700 border-cyan-200"
  });

  // દિવસો સિલેક્ટ કરવા માટેનું ફંક્શન
  const toggleDay = (day) => {
    setNewDoc((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day) // જો પહેલેથી સિલેક્ટ હોય તો કાઢી નાખો
        : [...prev.selectedDays, day] // ના હોય તો ઉમેરો
    }));
  };

  // ફોર્મ સેવ કરવા માટેનું ફંક્શન
  const handleAddSchedule = (e) => {
    e.preventDefault();
    
    // યુઝરે જે ડોક્ટર સિલેક્ટ કર્યો છે તેની પૂરી વિગતો ગોતો
    const selectedDoctor = ourDoctors.find((doc) => doc.id.toString() === newDoc.doctorId);
    if (!selectedDoctor) return;

    // ટેબલ માટે અઠવાડિયાનો એરે બનાવો (જે દિવસ સિલેક્ટ કર્યો હોય ત્યાં ટાઈમ, બાકી ડેશ '-')
    const finalTimes = daysList.map((day) => 
      newDoc.selectedDays.includes(day) ? newDoc.time : "-"
    );

    const newSchedule = {
      id: Date.now(),
      name: selectedDoctor.name,
      dept: selectedDoctor.dept, // ડિપાર્ટમેન્ટ ઓટોમેટિક આવી ગયું
      image: selectedDoctor.image, // ફોટો ઓટોમેટિક આવી ગયો
      times: finalTimes,
      color: newDoc.color
    };

    setSchedules([...schedules, newSchedule]);
    
    // ફોર્મ રિસેટ કરો
    setNewDoc({ doctorId: "", time: "", selectedDays: [], color: "bg-cyan-100 text-cyan-700 border-cyan-200" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this schedule?")) {
        setSchedules(schedules.filter((doc) => doc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="bg-cyan-100 text-cyan-600 p-2 rounded-xl text-2xl shadow-sm">📅</span> 
              Doctor Schedule
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">Manage specific timings and days for our specialized doctors.</p>
          </div>
          
          {/* Add Schedule Button પાછું આવી ગયું */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-500/30 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <span>+</span> Assign New Schedule
          </button>
        </div>

        {/* Schedule Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="px-8 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider w-72">Doctor Details</th>
                  {daysList.map((day, i) => (
                    <th key={i} className="px-4 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">{day}</th>
                  ))}
                  <th className="px-6 py-5 text-sm font-bold text-gray-600 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {schedules.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={doc.image} alt={doc.name} 
                          className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white ring-2 ring-gray-100"
                        />
                        <div>
                          <div className="font-bold text-gray-900 text-md">{doc.name}</div>
                          <div className="text-xs font-medium text-cyan-600">{doc.dept}</div>
                        </div>
                      </div>
                    </td>
                    
                    {doc.times.map((time, i) => (
                      <td key={i} className="px-2 py-4 text-center">
                        {time !== "-" ? (
                          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold border shadow-sm ${doc.color}`}>
                            {time}
                          </span>
                        ) : (
                          <span className="inline-block w-8 h-1 bg-gray-200 rounded-full"></span>
                        )}
                      </td>
                    ))}
                    
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SMART Add Schedule Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">Assign Schedule</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
              >✕</button>
            </div>
            
            <form onSubmit={handleAddSchedule} className="p-6 space-y-6">
              
              {/* 1. Select Doctor Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Doctor</label>
                <select 
                  required value={newDoc.doctorId} onChange={(e) => setNewDoc({...newDoc, doctorId: e.target.value})}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all cursor-pointer bg-white"
                >
                  <option value="" disabled>-- Choose a Doctor --</option>
                  {ourDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>{doc.name} ({doc.dept})</option>
                  ))}
                </select>
              </div>

              {/* 2. Specific Time Input */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Time Slot</label>
                <input 
                  type="text" required placeholder="e.g. 09:30 AM - 12:30 PM"
                  value={newDoc.time} onChange={(e) => setNewDoc({...newDoc, time: e.target.value})}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all"
                />
              </div>

              {/* 3. Multi-Select Days (Checkboxes) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Available Days</label>
                <div className="flex flex-wrap gap-3">
                  {daysList.map((day) => (
                    <label 
                      key={day} 
                      className={`cursor-pointer px-4 py-2 border-2 rounded-xl text-sm font-medium transition-all ${
                        newDoc.selectedDays.includes(day) 
                        ? "bg-cyan-50 border-cyan-500 text-cyan-700 shadow-sm" 
                        : "border-gray-100 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <input 
                        type="checkbox" className="hidden"
                        checked={newDoc.selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Color Options */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Schedule Color Tag</label>
                <select 
                  value={newDoc.color} onChange={(e) => setNewDoc({...newDoc, color: e.target.value})}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all cursor-pointer bg-white"
                >
                  <option value="bg-cyan-100 text-cyan-700 border-cyan-200">Cyan Highlight</option>
                  <option value="bg-blue-100 text-blue-700 border-blue-200">Blue Highlight</option>
                  <option value="bg-emerald-100 text-emerald-700 border-emerald-200">Green Highlight</option>
                  <option value="bg-orange-100 text-orange-700 border-orange-200">Orange Highlight</option>
                  <option value="bg-purple-100 text-purple-700 border-purple-200">Purple Highlight</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={newDoc.selectedDays.length === 0}
                  className="flex-1 bg-cyan-600 text-white font-bold py-3 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}