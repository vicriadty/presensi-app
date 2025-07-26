import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ nama: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("nama, email, role")
        .eq("id", id)
        .single();

      if (error) {
        alert("Gagal mengambil data user");
        return;
      }

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { nama, value } = e.target;
    setUser((prev) => ({ ...prev, [nama]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profiles")
      .update(user)
      .eq("id", id);

    if (error) {
      alert("Gagal memperbarui data");
    } else {
      alert("User berhasil diperbarui");
      navigate("/user");
    }
  };

  if (loading) return <div className="p-4">Memuat data...</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            className="form-control"
            type="text"
            name="nama"
            value={user.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Role --</option>
            <option value="admin">Admin</option>
            <option value="dosen">Dosen</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
