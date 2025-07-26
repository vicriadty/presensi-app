import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) return setMessage("Login gagal: " + error.message);

    const user = data.user;
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

    if (!profile) {
      return setMessage("Data profil tidak ditemukan.");
    }

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12 shadow p-4 rounded bg-white">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input name="email" type="email" className="form-control" placeholder="Masukkan email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input name="password" type="password" className="form-control" placeholder="Masukkan password" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
            <div className="text-center mt-3">
              <span className="text-secondary">Belum punya akun? </span>
              <a className="text-decoration-none" href="/register">
                Daftar
              </a>
            </div>
            {message && <div className="alert alert-warning mt-3 text-center">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
