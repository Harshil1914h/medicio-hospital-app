import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      
      {/* Top Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start text-left">
          <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Welcome to Medicio
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            We provide the best <span className="text-cyan-600">health care</span> for you and family
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            Experience world-class medical facilities, expert doctors, and compassionate care tailored to your needs. Your health is our utmost priority.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <Link 
              to="/appointment" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-full shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-cyan-100 rounded-full transform -translate-x-4 translate-y-4 -z-10 blur-sm"></div>
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" 
            alt="Doctor and Patient" 
            className="rounded-3xl shadow-2xl w-full object-cover h-96 border-4 border-white"
          />
        </div>
      </div>

      {/* Bottom Feature Cards (Overlapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-20 -mt-10 lg:-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Expert Doctors */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-cyan-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
              👨‍⚕️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Doctors</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Consult with highly qualified and experienced medical professionals across various specialties for the best treatment.
            </p>
          </div>

          {/* Card 2: Modern Facilities */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
              🏥
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Facilities</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Equipped with state-of-the-art medical technology and advanced laboratories to ensure accurate diagnosis.
            </p>
          </div>

          {/* Card 3: 24/7 Emergency */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-500 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">
              🚑
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Emergency</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Round-the-clock emergency services, ambulance support, and immediate medical attention when you need it most.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}