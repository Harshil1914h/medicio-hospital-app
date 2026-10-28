import { useState } from "react";

export default function Medicines() {
  const [medicines, setMedicines] = useState([
    { id: "MED001", name: "Paracetamol 500mg", genericName: "Paracetamol", category: "Analgesic", stock: 120, price: 5 },
    { id: "MED002", name: "Amoxicillin 500mg", genericName: "Amoxicillin", category: "Antibiotic", stock: 45, price: 12 },
    { id: "MED003", name: "Cetirizine 10mg", genericName: "Cetirizine", category: "Antihistamine", stock: 0, price: 8 },
    { id: "MED004", name: "Metformin 500mg", genericName: "Metformin", category: "Antidiabetic", stock: 620, price: 10 },
    { id: "MED005", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "Gastrointestinal", stock: 80, price: 15 }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({
    id: "", name: "", genericName: "", category: "", stock: "", price: ""
  });

  const handleDispense = (id) => {
    setMedicines(medicines.map(med => {
      if (med.id === id && med.stock > 0) {
        return { ...med, stock: med.stock - 1 };
      }
      return med;
    }));
  };

  const handleDelete = (id) => {
    // Alert message ne English ma kari didhu chhe
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    const newMedicineEntry = {
      ...newMed,
      stock: Number(newMed.stock),
      price: Number(newMed.price)
    };
    
    setMedicines([...medicines, newMedicineEntry]);
    setShowAddForm(false);
    setNewMed({ id: "", name: "", genericName: "", category: "", stock: "", price: "" });
    alert("New Medicine Added Successfully!");
  };

  const getStatusBadge = (stock) => {
    if (stock === 0) return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm font-semibold border border-red-100">Out of Stock</span>;
    if (stock <= 50) return <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-lg text-sm font-semibold border border-yellow-100">Low Stock</span>;
    return <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm font-semibold border border-green-100">In Stock</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Medicines Inventory</h2>
            <p className="text-gray-500 mt-1">Manage and dispense medicines available in the hospital.</p>
          </div>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
          >
            {showAddForm ? "Cancel Adding" : "+ Add New Medicine"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 mb-8 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Add Medicine Details</h3>
            <form onSubmit={handleAddNew} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input type="text" placeholder="ID (e.g. MED006)" required value={newMed.id} onChange={(e) => setNewMed({...newMed, id: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              <input type="text" placeholder="Medicine Name" required value={newMed.name} onChange={(e) => setNewMed({...newMed, name: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              <input type="text" placeholder="Generic Name" required value={newMed.genericName} onChange={(e) => setNewMed({...newMed, genericName: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              <input type="text" placeholder="Category" required value={newMed.category} onChange={(e) => setNewMed({...newMed, category: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              <input type="number" placeholder="Initial Stock" required value={newMed.stock} onChange={(e) => setNewMed({...newMed, stock: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              <input type="number" placeholder="Price (₹)" required value={newMed.price} onChange={(e) => setNewMed({...newMed, price: e.target.value})} className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" />
              
              <div className="col-span-full mt-2">
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-600/30">
                  Save Medicine to Inventory
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="p-6 font-bold">Medicine Name</th>
                  <th className="p-6 font-bold">Category</th>
                  <th className="p-6 font-bold">Stock</th>
                  <th className="p-6 font-bold">Status</th>
                  <th className="p-6 font-bold text-center">Action (Pharmacy)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50 transition-colors text-sm text-gray-700">
                    <td className="p-6 font-bold text-gray-900">{med.name} <br/><span className="font-normal text-gray-500">{med.id}</span></td>
                    <td className="p-6">{med.category}</td>
                    <td className={`p-6 font-bold text-lg ${med.stock <= 50 ? 'text-red-500' : 'text-gray-900'}`}>{med.stock}</td>
                    <td className="p-6">{getStatusBadge(med.stock)}</td>
                    <td className="p-6 text-center">
                      <div className="flex gap-2 justify-center">
                        <button 
                          onClick={() => handleDispense(med.id)}
                          disabled={med.stock <= 0}
                          className={`font-bold py-2 px-4 rounded-lg transition-all ${
                            med.stock > 0 
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Sell 1 Unit
                        </button>
                        <button 
                          onClick={() => handleDelete(med.id)}
                          className="font-bold py-2 px-4 rounded-lg transition-all bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}