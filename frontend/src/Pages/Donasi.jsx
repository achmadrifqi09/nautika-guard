import React, { useState } from 'react';
import Proses_payment from './Proses_payment';
// Pastikan import sudah sesuai

function Donasi() {
    // State untuk menyimpan nominal yang dipilih dan kondisi redirect
    const [selectedAmount, setSelectedAmount] = useState(null); 
    const [redirect, setRedirect] = useState(false);

    // Fungsi untuk menangani nominal yang dipilih
    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
    };

    // Fungsi untuk validasi dan redirect jika input sudah terisi
    const handleSubmit = () => {
        if (selectedAmount) {
            setRedirect(true);
        }
    };

    // Redirect ke halaman Proses_payment jika semua input valid
    if (redirect) {
        return <Proses_payment donation={selectedAmount}/>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mari Bantu Para Pejuang!</h2>

            <div className="w-full p-6 bg-white shadow-lg rounded-lg">
                <div className="grid grid-cols-1 gap-2 mb-6">
                    <img src="/images/gambar.jpg" alt="volunteer1" className="w-full h-full object-cover rounded-lg" />
                </div>

                <p className="text-black mb-4">
                    Donasi ini akan sepenuhnya digunakan untuk mendukung kelancaran kegiatan Volunteer.
                </p>

                {/* Pilih Nominal */}
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-black mb-2">Pilih Nominal</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <button onClick={() => handleAmountClick(10000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 10.000</button>
                        <button onClick={() => handleAmountClick(25000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 25.000</button>
                        <button onClick={() => handleAmountClick(50000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 50.000</button>
                        <button onClick={() => handleAmountClick(75000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 75.000</button>
                        <button onClick={() => handleAmountClick(100000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 100.000</button>
                        <button onClick={() => handleAmountClick(200000)} className="py-2 px-4 bg-white text-black font-semibold rounded-lg border border-blue-200">IDR. 200.000</button>
                    </div>
                </div>

                {/* Input Nominal Lainnya */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Nominal Lainnya</label>
                    <input
                        type="number"
                        placeholder="IDR"
                        value={selectedAmount || ""}
                        onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00609B]"
                        min="10000"
                    />
                    <p className="text-sm text-gray-500 mt-1">*minimal nominal IDR.10.000</p>
                </div>

                {/* Button Lanjutkan Pembayaran */}
                <button
                    onClick={handleSubmit}
                    disabled={!selectedAmount} // Disable jika nominal kosong
                    className="w-1/3 py-2 bg-[#00609B] text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Lanjutkan Pembayaran
                </button>
            </div>
        </div>
    );
}

export default Donasi;
