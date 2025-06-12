import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage';
import Order from './Components/Ordertrack';
import DashboardLayout from './Components/Dashboad/DashboardLayout';
import AdminDashboard from './Components/Dashboad/AdminDashboard/AdminDashboard';
import Customers from './Components/Dashboad/Customers/Customers';
import Notifications from './Components/Dashboad/Notifications/Notifications';
import Uploads from './Components/Dashboad/Uploads/Uploads';
import Setting from './Components/Dashboad/Settings/Settings';
import PendingOrders from './Components/Dashboad/Orders/PendingOrders';
import CompletedOrders from './Components/Dashboad/Orders/CompletedOrders';




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
        <Route path="/Ordertrack" element={<Order />} />

        {/* Dashboard nested routes */}
        <Route path="/dashboardlayout" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
           
<Route path="pendingorder" element={< PendingOrders/>} />
<Route path="completedorder" element={< CompletedOrders/>} />
          <Route path="customer" element={<Customers />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="Upload" element={<Uploads />} />
          <Route path="setting" element={<Setting />} />
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
