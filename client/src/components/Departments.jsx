import { useState } from "react";

export default function Departments() {
  // State to track the currently selected department (Default is Cardiology)
  const [activeTab, setActiveTab] = useState("Cardiology");

  // Complete data for all departments
  const departmentsData = {
    Cardiology: {
      name: "Cardiology",
      title: "Cardiovascular Medicine & Heart Care",
      desc1: "We provide comprehensive cardiac care to help you maintain a healthy heart and live a longer, healthier life.",
      desc2: "Our heart specialists use advanced diagnostic tools and modern treatments to treat and prevent heart conditions. From lifestyle guidance to complex heart procedures, we are committed to providing the best care for every patient. Because a healthy heart means a healthier tomorrow.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTdQg2r_eG-dpahTJyPLbwGTnI7Mn_5UDX3GMvufBsQ&s=10"
    },
    Neurology: {
      name: "Neurology",
      title: "Advanced Brain & Nervous System Care",
      desc1: "Expert treatment for neurological disorders affecting the brain, spinal cord, and nerves.",
      desc2: "Our neurology department is equipped with state-of-the-art diagnostic imaging to provide accurate assessments. Our dedicated team of neurologists specializes in stroke management, epilepsy, headaches, and movement disorders, ensuring personalized care for every patient.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
    },
    Hepatology: {
      name: "Hepatology",
      title: "Comprehensive Liver Disease Management",
      desc1: "Specialized care for patients with liver, gallbladder, biliary tree, and pancreas disorders.",
      desc2: "We offer advanced diagnostic procedures and cutting-edge treatments for a wide range of hepatic conditions. From managing chronic liver diseases like hepatitis and cirrhosis to complex pre-and post-transplant care, our team is dedicated to improving your quality of life.",
      image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800"
    },
    Pediatrics: {
      name: "Pediatrics",
      title: "Compassionate Care for Children & Adolescents",
      desc1: "Dedicated healthcare focusing on the physical, emotional, and social well-being of your child.",
      desc2: "Our pediatric department provides a child-friendly environment where our specialists offer everything from routine immunizations and well-child visits to the management of complex childhood illnesses. We partner with parents to ensure healthy growth and development.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800"
    },
    Ophthalmology: {
      name: "Ophthalmology",
      title: "Complete Eye Care & Vision Services",
      desc1: "Advanced medical and surgical eye care to protect and enhance your vision.",
      desc2: "Our ophthalmology specialists use the latest technology to diagnose and treat eye conditions such as cataracts, glaucoma, and macular degeneration. We provide comprehensive eye exams, laser vision correction, and specialized pediatric eye care in a comfortable setting.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
    }
  };

  // Array of keys to generate the tab list
  const tabList = Object.keys(departmentsData);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900">Departments</h2>
          <div className="w-24 h-1.5 bg-cyan-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Discover our specialized medical departments, equipped with advanced technology and staffed by expert healthcare professionals.
          </p>
        </div>

        {/* Main Content Layout (Vertical Tabs) */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Sidebar (Tab Menu) */}
          <div className="lg:w-1/4 flex flex-col gap-2">
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30 transform scale-105"
                    : "bg-white text-gray-600 hover:bg-cyan-50 hover:text-cyan-600 border border-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:w-3/4 bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 animate-fade-in-up">
            <div className="flex flex-col xl:flex-row gap-10 items-start">
              
              {/* Text Content */}
              <div className="xl:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                  {departmentsData[activeTab].title}
                </h3>
                <p className="text-gray-600 italic mb-6 leading-relaxed text-lg border-l-4 border-cyan-500 pl-4 bg-gray-50 py-3 pr-3 rounded-r-lg">
                  {departmentsData[activeTab].desc1}
                </p>
                <p className="text-gray-500 leading-relaxed text-md text-justify">
                  {departmentsData[activeTab].desc2}
                </p>
              </div>

              {/* Image Content */}
              <div className="xl:w-1/2 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img 
                    src={departmentsData[activeTab].image} 
                    alt={departmentsData[activeTab].name} 
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Overlay without linter warnings */}
                  <div className="absolute inset-0 bg-cyan-950/20"></div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}