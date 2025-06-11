import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage'; // Your login page

import Order from './Components/Order';
// import Dashboard from './Components/Dashboard'; // Any other internal software route

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login and internal software routes
  const hideNavbarRoutes = ['/login', '/Order'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Order" element={<Order />} />
        
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
