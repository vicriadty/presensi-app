import React, { useEffect } from "react";
import { supabase } from "../services/supabase";

const Dashboard = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
    });
  });

  return (
    <div className="d-flex flex-column p-5 justify-content-center align-items-center">
      <h2 className="mb-5">Hello</h2>
      <h4 className="mb-5">Selamat datang di dashboard Presensi Mahasiswa</h4>
      <div className="d-flex col-3 col-sm-6">
        <h5>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, dolorem, cupiditate, quibusdam atque expedita rem commodi obcaecati dignissimos ratione velit quis delectus. Accusantium minima id neque natus. Adipisci, architecto
          magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui atque incidunt modi nesciunt nam, id consequuntur distinctio debitis praesentium sunt. Qui quisquam quam perferendis id corporis quia eos quibusdam ea!
        </h5>
      </div>
    </div>
  );
};

export default Dashboard;
