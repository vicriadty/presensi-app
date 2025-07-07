import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", role: "mahasiswa" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      nama: form.nama,
      email: form.email,
      password: form.password,
    });

    if (error) return setMessage(error.message);

    const userId = data.user?.id;
    if (userId) {
      await supabase.from("profiles").insert({
        id: userId,
        nama: form.nama,
        email: form.email,
        role: form.role,
      });
      setMessage("Registrasi berhasil! Silakan login.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center mt-5">
      <div className="row justify-content-center w-100">
        <div className="col-lg-5 col-md-7 col-sm-10 col-12 shadow p-4 rounded bg-white">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input name="nama" type="text" className="form-control" placeholder="Masukkan email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" type="email" className="form-control" placeholder="Masukkan email" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" type="password" className="form-control" placeholder="Masukkan password" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Role</label>
              <select name="role" className="form-select" value={form.role} onChange={handleChange} required>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="dosen">Dosen</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Register
            </button>
            <div className="text-center">
              <span className="text-secondary">Sudah punya akun? </span>
              <a className="text-decoration-none text-success" href="/login">
                Login
              </a>
            </div>
            {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
