import { useState } from "react";

export default function BedManagement() {
  const [activeTab, setActiveTab] = useState("beds");

  // 1. Bed Data
  const [beds, setBeds] = useState([
    { id: "B01", ward: "General", status: "Occupied", patient: "Rahul Sharma" },
    { id: "B02", ward: "General", status: "Available", patient: "" },
    { id: "B03", ward: "General", status: "Available", patient: "" },
    { id: "B04", ward: "General", status: "Available", patient: "" },
    { id: "I01", ward: "ICU", status: "Occupied", patient: "Amit Patel" },
    { id: "I02", ward: "ICU", status: "Available", patient: "" },
    { id: "V01", ward: "VIP", status: "Occupied", patient: "Suresh Desai" },
    { id: "V02", ward: "VIP", status: "Available", patient: "" },
  ]);

  // 2. IPD Data
  const [ipdPatients, setIpdPatients] = useState([
    { id: "IPD101", name: "Rahul Sharma", age: 45, doctor: "Dr. Walter White", bed: "B01 (General)", date: "2026-10-25" },
    { id: "IPD102", name: "Amit Patel", age: 60, doctor: "Dr. Sarah Smith", bed: "I01 (ICU)", date: "2026-10-26" },
    { id: "IPD103", name: "Suresh Desai", age: 55, doctor: "Dr. John Doe", bed: "V01 (VIP)", date: "2026-10-27" },
  ]);

  // 3. OPD Data
  const [opdPatients, setOpdPatients] = useState([
    { id: "OPD201", name: "Neha Gupta", age: 28, doctor: "Dr. Walter White", time: "10:30 AM", status: "Waiting" },
    { id: "OPD202", name: "Kiran Rao", age: 34, doctor: "Dr. Sarah Smith", time: "11:00 AM", status: "Consulting" },
  ]);

  // Modal States
  const [showIpdForm, setShowIpdForm] = useState(false);
  const [showOpdForm, setShowOpdForm] = useState(false);

  // Form States
  const [newIpd, setNewIpd] = useState({ name: "", age: "", doctor: "", bedId: "" });
  const [newOpd, setNewOpd] = useState({ name: "", age: "", doctor: "", time: "", status: "Waiting" });

  // IPD Admit Logic (Sync with Bed)
  const handleAdmitPatient = (e) => {
    e.preventDefault();
    if (!newIpd.bedId) return alert("Please select an available bed!");

    // Bed detail banavva mate
    const selectedBed = beds.find(b => b.id === newIpd.bedId);
    const bedString = `${selectedBed.id} (${selectedBed.ward})`;
    const today = new Date().toISOString().split('T')[0];
    const newId = "IPD" + Math.floor(Math.random() * 1000);

    const newPatient = {
      id: newId, name: newIpd.name, age: newIpd.age, doctor: newIpd.doctor, bed: bedString, date: today
    };

    // 1. IPD List ma add karo
    setIpdPatients([...ipdPatients, newPatient]);
    
    // 2. Bed Status ne 'Occupied' karo
    setBeds(beds.map(b => b.id === newIpd.bedId ? { ...b, status: "Occupied", patient: newIpd.name } : b));
    
    setShowIpdForm(false);
    setNewIpd({ name: "", age: "", doctor: "", bedId: "" });
  };

  // IPD Discharge Logic (Sync with Bed)
  const handleDischarge = (patientId, bedInfo) => {
    if (window.confirm("Are you sure you want to discharge this patient?")) {
      setIpdPatients(ipdPatients.filter((p) => p.id !== patientId));
      
      const bedId = bedInfo.split(" ")[0];
      setBeds(beds.map(b => b.id === bedId ? { ...b, status: "Available", patient: "" } : b));
    }
  };

  // OPD Add Logic
  const handleNewOpd = (e) => {
    e.preventDefault();
    const newId = "OPD" + Math.floor(Math.random() * 1000);
    setOpdPatients([...opdPatients, { id: newId, ...newOpd }]);
    setShowOpdForm(false);
    setNewOpd({ name: "", age: "", doctor: "", time: "", status: "Waiting" });
  };

  // OPD Status Change Logic (Queue progress karva)
  const handleOpdStatusChange = (id, newStatus) => {
    setOpdPatients(opdPatients.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            🏥 Bed, OPD & IPD Management
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Manage hospital admissions, bed availability, and outpatient queues.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 border-b pb-4">
          <button onClick={() => setActiveTab("beds")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'beds' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            🛏️ Bed Status
          </button>
          <button onClick={() => setActiveTab("ipd")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'ipd' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            🏨 IPD (Admitted)
          </button>
          <button onClick={() => setActiveTab("opd")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'opd' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            🩺 OPD (Queue)
          </button>
        </div>

        {/* TAB 1: BED STATUS */}
        {activeTab === "beds" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beds.map((bed) => (
              <div key={bed.id} className={`p-6 rounded-2xl border-2 transition-all shadow-sm ${bed.status === 'Available' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-black text-gray-800">{bed.id}</span>
                    <p className="text-sm font-bold text-gray-500 uppercase">{bed.ward} WARD</p>
                  </div>
                  <span className="text-3xl">{bed.status === 'Available' ? '🛏️' : '🛌'}</span>
                </div>
                
                {bed.status === 'Available' ? (
                  <div className="mt-4 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold inline-block">
                    Available to Admit
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-xs text-red-400 font-bold uppercase mb-1">Occupied By</p>
                    <p className="font-bold text-red-700">{bed.patient}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: IPD (INPATIENT DEPARTMENT) */}
        {activeTab === "ipd" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-700">Admitted Patients (IPD)</h3>
              <button 
                onClick={() => setShowIpdForm(true)}
                className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors shadow-md"
              >
                + Admit Patient
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b">
                  <tr>
                    <th className="p-5">Patient Details</th>
                    <th className="p-5">Attending Doctor</th>
                    <th className="p-5 text-center">Bed Allocated</th>
                    <th className="p-5 text-center">Admit Date</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ipdPatients.length === 0 ? <tr><td colSpan="5" className="p-8 text-center text-gray-500 font-bold">No patients admitted.</td></tr> : null}
                  {ipdPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50">
                      <td className="p-5">
                        <div className="font-bold text-gray-900">{patient.name}</div>
                        <div className="text-xs text-gray-500">ID: {patient.id} | Age: {patient.age}</div>
                      </td>
                      <td className="p-5 font-medium text-cyan-600">{patient.doctor}</td>
                      <td className="p-5 text-center">
                        <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-lg text-sm border border-orange-200">{patient.bed}</span>
                      </td>
                      <td className="p-5 text-center text-sm font-medium text-gray-600">{patient.date}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => handleDischarge(patient.id, patient.bed)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold px-4 py-2 rounded-lg border border-red-100 transition-all text-sm">
                          Discharge
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: OPD (OUTPATIENT DEPARTMENT) */}
        {activeTab === "opd" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-700">Today's OPD Queue</h3>
              <button 
                onClick={() => setShowOpdForm(true)}
                className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors shadow-md"
              >
                + New OPD Entry
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b">
                  <tr>
                    <th className="p-5">Patient Details</th>
                    <th className="p-5">Consulting Doctor</th>
                    <th className="p-5 text-center">Time Slot</th>
                    <th className="p-5 text-center">Queue Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {opdPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-slate-50">
                      <td className="p-5">
                        <div className="font-bold text-gray-900">{patient.name}</div>
                        <div className="text-xs text-gray-500">ID: {patient.id} | Age: {patient.age}</div>
                      </td>
                      <td className="p-5 font-medium text-cyan-600">{patient.doctor}</td>
                      <td className="p-5 text-center text-sm font-bold text-gray-700">{patient.time}</td>
                      <td className="p-5 text-center">
                        {/* Status Change Dropdown */}
                        <select 
                          value={patient.status}
                          onChange={(e) => handleOpdStatusChange(patient.id, e.target.value)}
                          className={`font-bold px-3 py-1.5 rounded-lg text-sm border cursor-pointer outline-none ${
                            patient.status === 'Waiting' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                            patient.status === 'Consulting' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                            'bg-emerald-50 text-emerald-600 border-emerald-200'
                          }`}
                        >
                          <option value="Waiting">Waiting</option>
                          <option value="Consulting">Consulting</option>
                          <option value="Done">Done</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* IPD Admit Modal */}
      {showIpdForm && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h3 className="text-xl font-bold">Admit New Patient</h3>
              <button onClick={() => setShowIpdForm(false)} className="text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
            </div>
            <form onSubmit={handleAdmitPatient} className="flex flex-col gap-4">
              <input type="text" placeholder="Patient Name" required value={newIpd.name} onChange={(e) => setNewIpd({...newIpd, name: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500" />
              <input type="number" placeholder="Age" required value={newIpd.age} onChange={(e) => setNewIpd({...newIpd, age: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500" />
              
              <select required value={newIpd.doctor} onChange={(e) => setNewIpd({...newIpd, doctor: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 bg-white">
                <option value="" disabled>Select Attending Doctor</option>
                <option value="Dr. Walter White">Dr. Walter White (Cardiology)</option>
                <option value="Dr. Sarah Smith">Dr. Sarah Smith (Neurology)</option>
                <option value="Dr. John Doe">Dr. John Doe (Pediatrics)</option>
              </select>

              <select required value={newIpd.bedId} onChange={(e) => setNewIpd({...newIpd, bedId: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 bg-white">
                <option value="" disabled>Select Available Bed</option>
                {/* Khali available beds j batavse */}
                {beds.filter(b => b.status === "Available").map(bed => (
                  <option key={bed.id} value={bed.id}>{bed.id} - {bed.ward} Ward</option>
                ))}
              </select>
              
              <button type="submit" className="bg-cyan-600 text-white font-bold py-3 mt-2 rounded-xl hover:bg-cyan-700 transition-colors">
                Admit Patient
              </button>
            </form>
          </div>
        </div>
      )}

      {/* OPD Entry Modal */}
      {showOpdForm && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h3 className="text-xl font-bold">New OPD Entry</h3>
              <button onClick={() => setShowOpdForm(false)} className="text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
            </div>
            <form onSubmit={handleNewOpd} className="flex flex-col gap-4">
              <input type="text" placeholder="Patient Name" required value={newOpd.name} onChange={(e) => setNewOpd({...newOpd, name: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500" />
              <input type="number" placeholder="Age" required value={newOpd.age} onChange={(e) => setNewOpd({...newOpd, age: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500" />
              
              <select required value={newOpd.doctor} onChange={(e) => setNewOpd({...newOpd, doctor: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 bg-white">
                <option value="" disabled>Select Consulting Doctor</option>
                <option value="Dr. Walter White">Dr. Walter White</option>
                <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                <option value="Dr. John Doe">Dr. John Doe</option>
              </select>

              <input type="text" placeholder="Time Slot (e.g. 10:30 AM)" required value={newOpd.time} onChange={(e) => setNewOpd({...newOpd, time: e.target.value})} className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500" />
              
              <button type="submit" className="bg-cyan-600 text-white font-bold py-3 mt-2 rounded-xl hover:bg-cyan-700 transition-colors">
                Add to Queue
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}