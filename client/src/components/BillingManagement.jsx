import { useState } from "react";

export default function BillingManagement() {
  // 1. ડમી પેશન્ટ્સ (જેમનું બિલ બનાવવાનું છે)
  const patientsList = [
    { id: "PT1001", name: "Rahul Sharma", doctor: "Dr. Walter White" },
    { id: "PT1002", name: "Amit Patel", doctor: "Dr. Sarah Smith" },
    { id: "PT1003", name: "Neha Gupta", doctor: "Dr. John Doe" },
  ];

  // 2. સેવ થયેલા બિલ્સ નું લિસ્ટ
  const [invoices, setInvoices] = useState([
    { id: "INV-20261001", patientName: "Rahul Sharma", date: "2026-10-25", total: 1500, status: "Paid" },
    { id: "INV-20261002", patientName: "Amit Patel", date: "2026-10-26", total: 4200, status: "Pending" },
  ]);

  const [showBillForm, setShowBillForm] = useState(false);
  const [viewInvoice, setViewInvoice] = useState(null); // પ્રિન્ટ કરવા માટેની રિસીપ્ટ

  // નવું બિલ બનાવવા માટેનો ડેટા
  const [newBill, setNewBill] = useState({
    patientId: "", patientName: "", doctor: "",
    consultation: "", medicines: "", roomCharge: "", otherCharges: "", discount: "0"
  });

  // દર્દી સિલેક્ટ થાય ત્યારે ઓટોમેટિક નામ અને ડોક્ટર આવી જાય
  const handlePatientSelect = (e) => {
    const selectedPt = patientsList.find(p => p.id === e.target.value);
    if(selectedPt) {
      setNewBill({ ...newBill, patientId: selectedPt.id, patientName: selectedPt.name, doctor: selectedPt.doctor });
    }
  };

  // ટોટલ ગણતરી (Auto Calculate)
  const totalAmount = 
    (Number(newBill.consultation) || 0) + 
    (Number(newBill.medicines) || 0) + 
    (Number(newBill.roomCharge) || 0) + 
    (Number(newBill.otherCharges) || 0) - 
    (Number(newBill.discount) || 0);

  // બિલ સેવ કરવાનું ફંક્શન
  const handleGenerateBill = (e) => {
    e.preventDefault();
    if(!newBill.patientId) return alert("Please select a patient first!");

    const newInvoice = {
      id: "INV-" + Math.floor(Math.random() * 9000000 + 1000000),
      patientName: newBill.patientName,
      doctor: newBill.doctor,
      date: new Date().toISOString().split('T')[0],
      breakdown: {
        consultation: Number(newBill.consultation) || 0,
        medicines: Number(newBill.medicines) || 0,
        roomCharge: Number(newBill.roomCharge) || 0,
        otherCharges: Number(newBill.otherCharges) || 0,
        discount: Number(newBill.discount) || 0
      },
      total: totalAmount,
      status: "Paid" // નવું બિલ સીધું Paid જ ગણાશે (તમે ચાહો તો આને ડ્રોપડાઉન બનાવી શકો)
    };

    setInvoices([newInvoice, ...invoices]);
    setShowBillForm(false);
    setNewBill({ patientId: "", patientName: "", doctor: "", consultation: "", medicines: "", roomCharge: "", otherCharges: "", discount: "0" });
    alert("Invoice Generated Successfully!");
  };

  // Pending બિલને Paid કરવાનું ફંક્શન
  const handleMarkAsPaid = (id) => {
    if(window.confirm("Are you sure you want to mark this invoice as Paid?")) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <span className="bg-cyan-100 text-cyan-600 p-2 rounded-xl text-2xl shadow-sm">🧾</span> 
              Billing & Invoices
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Generate bills, calculate charges, and print receipts.</p>
          </div>
          
          <button 
            onClick={() => setShowBillForm(true)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <span>+</span> Create New Bill
          </button>
        </div>

        {/* Invoice List Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold border-b border-gray-100">
                <tr>
                  <th className="p-5">Invoice ID</th>
                  <th className="p-5">Patient Name</th>
                  <th className="p-5 text-center">Date</th>
                  <th className="p-5 text-center">Amount (₹)</th>
                  <th className="p-5 text-center">Status</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.length === 0 ? (
                  <tr><td colSpan="6" className="p-10 text-center text-gray-500 font-bold">No invoices generated yet.</td></tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-5 font-bold text-gray-900">{inv.id}</td>
                      <td className="p-5 font-semibold text-gray-700">{inv.patientName}</td>
                      <td className="p-5 text-center text-gray-600 font-medium">{inv.date}</td>
                      <td className="p-5 text-center font-bold text-gray-900">₹{inv.total}</td>
                      <td className="p-5 text-center">
                        <span className={`font-bold px-3 py-1 rounded-lg border text-sm ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-5 text-center flex justify-center gap-2">
                        <button 
                          onClick={() => setViewInvoice(inv)} 
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-3 py-2 rounded-lg transition-colors text-xs border border-blue-100"
                        >
                          📄 View
                        </button>
                        
                        {/* માત્ર Pending હોય તો જ Paid કરવાનું બટન દેખાશે */}
                        {inv.status === 'Pending' && (
                          <button 
                            onClick={() => handleMarkAsPaid(inv.id)} 
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold px-3 py-2 rounded-lg transition-colors text-xs border border-emerald-100"
                          >
                            ✓ Mark Paid
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

      </div>

      {/* MODAL 1: CREATE NEW BILL FORM */}
      {showBillForm && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">Generate New Bill</h3>
              <button onClick={() => setShowBillForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors text-xl font-bold">×</button>
            </div>
            
            <form onSubmit={handleGenerateBill} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Patient</label>
                  <select required value={newBill.patientId} onChange={handlePatientSelect} className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl outline-none focus:border-cyan-500 bg-white">
                    <option value="" disabled>-- Choose a Patient --</option>
                    {patientsList.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Consultation Fee (₹)</label>
                  <input type="number" placeholder="0" value={newBill.consultation} onChange={(e) => setNewBill({...newBill, consultation: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Medicines Charge (₹)</label>
                  <input type="number" placeholder="0" value={newBill.medicines} onChange={(e) => setNewBill({...newBill, medicines: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Bed / Room Charge (₹)</label>
                  <input type="number" placeholder="0" value={newBill.roomCharge} onChange={(e) => setNewBill({...newBill, roomCharge: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Lab & Other Charges (₹)</label>
                  <input type="number" placeholder="0" value={newBill.otherCharges} onChange={(e) => setNewBill({...newBill, otherCharges: e.target.value})} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="md:col-span-2 mt-2">
                  <label className="block text-xs font-bold text-red-500 mb-1">Discount amount (₹) (If any)</label>
                  <input type="number" placeholder="0" value={newBill.discount} onChange={(e) => setNewBill({...newBill, discount: e.target.value})} className="w-full px-4 py-2 border border-red-200 rounded-lg outline-none focus:ring-2 focus:ring-red-300" />
                </div>
              </div>

              {/* Live Total Display */}
              <div className="bg-cyan-50 border-2 border-cyan-100 rounded-xl p-4 flex justify-between items-center">
                <span className="font-bold text-cyan-800 text-lg">Total Amount:</span>
                <span className="font-black text-cyan-700 text-2xl">₹ {totalAmount}</span>
              </div>
              
              <button type="submit" disabled={!newBill.patientId} className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30 disabled:opacity-50">
                Generate Invoice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINT RECEIPT INVOICE */}
      {viewInvoice && (
        <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg shadow-2xl overflow-hidden relative print:w-full print:max-w-none print:shadow-none print:absolute print:inset-0">
            
            {/* Hospital Header */}
            <div className="bg-cyan-900 text-white p-6 text-center print:bg-white print:text-black print:border-b-2 print:border-black">
              <h1 className="text-3xl font-black tracking-widest">MEDICIO.</h1>
              <p className="text-sm opacity-80 mt-1 print:text-gray-800">123 Health Avenue, City Center, 380001</p>
              <p className="text-sm opacity-80 print:text-gray-800">Phone: +91 98765 43210 | Email: care@medicio.com</p>
            </div>

            {/* Invoice Details */}
            <div className="p-8">
              <h2 className="text-center text-xl font-bold uppercase tracking-widest text-gray-500 border-b-2 pb-4 mb-6">Patient Invoice</h2>
              
              <div className="flex justify-between text-sm font-semibold mb-6">
                <div>
                  <p className="text-gray-500 uppercase text-xs">Billed To</p>
                  <p className="text-lg text-gray-900">{viewInvoice.patientName}</p>
                  <p className="text-cyan-700">{viewInvoice.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 uppercase text-xs">Invoice No</p>
                  <p className="text-gray-900">{viewInvoice.id}</p>
                  <p className="text-gray-500 uppercase text-xs mt-2">Date</p>
                  <p className="text-gray-900">{viewInvoice.date}</p>
                  <p className="text-gray-500 uppercase text-xs mt-2">Status</p>
                  <p className={`font-bold ${viewInvoice.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>{viewInvoice.status}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="border-t border-b py-4 mb-6">
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Consultation Fee</span><span>₹ {viewInvoice.breakdown ? viewInvoice.breakdown.consultation : 500}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Medicines</span><span>₹ {viewInvoice.breakdown ? viewInvoice.breakdown.medicines : 1000}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Room Charges</span><span>₹ {viewInvoice.breakdown ? viewInvoice.breakdown.roomCharge : 0}</span></div>
                <div className="flex justify-between py-2"><span className="text-gray-600 font-bold">Other Charges</span><span>₹ {viewInvoice.breakdown ? viewInvoice.breakdown.otherCharges : 0}</span></div>
                <div className="flex justify-between py-2 text-red-500"><span className="font-bold">Discount</span><span>- ₹ {viewInvoice.breakdown ? viewInvoice.breakdown.discount : 0}</span></div>
              </div>

              <div className="flex justify-between items-center text-xl">
                <span className="font-black text-gray-900">Total Amount</span>
                <span className="font-black text-cyan-700 text-2xl">₹ {viewInvoice.total}</span>
              </div>
              <div className="text-center text-xs text-gray-400 mt-10 uppercase font-bold">
                Thank you for trusting Medicio. Wishing you a speedy recovery!
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 p-4 flex gap-4 print:hidden">
              <button onClick={() => setViewInvoice(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors">
                Close
              </button>
              <button onClick={() => window.print()} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2">
                🖨️ Print Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}