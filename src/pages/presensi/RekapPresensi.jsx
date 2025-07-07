import React, { useEffect, useState } from 'react'
import { supabase } from "../../services/supabase";

const RekapPresensi = () => {
  const [presensi, setPresensi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresensi();
  }, []);

  const fetchPresensi = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("view_presensi_lengkap").select("*");

    if (error) {
      console.error("Gagal fetch presensi:", error.message);
    } else {
      setPresensi(data);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Data Presensi Lengkap</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Waktu</th>
                <th>Mahasiswa</th>
                <th>Kelas</th>
                <th>Dosen</th>
                <th>Lokasi</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {presensi.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{new Date(item.waktu_presensi).toLocaleString()}</td>
                  <td>{item.nama_mahasiswa}</td>
                  <td>{item.nama_kelas}</td>
                  <td>{item.nama_dosen}</td>
                  <td>{item.lokasi}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "hadir"
                          ? "bg-success"
                          : item.status === "izin"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              {presensi.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RekapPresensi