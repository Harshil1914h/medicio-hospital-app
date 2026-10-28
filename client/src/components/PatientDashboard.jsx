import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function PatientDashboard() {
  const { user } = useAuth();
  const patientName = user?.name || "Harshil"; 

  const [activeTab, setActiveTab] = useState("appointments");
  const [viewInvoice, setViewInvoice] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [viewReportModal, setViewReportModal] = useState(null);

  // States for Data
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labReports, setLabReports] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Appointment Form State
  const [newApt, setNewApt] = useState({ doctor: "Dr. Walter White", dept: "Cardiology", date: "", time: "10:00 AM" });

  // Fetch Data from Backend (MongoDB) or Fallback to Demo Data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        
        // Try fetching from backend, if backend is not running, fallback to dummy data so UI doesn't break
        try {
          const aptRes = await axios.get(`http://localhost:5000/api/appointments/patient/${user?.id || '1'}`);
          if(aptRes.data && aptRes.data.length > 0) {
            setAppointments(aptRes.data);
          } else {
            throw new Error("No data");
          }
        } catch (err) {
          // Fallback dummy data if backend API is not ready yet
          setAppointments([
            { id: "APT001", doctor: "Dr. Walter White", dept: "Cardiology", date: "2026-10-30", time: "10:30 AM", status: "Upcoming" },
            { id: "APT002", doctor: "Dr. Sarah Smith", dept: "Neurology", date: "2026-09-15", time: "11:00 AM", status: "Completed" },
          ]);
        }

        // Prescriptions
        setPrescriptions([
          {
            id: "PRX-101", doctor: "Dr. Sarah Smith", date: "2026-09-15",
            notes: "Take complete rest. Avoid oily food.",
            medicines: [
              { name: "Paracetamol 500mg", dosage: "1-0-1", duration: "5 Days", instruction: "After meals" },
              { name: "Amoxicillin", dosage: "1-0-1", duration: "5 Days", instruction: "After meals" }
            ]
          }
        ]);

        // Lab Reports
        setLabReports([
          { 
            id: "REP-01", name: "Complete Blood Count (CBC)", date: "2026-09-15", lab: "Medicio Diagnostic Lab", status: "Normal",
            results: [
              { parameter: "Hemoglobin (Hb)", value: "13.5 g/dL", normalRange: "13.0 - 17.0 g/dL" },
              { parameter: "WBC Count", value: "7,200 /µL", normalRange: "4,000 - 11,000 /µL" },
              { parameter: "Platelets", value: "2.5 Lakhs/µL", normalRange: "1.5 - 4.5 Lakhs/µL" }
            ]
          }
        ]);

        // Bills
        setBills([
          { 
            id: "INV-20261001", date: "2026-09-15", doctor: "Dr. Sarah Smith", total: 1500, status: "Paid",
            breakdown: { consultation: 500, medicines: 1000, roomCharge: 0, otherCharges: 0, discount: 0 }
          }
        ]);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [user]);

  // Handle Book Appointment
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        patientName: patientName,
        doctor: newApt.doctor,
        dept: newApt.dept,
        date: newApt.date,
        time: newApt.time,
        status: "Upcoming"
      };

      try {
        const response = await axios.post("http://localhost:5000/api/appointments/book", appointmentData);
        setAppointments([response.data, ...appointments]);
      } catch (err) {
        // Fallback local state update if backend is off
        const localApt = { id: "APT00" + (appointments.length + 1), ...appointmentData };
        setAppointments([localApt, ...appointments]);
      }

      setShowAppointmentModal(false);
      setNewApt({ doctor: "Dr. Walter White", dept: "Cardiology", date: "", time: "10:00 AM" });
      alert("Appointment Booked Successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  // Handle Cancel Appointment (NEW)
  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.filter(apt => (apt._id || apt.id) !== id));
      alert("Appointment Cancelled Successfully!");
    }
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-cyan-600 font-bold text-xl">Loading Dashboard... ⏳</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Profile Vitals Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-cyan-900 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-2">Welcome back, {patientName}! 👋</h2>
              <p className="text-cyan-100 font-medium">Manage your health records, appointments, lab reports, and bills all in one place.</p>
            </div>
            <div className="mt-6 relative z-10">
              <button 
                onClick={() => setShowAppointmentModal(true)}
                className="bg-white text-cyan-900 hover:bg-cyan-50 font-extrabold px-6 py-3 rounded-xl transition-all shadow-md"
              >
                + Book New Appointment
              </button>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-cyan-700 rounded-full opacity-50 blur-2xl"></div>
          </div>

          {/* Health Vitals Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>❤️</span> Health Profile & Vitals
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-bold block text-xs uppercase">Blood Group</span>
                <span className="text-red-600 font-black text-lg">O+</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-bold block text-xs uppercase">Age / Gender</span>
                <span className="text-gray-800 font-bold">24 Yrs, Male</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-bold block text-xs uppercase">Weight / Height</span>
                <span className="text-gray-800 font-bold">68 kg / 5'10"</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                <span className="text-gray-400 font-bold block text-xs uppercase">Emergency Contact</span>
                <span className="text-gray-800 font-bold text-xs">9876543210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
          <button onClick={() => setActiveTab("appointments")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'appointments' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            📅 Appointments
          </button>
          <button onClick={() => setActiveTab("prescriptions")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'prescriptions' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            💊 Prescriptions
          </button>
          <button onClick={() => setActiveTab("reports")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'reports' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            🧪 Lab Reports
          </button>
          <button onClick={() => setActiveTab("bills")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'bills' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
            🧾 My Bills
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Appointment History</h3>
              <button onClick={() => setShowAppointmentModal(true)} className="text-cyan-600 hover:text-cyan-700 font-bold text-sm">+ Book New</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b">
                  <tr>
                    <th className="p-5">Doctor Details</th>
                    <th className="p-5 text-center">Date & Time</th>
                    <th className="p-5 text-center">Status</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.length === 0 ? (
                    <tr><td colSpan="4" className="p-10 text-center text-gray-500 font-bold">No appointments found.</td></tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt._id || apt.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-5">
                          <div className="font-bold text-gray-900">{apt.doctor}</div>
                          <div className="text-sm font-medium text-cyan-600">{apt.dept}</div>
                        </td>
                        <td className="p-5 text-center">
                          <div className="font-bold text-gray-800">{apt.date}</div>
                          <div className="text-sm text-gray-500">{apt.time}</div>
                        </td>
                        <td className="p-5 text-center">
                          <span className={`font-bold px-3 py-1 rounded-lg text-sm border ${apt.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-5 text-center">
                          {apt.status === 'Upcoming' && (
                            <button 
                              onClick={() => handleCancelAppointment(apt._id || apt.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold px-3 py-1.5 rounded-lg transition-colors text-xs border border-red-100"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PRESCRIPTIONS */}
        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-cyan-50/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Prescription by {rx.doctor}</h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">Date: {rx.date} | Ref: {rx.id}</p>
                  </div>
                  <button onClick={handleDownloadPdf} className="bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-sm">
                    ⬇️ Print / PDF
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-2">Doctor's Notes</span>
                    <p className="font-medium text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{rx.notes}</p>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-y">
                      <tr>
                        <th className="py-3 px-4">Medicine Name</th>
                        <th className="py-3 px-4 text-center">Dosage</th>
                        <th className="py-3 px-4 text-center">Duration</th>
                        <th className="py-3 px-4 text-center">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {rx.medicines.map((med, i) => (
                        <tr key={i}>
                          <td className="py-3 px-4 font-bold text-gray-800">{med.name}</td>
                          <td className="py-3 px-4 text-center font-medium text-gray-600">{med.dosage}</td>
                          <td className="py-3 px-4 text-center font-medium text-gray-600">{med.duration}</td>
                          <td className="py-3 px-4 text-center font-medium text-gray-600">{med.instruction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: LAB REPORTS */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">My Lab Test Reports</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b">
                  <tr>
                    <th className="p-5">Report Name</th>
                    <th className="p-5">Laboratory</th>
                    <th className="p-5 text-center">Date</th>
                    <th className="p-5 text-center">Status</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {labReports.map((rep) => (
                    <tr key={rep.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-gray-900">{rep.name}</td>
                      <td className="p-5 text-sm font-medium text-gray-600">{rep.lab}</td>
                      <td className="p-5 text-center text-sm font-medium text-gray-600">{rep.date}</td>
                      <td className="p-5 text-center">
                        <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-lg text-sm border border-emerald-200">
                          {rep.status}
                        </span>
                      </td>
                      <td className="p-5 text-center flex justify-center gap-2">
                        <button onClick={() => setViewReportModal(rep)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-3 py-2 rounded-lg transition-colors text-xs border border-blue-100">
                          👁️ View
                        </button>
                        <button onClick={handleDownloadPdf} className="bg-gray-50 text-gray-600 hover:bg-gray-600 hover:text-white font-bold px-3 py-2 rounded-lg transition-colors text-xs border border-gray-200">
                          ⬇️ PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BILLS */}
        {activeTab === "bills" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">My Invoices</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b">
                  <tr>
                    <th className="p-5">Invoice ID</th>
                    <th className="p-5 text-center">Date</th>
                    <th className="p-5 text-center">Consulting Doctor</th>
                    <th className="p-5 text-center">Amount</th>
                    <th className="p-5 text-center">Status</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-gray-900">{bill.id}</td>
                      <td className="p-5 text-center font-medium text-gray-600">{bill.date}</td>
                      <td className="p-5 text-center font-medium text-gray-700">{bill.doctor}</td>
                      <td className="p-5 text-center font-black text-gray-900">₹ {bill.total}</td>
                      <td className="p-5 text-center">
                        <span className={`font-bold px-3 py-1 rounded-lg text-sm border ${bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => setViewInvoice(bill)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm border border-blue-100">
                          📄 View Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

     {/* MODAL: VIEW LAB REPORT */}
      {viewReportModal && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{viewReportModal.name}</h3>
                <p className="text-xs text-gray-500">{viewReportModal.lab} | Date: {viewReportModal.date}</p>
              </div>
              <button onClick={() => setViewReportModal(null)} className="text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">Patient Name</p>
                <p className="font-bold text-gray-800">{patientName} (Age: 24, Male)</p>
              </div>

              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-y">
                  <tr>
                    <th className="py-2 px-3">Test Parameter</th>
                    <th className="py-2 px-3 text-center">Measured Value</th>
                    <th className="py-2 px-3 text-center">Reference Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {viewReportModal.results.map((res, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-bold text-gray-800">{res.parameter}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-cyan-600">{res.value}</td>
                      <td className="py-2.5 px-3 text-center text-gray-500 text-xs">{res.normalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setViewReportModal(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-colors text-sm">
                Close
              </button>
              <button onClick={handleDownloadPdf} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">
                🖨️ Print / Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BOOK NEW APPOINTMENT */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
              <button onClick={() => setShowAppointmentModal(false)} className="text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
            </div>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select Department</label>
                <select value={newApt.dept} onChange={(e) => setNewApt({...newApt, dept: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Select Doctor</label>
                <select value={newApt.doctor} onChange={(e) => setNewApt({...newApt, doctor: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                  <option value="Dr. Walter White">Dr. Walter White</option>
                  <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Appointment Date</label>
                <input type="date" required value={newApt.date} onChange={(e) => setNewApt({...newApt, date: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Time Slot</label>
                <select value={newApt.time} onChange={(e) => setNewApt({...newApt, time: e.target.value})} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3.5 mt-4 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE VIEW MODAL */}
      {viewInvoice && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-2xl overflow-hidden relative print:w-full print:max-w-none print:shadow-none print:absolute print:inset-0">
            <div className="bg-cyan-900 text-white p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-black">
              <h1 className="text-3xl font-black tracking-widest">MEDICIO.</h1>
              <p className="text-sm opacity-80 mt-1 print:text-gray-800">123 Health Avenue, City Center, 380001</p>
            </div>
            <div className="p-8">
              <h2 className="text-center text-xl font-bold uppercase tracking-widest text-gray-500 border-b-2 pb-4 mb-6">Patient Invoice</h2>
              <div className="flex justify-between text-sm font-semibold mb-6">
                <div><p className="text-gray-500 uppercase text-xs">Billed To</p><p className="text-lg text-gray-900">{patientName}</p><p className="text-cyan-700">{viewInvoice.doctor}</p></div>
                <div className="text-right"><p className="text-gray-500 uppercase text-xs">Invoice No</p><p className="text-gray-900">{viewInvoice.id}</p><p className="text-gray-500 uppercase text-xs mt-2">Date</p><p className="text-gray-900">{viewInvoice.date}</p></div>
              </div>
              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Consultation Fee</span><span>₹ {viewInvoice.breakdown.consultation}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Medicines</span><span>₹ {viewInvoice.breakdown.medicines}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Room Charges</span><span>₹ {viewInvoice.breakdown.roomCharge}</span></div>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span className="font-black text-gray-900">Total Amount Paid</span>
                <span className="font-black text-cyan-700 text-2xl">₹ {viewInvoice.total}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex gap-4 print:hidden">
              <button onClick={() => setViewInvoice(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors">Close</button>
              <button onClick={() => window.print()} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-colors">🖨️ Print</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}