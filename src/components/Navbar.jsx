import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return navigate("/login");

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !data) return navigate("/login");

      setRole(data.role);
    };

    fetchRole();
  }, []);

  if (!role) return <div className="p-4">Loading...</div>;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Presensi Mahasiswa
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Presensi
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/presensi">
                    Isi Presensi
                  </Link>
                </li>
                {role !== "mahasiswa" && (
                  <li>
                    <Link className="dropdown-item" to="/rekap">
                      Rekap Presensi
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            {role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  User
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <span className="me-3 text-muted small">
            Selamat Datang, <strong>{role} !</strong>
          </span>
          <button type="button" className="btn2">
          <LogoutButton />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
