import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage';
import Order from './Components/Order';
import DashboardLayout from './Components/Dashboad/DashboardLayout';
import AdminDashboard from './Components/Dashboad/AdminDashboard/AdminDashboard';
import Customers from './Components/Dashboad/Customers/Customers';



function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login and dashboard layout root route
  const hideNavbarRoutes = ['/login', '/dashboardlayout'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Order" element={<Order />} />

        {/* Nested routing for dashboard */}
       <Route path="/dashboardlayout" element={<DashboardLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="customer" element={<Customers />} />
  {/* <Route path="orders/pending" element={<PendingOrders />} />
  <Route path="orders/completed" element={<CompletedOrders />} /> */}
  {/* Add other child components accordingly */}
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
