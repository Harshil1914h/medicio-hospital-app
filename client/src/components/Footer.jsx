import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Hospital Info */}
        <div>
          <h3 className="text-2xl font-black text-white tracking-wider mb-4">MEDICIO<span className="text-cyan-500">.</span></h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Providing advanced healthcare and medical solutions with trusted doctors and 24/7 emergency services for your family.
          </p>
          <div className="flex gap-3">
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors cursor-pointer">🌐</span>
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors cursor-pointer">📘</span>
            <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-cyan-600 transition-colors cursor-pointer">📸</span>
          </div>
        </div>

        {/* Column 2: Useful Links (FIXED WITH <Link>) */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors block">Home</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400 transition-colors block">Services</Link></li>
            <li><Link to="/departments" className="hover:text-cyan-400 transition-colors block">Departments</Link></li>
            <li><Link to="/doctors" className="hover:text-cyan-400 transition-colors block">Find a Doctor</Link></li>
          </ul>
        </div>

        {/* Column 3: Additional Pages */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/departments" className="hover:text-cyan-400 transition-colors block">Cardiology Care</Link></li>
            <li><Link to="/departments" className="hover:text-cyan-400 transition-colors block">Neurology & Surgery</Link></li>
            <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors block">Patient Dashboard</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400 transition-colors block">Emergency & Ambulance</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Us Form */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Contact Us</h4>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent to Medicio Hospital."); }} className="space-y-3">
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-cyan-500" 
            />
            <input 
              type="email" 
              placeholder="E-Mail Address" 
              required 
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-cyan-500" 
            />
            <textarea 
              rows="2" 
              placeholder="Your Message" 
              required 
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white outline-none focus:border-cyan-500"
            ></textarea>
            <button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition-colors text-sm shadow-md"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 text-center text-xs text-gray-500">
        © 2026 MEDICIO Hospital Management System. All Rights Reserved.
      </div>
    </footer>
  );
}