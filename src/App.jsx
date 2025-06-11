import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage'; // Your login page
// import Dashboard from './Components/Dashboard'; // Any other internal software route

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login and internal software routes
  const hideNavbarRoutes = ['/login', '/dashboard'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
