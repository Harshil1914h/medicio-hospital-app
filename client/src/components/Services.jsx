import { useState } from "react";

export default function Services() {
  // Modal mate state
  const [selectedService, setSelectedService] = useState(null);

  // Photo pramane 6 services no data
  const servicesData = [
    {
      id: 1,
      title: "Cardiology",
      shortDesc: "Comprehensive heart care with advanced diagnostic tools and treatment options for cardiovascular conditions.",
      features: ["ECG Testing", "Heart Surgery"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTdQg2r_eG-dpahTJyPLbwGTnI7Mn_5UDX3GMvufBsQ&s=10",
      longDesc: "Our cardiology department is equipped with state-of-the-art technology to provide complete heart care. From routine check-ups to complex surgeries, our expert cardiologists are here for you.",
      pricing: [{ treatment: "Initial Consultation", price: "₹800" }, { treatment: "ECG Test", price: "₹1,200" }]
    },
    {
      id: 2,
      title: "Neurology",
      shortDesc: "Expert neurological care for brain and nervous system disorders with state-of-the-art imaging technology.",
      features: ["MRI Scans", "Stroke Care"],
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600",
      longDesc: "We offer comprehensive care for patients with diseases of the brain, spinal cord, peripheral nerves, and muscles. Our advanced MRI and CT scan facilities ensure accurate diagnosis.",
      pricing: [{ treatment: "Consultation", price: "₹1,000" }, { treatment: "Brain MRI", price: "₹6,500" }]
    },
    {
      id: 3,
      title: "Orthopedics",
      shortDesc: "Specialized bone and joint treatment including sports medicine and reconstructive surgery procedures.",
      features: ["Joint Replacement", "Sports Medicine"],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
      longDesc: "Our orthopedics team specializes in the diagnosis and treatment of disorders of the bones, joints, ligaments, tendons, muscles, and nerves. We ensure a smooth recovery and active lifestyle.",
      pricing: [{ treatment: "Consultation", price: "₹700" }, { treatment: "Digital X-Ray", price: "₹600" }]
    },
    {
      id: 4,
      title: "Pediatrics",
      shortDesc: "Dedicated healthcare for infants, children, and adolescents with compassionate medical support.",
      features: ["Vaccinations", "Growth Checkups"],
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600",
      longDesc: "Our pediatricians provide compassionate and comprehensive care for your little ones, ensuring their healthy growth and development at every stage.",
      pricing: [{ treatment: "General Checkup", price: "₹600" }, { treatment: "Vaccination Admin", price: "₹300" }]
    },
    {
      id: 5,
      title: "Emergency Care",
      shortDesc: "24/7 rapid emergency medical services staffed by expert trauma surgeons and critical nurses.",
      features: ["24/7 Response", "Trauma Care"],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
      longDesc: "Our emergency department is open 24/7, ready to handle all types of medical emergencies with a rapid response team and advanced life support systems.",
      pricing: [{ treatment: "ER Consultation", price: "₹1,500" }, { treatment: "Trauma Care Base", price: "₹5,000" }]
    },
    {
      id: 6,
      title: "Laboratory",
      shortDesc: "Accurate clinical diagnostics and pathology services using modern robotic equipment.",
      features: ["Blood Tests", "Pathology"],
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
      longDesc: "Our fully automated laboratory provides quick and accurate test results, aiding our doctors in making the best treatment decisions for you.",
      pricing: [{ treatment: "Complete Blood Count", price: "₹400" }, { treatment: "Lipid Profile", price: "₹800" }]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">Our Departments</h2>
          <div className="w-24 h-1.5 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Providing world-class medical services with state-of-the-art facilities across all major specialties.</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">{service.title}</h3>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{service.shortDesc}</p>
                
                <ul className="mb-8 space-y-2 text-sm text-gray-600">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold">✓</span> 
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-cyan-50 text-cyan-700 hover:bg-cyan-600 hover:text-white font-semibold py-3 rounded-xl transition-colors duration-300"
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Popup for Details */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in-up">
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 bg-white hover:bg-red-500 hover:text-white text-gray-600 shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10"
              >
                ✕
              </button>

              <div className="relative h-64">
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <h2 className="text-3xl font-bold text-white p-8">{selectedService.title} Department</h2>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{selectedService.longDesc}</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-cyan-600">₹</span> Treatment Pricing
                </h3>
                
                <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100/50 text-gray-500 text-sm uppercase tracking-wider">
                        <th className="px-6 py-4 font-medium">Service / Treatment</th>
                        <th className="px-6 py-4 font-medium text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedService.pricing.map((item, i) => (
                        <tr key={i} className="hover:bg-white transition-colors">
                          <td className="px-6 py-4 text-gray-700 font-medium">{item.treatment}</td>
                          <td className="px-6 py-4 text-cyan-600 font-bold text-right">{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}