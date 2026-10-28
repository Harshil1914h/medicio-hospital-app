import { Link } from "react-router-dom";

export default function Doctors() {
  const doctorsList = [
    {
      id: 1,
      name: "Dr. Walter White",
      department: "Cardiology",
      experience: "15 Years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Dr. Sarah Smith",
      department: "Neurology",
      experience: "12 Years",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 3,
      name: "Dr. John Doe",
      department: "Pediatrics",
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Dr. Emily Chen",
      department: "Orthopedics",
      experience: "10 Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "Dr. Michael Brown",
      department: "Dermatology",
      experience: "14 Years",
      image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Dr. Jessica Taylor",
      department: "Gynecology",
      experience: "9 Years",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 7,
      name: "Dr. David Wilson",
      department: "Oncology",
      experience: "20 Years",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section className="py-20 bg-slate-50" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Our Specialist <span className="text-cyan-600 relative inline-block">
              Doctors
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-cyan-600 rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Meet our team of experienced and highly qualified medical professionals dedicated to providing the best care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctorsList.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col">
              
              <div className="relative h-72 overflow-hidden bg-cyan-50 flex items-center justify-center">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-4">{doctor.department}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                    <span className="mr-2 text-xl">👨‍⚕️</span> Experience: {doctor.experience}
                  </div>
                </div>
                
                <Link to="/appointment" className="block w-full text-center bg-cyan-50 hover:bg-cyan-600 text-cyan-700 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}