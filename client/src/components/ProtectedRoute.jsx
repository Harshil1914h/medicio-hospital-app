import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not allowed for this route, redirect them
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    
    // Redirect patients away from admin pages back to home
    if (user.role === 'patient') {
        return <Navigate to="/" replace />;
    }
    
    // Default fallback redirect
    return <Navigate to="/" replace />;
  }

  // Authorized, render the child routes
  return <Outlet />;
}