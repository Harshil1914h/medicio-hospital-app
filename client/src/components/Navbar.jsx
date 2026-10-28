import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Moti screen (Desktop) mate active link ni style
  const desktopLinkStyle = ({ isActive }) => 
    `text-sm font-bold py-2 transition-all ${
      isActive 
        ? "text-cyan-600 border-b-2 border-cyan-600" 
        : "text-gray-500 hover:text-cyan-600"
    }`;

  // Nani screen (Mobile) mate active link ni style
  const mobileLinkStyle = ({ isActive }) => 
    `block text-base font-bold py-2 transition-all ${
      isActive 
        ? "text-cyan-600" 
        : "text-gray-600 hover:text-cyan-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-tight">
              MEDICIO<span className="text-cyan-600">.</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-cyan-600 focus:outline-none">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menus (Hidden on mobile) */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className={desktopLinkStyle}>Home</NavLink>
            <NavLink to="/services" className={desktopLinkStyle}>Services</NavLink>
            <NavLink to="/departments" className={desktopLinkStyle}>Departments</NavLink>
            <NavLink to="/doctors" className={desktopLinkStyle}>Doctors</NavLink>
            
            {/* Patient Menu */}
            {user && user.role === 'patient' && (
              <NavLink to="/dashboard" className={desktopLinkStyle}>My Dashboard</NavLink>
            )}

            {/* Admin Menus */}
            {user && user.role === 'admin' && (
              <>
                <NavLink to="/schedule" className={desktopLinkStyle}>Schedule</NavLink>
                <NavLink to="/medicines" className={desktopLinkStyle}>Medicines</NavLink>
                <NavLink to="/beds" className={desktopLinkStyle}>Bed & IPD</NavLink>
                <NavLink to="/patients" className={desktopLinkStyle}>Patients</NavLink>
                <NavLink to="/billing" className={desktopLinkStyle}>Billing</NavLink>
              </>
            )}
          </div>

          {/* Desktop Login / Logout Button */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-lg">
                  {user.name} ({user.role})
                </span>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 px-5 rounded-full transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-full transition-colors">
                Login
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown (Only visible when Hamburger is clicked) */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Home</NavLink>
          <NavLink to="/services" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Services</NavLink>
          <NavLink to="/departments" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Departments</NavLink>
          <NavLink to="/doctors" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Doctors</NavLink>
          
          {/* Mobile Patient Menu */}
          {user && user.role === 'patient' && (
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>My Dashboard</NavLink>
          )}

          {/* Mobile Admin Menus */}
          {user && user.role === 'admin' && (
            <>
              <NavLink to="/schedule" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Schedule</NavLink>
              <NavLink to="/medicines" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Medicines</NavLink>
              <NavLink to="/beds" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Bed & IPD</NavLink>
              <NavLink to="/patients" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Patients</NavLink>
              <NavLink to="/billing" onClick={() => setIsOpen(false)} className={mobileLinkStyle}>Billing</NavLink>
            </>
          )}

          {/* Mobile Login / Logout */}
          {user ? (
             <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left block text-base font-bold text-red-500 hover:text-red-700 py-2">
               Logout ({user.name})
             </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-base font-bold text-cyan-600 hover:text-cyan-700 py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}