import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VenueList from './pages/VenueList';
import VenueDetail from './pages/VenueDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Dashboard/Overview';
import Profile from './pages/Dashboard/Profile';
import Payments from './pages/Dashboard/Payments';
import Settings from './pages/Dashboard/Settings';
import AdminLayout from './components/AdminDashboard/Layout';
import AdminOverview from './components/AdminDashboard/pages/Overview';
import Users from './components/AdminDashboard/pages/Users';
import Vendors from './components/AdminDashboard/pages/Vendors';
import Venues from './components/AdminDashboard/pages/Venues';
import Bookings from './components/AdminDashboard/pages/Bookings';
import Revenue from './components/AdminDashboard/pages/Revenue';
import Notifications from './components/AdminDashboard/pages/Notifications';
import AdminSettings from './components/AdminDashboard/pages/Settings';
import VendorRegister from './pages/vendor/Register';
import VendorDashboardLayout from './pages/vendor/Dashboard/Layout';
import VendorOverview from './pages/vendor/Dashboard/Overview';
import VendorVenues from './pages/vendor/Dashboard/Venues';
import VendorEarnings from './pages/vendor/Dashboard/Earnings';
import VendorDocuments from './pages/vendor/Dashboard/Documents';
import VendorSettings from './pages/vendor/Dashboard/Settings';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/venues" element={<VenueList />} />
              <Route path="/venues/:id" element={<VenueDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* User Dashboard */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<Overview />} />
                <Route path="profile" element={<Profile />} />
                <Route path="payments" element={<Payments />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Vendor Routes */}
              <Route path="/vendor/register" element={<VendorRegister />} />
              <Route path="/vendor/dashboard" element={
                <ProtectedRoute>
                  <VendorDashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<VendorOverview />} />
                <Route path="venues" element={<VendorVenues />} />
                <Route path="earnings" element={<VendorEarnings />} />
                <Route path="documents" element={<VendorDocuments />} />
                <Route path="settings" element={<VendorSettings />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminOverview />} />
                <Route path="users" element={<Users />} />
                <Route path="vendors" element={<Vendors />} />
                <Route path="venues" element={<Venues />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="revenue" element={<Revenue />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}