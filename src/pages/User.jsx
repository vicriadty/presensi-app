import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function User() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch user data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      setMessage("Gagal mengambil data pengguna.");
    } else {
      setUsers(data);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus user ini?");
    if (!confirm) return;

    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) {
      setMessage("Gagal menghapus user.");
    } else {
      setMessage("User berhasil dihapus.");
      fetchUsers();
    }
  };

  const handleEdit = (id) => {
    alert(`Navigasi ke halaman edit user dengan ID: ${id}`);
    // Bisa diarahkan ke route lain, contoh: navigate(`/user/edit/${id}`)
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manajemen User</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nama}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
