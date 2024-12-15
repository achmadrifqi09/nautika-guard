import React, { useState } from 'react';
import Sukses from './Sukses'; // pastikan Anda memiliki file Sukses.jsx di folder yang benar

function Qrpayment() {
  const [navigateToSukses, setNavigateToSukses] = useState(false);

  if (navigateToSukses) {
    return <Sukses />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Container untuk menampung judul */}
      <div className="text-center mb-10">
        <h2 className="text-gray-700 font-semibold text-lg">Bayar Sekarang</h2>
      </div>

      {/* Container untuk box putih yang hanya berisi QR Code */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        {/* Gambar QRIS di tengah halaman */}
        <div className="flex justify-center items-center">
          <button onClick={() => setNavigateToSukses(true)}>
            <img src="/images/qris.jpg" alt="QR Code" className="w-100 h-100" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qrpayment;
