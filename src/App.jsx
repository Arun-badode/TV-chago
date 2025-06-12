import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CustomNavbar from './Layout/Navbar';
import LandingPage from './Components/Landingpage';
import LoginPage from './Auth/LoginPage'; // Your login page
import Order from './Components/Order';
import DashboardLayout from './Components/Dashboad/DashboardLayout';
import AdminDashboard from './Components/Dashboad/AdminDashboard/AdminDashboard';
// import Dashboard from './Components/Dashboard'; // Any other internal software route

function AppWrapper() {
  const location = useLocation();

  // Hide Navbar on login and internal software routes
  const hideNavbarRoutes = ['/login',  '/dashboardlayout'];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Order" element={<Order />} />

          <Route path="/dashboardlayout" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* <Route path="allusers" element={<AllUsers />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
            <Route path="plans" element={<Plans />} /> */}
            {/* <Route path="createsubscription" element={<Submissions />} /> */}
            {/* <Route path="systemreports" element={<SystemReports />} /> */}
            {/* <Route path="submission" element={<Submissions />} /> */}
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
