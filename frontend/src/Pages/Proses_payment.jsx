// Proses_payment.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Proses_payment({ donationAmount }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [donation, setDonation] = useState(donationAmount);
    const [hide, setHide] = useState(false);

    // Fungsi untuk menangani proses pembayaran
    const handlePayment = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !donation) {
            alert('Harap lengkapi semua data.');
            return;
        }

        try {
            // Kirim data ke server untuk mendapatkan token transaksi
            const response = await axios.post('http://202.10.42.158:3001/proses_payment', {
                name,
                email,
                phone,
                amount: donation,
                hide: hide,
            });

            const { token } = response.data;

            // Integrasi Snap.js untuk memproses pembayaran
            window.snap.pay(token, {
                onSuccess: (result) => {
                    alert('Pembayaran Berhasil!');
                    console.log(result);
                },
                onPending: (result) => {
                    alert('Pembayaran Tertunda!');
                    console.log(result);
                },
                onError: (result) => {
                    alert('Pembayaran Gagal!');
                    console.log(result);
                },
                onClose: () => {
                    alert('Anda menutup popup pembayaran!');
                },
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memproses pembayaran.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl flex">
                <div className="p-8 w-1/2">
                    <h2 className="text-xl font-semibold mb-6">Lengkapi Identitas Anda</h2>
                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                Nama Donatur:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                Email Donatur:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Masukkan email anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                                Nomor Telepon:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Masukkan nomor telepon anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="donation">
                                Donasi Anda
                            </label>
                            <input
                                type="number"
                                id="donation"
                                value={donation}
                                onChange={(e) => setDonation(e.target.value)}
                                placeholder="Masukkan Nominal"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="hide"
                                checked={hide}
                                onChange={(e) => setHide(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="hide" className="ml-2 text-gray-700">
                                Sembunyikan
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#00609B] text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Kontribusi Donasi
                        </button>
                    </form>
                </div>
                <div className="p-8 w-1/2 flex items-center justify-center">
                    <img src="/images/proses.jpg" alt="Donate" className="rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default Proses_payment;
