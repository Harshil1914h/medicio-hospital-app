import { useState } from "react";

export default function PatientManagement() {
  // 1. Patient Data (Dummy Data)
  const [patients, setPatients] = useState([
    { id: "PT1001", name: "Rahul Sharma", age: 45, gender: "Male", bloodGroup: "O+", phone: "9876543210", history: "Hypertension, Diabetes Type 2. Currently on Metformin." },
    { id: "PT1002", name: "Amit Patel", age: 60, gender: "Male", bloodGroup: "A+", phone: "9822233344", history: "Previous heart attack (2022). Taking blood thinners." },
    { id: "PT1003", name: "Neha Gupta", age: 28, gender: "Female", bloodGroup: "B+", phone: "9988776655", history: "No major past illness. Mild asthma." },
    { id: "PT1004", name: "Suresh Desai", age: 55, gender: "Male", bloodGroup: "AB+", phone: "9766554433", history: "Chronic back pain. Mild arthritis." },
  ]);

  // States for Search, Modals, and Form
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // Medical History જોવા માટે

  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "", bloodGroup: "", phone: "", history: "" });

  // પેશન્ટ સર્ચ કરવાનું લોજીક
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // નવો પેશન્ટ એડ કરવાનું ફંક્શન
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newId = "PT" + Math.floor(Math.random() * 9000 + 1000); // Generate Random ID (e.g. PT4592)
    
    setPatients([...patients, { id: newId, ...newPatient }]);
    setShowAddForm(false);
    setNewPatient({ name: "", age: "", gender: "", bloodGroup: "", phone: "", history: "" });
    alert("New Patient Registered Successfully with ID: " + newId);
  };

  // પેશન્ટ ડીલીટ કરવાનું ફંક્શન
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this patient record?")) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="bg-cyan-100 text-cyan-600 p-2 rounded-xl text-2xl shadow-sm">👥</span> 
              Patient Management
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Manage patient registrations and medical records.</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search by Name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 w-full md:w-64"
            />
            {/* Add Patient Button */}
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 whitespace-nowrap"
            >
              + Add Patient
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-100">
                <tr>
                  <th className="p-5">Patient Details</th>
                  <th className="p-5 text-center">Gender / Age</th>
                  <th className="p-5 text-center">Blood Group</th>
                  <th className="p-5 text-center">Contact</th>
                  <th className="p-5 text-center">Medical History</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPatients.length === 0 ? (
                  <tr><td colSpan="6" className="p-10 text-center text-gray-500 font-bold">No patients found.</td></tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5">
                        <div className="font-bold text-gray-900 text-base">{patient.name}</div>
                        <div className="text-xs font-semibold text-cyan-600 bg-cyan-50 inline-block px-2 py-1 rounded mt-1">
                          ID: {patient.id}
                        </div>
                      </td>
                      <td className="p-5 text-center font-medium text-gray-700">
                        {patient.gender}, {patient.age} Yrs
                      </td>
                      <td className="p-5 text-center">
                        <span className="bg-red-50 text-red-600 font-bold px-3 py-1 rounded-lg border border-red-100">
                          {patient.bloodGroup}
                        </span>
                      </td>
                      <td className="p-5 text-center font-medium text-gray-600">
                        {patient.phone}
                      </td>
                      <td className="p-5 text-center">
                        <button 
                          onClick={() => setSelectedPatient(patient)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                          View History
                        </button>
                      </td>
                      <td className="p-5 text-center">
                        <button 
                          onClick={() => handleDelete(patient.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold"
                          title="Delete Patient"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL 1: Add New Patient Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Register New Patient</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-red-500 text-3xl font-bold transition-colors">×</button>
            </div>
            
            <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input type="text" required placeholder="e.g. John Doe" value={newPatient.name} onChange={(e) => setNewPatient({...newPatient, name: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500" />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Age</label>
                <input type="number" required placeholder="e.g. 35" value={newPatient.age} onChange={(e) => setNewPatient({...newPatient, age: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Gender</label>
                <select required value={newPatient.gender} onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Blood Group</label>
                <select required value={newPatient.bloodGroup} onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                  <option value="" disabled>Select Blood Group</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Contact Number</label>
                <input type="tel" required placeholder="10-digit mobile number" value={newPatient.phone} onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Past Medical History (Optional)</label>
                <textarea rows="3" placeholder="Any allergies, past surgeries, or chronic illnesses..." value={newPatient.history} onChange={(e) => setNewPatient({...newPatient, history: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 resize-none"></textarea>
              </div>
              
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30">
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: View Medical History */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h3>
                <p className="text-sm font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded inline-block mt-1">ID: {selectedPatient.id}</p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-red-500 text-3xl font-bold leading-none">×</button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm mb-4 border-b pb-4">
                <div><span className="text-gray-500 font-bold block">Age / Gender</span><span className="font-semibold">{selectedPatient.age} Yrs, {selectedPatient.gender}</span></div>
                <div><span className="text-gray-500 font-bold block">Blood Group</span><span className="font-semibold text-red-600">{selectedPatient.bloodGroup}</span></div>
                <div className="col-span-2"><span className="text-gray-500 font-bold block">Contact</span><span className="font-semibold">{selectedPatient.phone}</span></div>
              </div>
              <div>
                <span className="text-gray-500 font-bold block mb-2">Medical History Details:</span>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {selectedPatient.history ? selectedPatient.history : "No significant medical history recorded."}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedPatient(null)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}