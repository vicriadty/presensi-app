import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import User from "./pages/user/User";
import UserEdit from "./pages/user/UserEdit";
import FormPresensi from "./pages/presensi/FormPresensi";
import RekapPresensi from "./pages/presensi/RekapPresensi";

function AppRoutes() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/register"];
  const isHidden = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!isHidden && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
        <Route path="/presensi" element={<FormPresensi />} />
        <Route path="/rekap" element={<RekapPresensi />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
