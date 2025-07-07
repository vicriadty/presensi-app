import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function FormPresensi() {
  const [kelasList, setKelasList] = useState([]);
  const [form, setForm] = useState({ kelas_id: "", status: "hadir" });
  const [lokasi, setLokasi] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Ambil daftar kelas
  useEffect(() => {
    async function fetchKelas() {
      const { data } = await supabase.from("kelas").select("id, nama_kelas");
      setKelasList(data || []);
    }

    fetchKelas();
    getUserLocation();
  }, []);

  // Ambil lokasi otomatis via GPS
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation tidak didukung di browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLokasi(`${latitude}, ${longitude}`);
      },
      (err) => {
        console.error("Gagal mengambil lokasi:", err.message);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Anda belum login.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("presensi").insert({
      user_id: user.id,
      kelas_id: form.kelas_id,
      lokasi: lokasi || "Tidak tersedia",
      status: form.status,
      waktu_presensi: new Date().toISOString(),
    });

    if (error) {
      setMessage("Gagal mengisi presensi: " + error.message);
    } else {
      setMessage("Presensi berhasil dikirim.");
      setForm({ kelas_id: "", status: "hadir" });
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Isi Presensi</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Pilih Kelas</label>
          <select
            name="kelas_id"
            className="form-select"
            value={form.kelas_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Kelas --</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="hadir">Hadir</option>
            <option value="izin">Izin</option>
            <option value="sakit">Sakit</option>
          </select>
        </div>

        {lokasi ? (
          <div className="text-success mb-3">📍 Lokasi terdeteksi</div>
        ) : (
          <div className="text-warning mb-3">📍 Mendeteksi lokasi...</div>
        )}

        <div className="d-grid">
          <button type="submit" className="btn btn-success" disabled={loading || !lokasi}>
            {loading ? "Menyimpan..." : "Kirim Presensi"}
          </button>
        </div>

        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
      </form>
    </div>
  );
}
