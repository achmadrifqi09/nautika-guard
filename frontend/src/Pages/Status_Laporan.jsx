import React, { useState } from 'react';

    const Status_Laporan = () => {
    // Define the initial state for the report status
    const [status, setStatus] = useState("Disetujui"); // default to "Disetujui"

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 h-full p-4">
        <h2 className="text-2xl font-bold mb-4">Informasi Persetujuan</h2>
        <div className="bg-white rounded-lg shadow-md p-6 h-50 w-full">
            <h3 className="text-xl font-semibold mb-4">Pencemaran Sungai Brantas</h3>
            <div className="flex justify-between mb-4">
            <div>
                <p className="font-semibold text-gray-700">Email Pelapor</p>
                <p className="text-blue-600">Galihraditya@gmail.com</p>
            </div>
            <div>
                <p className="font-semibold text-gray-700">Status Laporan</p>
                <button
                className={`px-4 py-2 rounded text-white ${status === "Disetujui" ? "bg-green-500" : "bg-red-500"}`}
                onClick={() => setStatus(status === "Disetujui" ? "Ditolak" : "Disetujui")}
                >
                {status}
                </button>
            </div>
            </div>
            <div className="mb-4">
            <p className="font-semibold text-gray-700">Tanggal Laporan</p>
            <p className="text-gray-500">20/09/2024</p>
            </div>
        </div>
        <p className="text-center mt-6 text-gray-600">
            Kami berkomitmen untuk memberikan transparansi dan kepastian dalam setiap pengaduan yang masuk.
        </p>
        </div>
    );
    };

export default Status_Laporan;
