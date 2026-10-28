import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Appointment from "./components/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Footer import karyu
import Hero from "./components/Hero"; 
import Services from "./components/Services";
import Departments from "./components/Departments";
import Doctors from "./components/Doctors";
import DoctorSchedule from "./components/DoctorSchedule";
import BedManagement from './components/BedManagement';
import PatientDashboard from './components/PatientDashboard';
import BillingManagement from './components/BillingManagement';
import PatientManagement from './components/PatientManagement';
import MedicineManagement from "./components/MedicineManagement";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAppointments from "./pages/MyAppointments";
import ForgotPassword from "./pages/ForgotPassword";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RequireAdmin = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {user && <Navbar />} 
        
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
            <Route path="/appointment" element={<RequireAuth><Appointment /></RequireAuth>} />
            <Route path="/" element={<RequireAuth><Hero /></RequireAuth>} />
            <Route path="/services" element={<RequireAuth><Services /></RequireAuth>} />
            <Route path="/departments" element={<RequireAuth><Departments /></RequireAuth>} />
            <Route path="/doctors" element={<RequireAuth><Doctors /></RequireAuth>} />
            
            {/* Admin Routes */}
            <Route path="/beds" element={<RequireAdmin><BedManagement /></RequireAdmin>} />
            <Route path="/schedule" element={<RequireAdmin><DoctorSchedule /></RequireAdmin>} />
            <Route path="/patients" element={<RequireAdmin><PatientManagement /></RequireAdmin>} />
            <Route path="/billing" element={<RequireAdmin><BillingManagement /></RequireAdmin>} />
            <Route path="/medicines" element={<RequireAdmin><MedicineManagement /></RequireAdmin>} />

            {/* Patient Routes */}
            <Route path="/dashboard" element={<RequireAuth><PatientDashboard /></RequireAuth>} />
            <Route path="/my-appointments" element={<RequireAuth><MyAppointments /></RequireAuth>} />
          </Routes>
        </div>

        {/* Footer badha page ni niche dekhase */}
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}