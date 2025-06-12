import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage';
import Order from './Components/Order';
import DashboardLayout from './Components/Dashboad/DashboardLayout';
import AdminDashboard from './Components/Dashboad/AdminDashboard/AdminDashboard';
import Customers from './Components/Dashboad/Customers/Customers';
import Notifications from './Components/Dashboad/Notifications/Notifications';
import Uploads from './Components/Dashboad/Uploads/Uploads';



function AppWrapper() {
  const location = useLocation();

  const hideNavbarRoutes = ['/login', '/dashboardlayout'];

  const shouldShowNavbar = !hideNavbarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {shouldShowNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Order" element={<Order />} />

        {/* Dashboard nested routes */}
        <Route path="/dashboardlayout" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="customer" element={<Customers />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="Upload" element={<Uploads />} />
          {/* Add more nested routes as needed */}
        </Route>
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
