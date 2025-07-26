import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const FormPresensi = () => {
  const [dosenList, setDosenList] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    // Ambil daftar dosen dari Supabase
    const fetchDosen = async () => {
      const { data, error } = await supabase.from("dosen").select("id, nama");
      if (!error) setDosenList(data);
    };

    // Ambil IP Address dari API eksternal
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIpAddress(data.ip);
      } catch (err) {
        console.error("Gagal mendapatkan IP:", err);
      }
    };

    fetchDosen();
    fetchIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("presensi").insert([
      {
        dosen_id: selectedDosen,
        ip_address: ipAddress,
        waktu: new Date(),
        // Tambahkan isian lainnya: user_id, status, dll
      },
    ]);

    if (error) {
      alert("Presensi gagal: " + error.message);
    } else {
      alert("Presensi berhasil!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="dosen" className="form-label">Pilih Dosen</label>
        <select
          id="dosen"
          className="form-select"
          value={selectedDosen}
          onChange={(e) => setSelectedDosen(e.target.value)}
          required
        >
          <option value="">-- Pilih Dosen --</option>
          {dosenList.map((dosen) => (
            <option key={dosen.id} value={dosen.id}>
              {dosen.nama}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-100">Presensi</button>
    </form>
  );
};

export default FormPresensi;
