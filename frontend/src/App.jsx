import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import './App.css';
import store from './redux/store';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'; // Pastikan SignUp sudah diimpor
import AdminPage from './component/SidebarAdmin';
import UserPage from './component/Sidebar';
import Proses_payment from './Pages/Proses_payment'; // Pastikan jalur impor benar
import Datav_Admin from './Admin/Datav_Admin';
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";


function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdmin:", isAdmin);

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? (isAdmin ? "/SidebarAdmin" : "/Sidebar") : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/SidebarAdmin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/Sidebar" element={isAuthenticated && !isAdmin ? <UserPage /> : <Navigate to="/login" />} />
        <Route path="/proses-payment" element={<Proses_payment donationAmount={10000} />} />
        <Route path="/admin/volunteers/:volunteerId" element={<Datav_Admin />} />

        {/* Tambahkan rute catch-all */}
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
