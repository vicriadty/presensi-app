import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
    });

    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return navigate("/login");

      const { data, error } = await supabase.from("profiles").select("role").eq("id", user.id).single();

      if (error || !data) return navigate("/login");

      setRole(data.role);
    };

    fetchRole();
  }, []);

  if (!role) return <div className="p-4">Loading...</div>;

  return (
    <>
      <div className="d-flex flex-col flex-md-row justify-content-center pt-5">
        <h4>Selamat Datang di Presensi Mahasiswa</h4>
      </div>

      <div className="container d-flex justify-content-center py-5 min-vh-100">
        <div className="col-12 col-md-6 text-center p-3 gap-3 d-flex justify-content-center">
          <div className="col-4">
            <Link to="/presensi" className="btn btn-primary w-100 square-button">
              <i className="bi bi-pencil-square fs-3"></i>
              <div className="small mt-2">Presensi</div>
            </Link>
          </div>

          {role !== "mahasiswa" && (
            <div className="col-4">
              <Link to="/rekap" className="btn btn-success w-100 square-button">
                <i className="bi bi-journal-text fs-3"></i>
                <div className="small mt-2">Rekap</div>
              </Link>
            </div>
          )}

          {role === "admin" && (
            <div className="col-4">
              <Link to="/user" className="btn btn-warning w-100 square-button">
                <i className="bi bi-people fs-3"></i>
                <div className="small mt-2">User</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
