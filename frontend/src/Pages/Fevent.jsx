import React, { useState } from 'react';
import Suksesvol from './Suksesvol';
import axios from 'axios';

const Fevent = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        interest_reason: '',
        suitability_reason: '',
        job_role: '',
        phone_number: '',
        email: '',
    });
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi email dan nomor HP
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!emailRegex.test(formData.email)) {
            setError('Format email tidak valid.');
            return;
        }
        if (!phoneRegex.test(formData.phone_number)) {
            setError('Nomor HP harus terdiri dari 10-15 digit angka.');
            return;
        }
        if (Object.values(formData).some((field) => field.trim() === '')) {
            setError('Harap isi semua field sebelum mengirim.');
            return;
        }

        try {
            // Kirim data ke backend
            const response = await axios.post('http://202.10.42.158:3001/volunteer', formData);

            console.log('Data berhasil disimpan:', response.data);
            setRedirect(true); // Redirect ke halaman sukses
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Gagal mengirim data.');
            } else {
                setError('Terjadi kesalahan. Silakan coba lagi.');
            }
        }
    };

    // Redirect ke halaman sukses jika pengiriman berhasil
    if (redirect) {
        return <Suksesvol />;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4 mt-3">Daftar Menjadi Pejuang</h2>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Formulir input data */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Masukkan Nama Depan"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Masukkan Nama Belakang"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Alasan Ketertarikan */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mengapa Anda Tertarik?</label>
                        <textarea
                            name="interest_reason"
                            value={formData.interest_reason}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Ceritakan alasan Anda"
                            required
                        ></textarea>
                    </div>

                    {/* Alasan Kesesuaian */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mengapa Anda Tepat?</label>
                        <textarea
                            name="suitability_reason"
                            value={formData.suitability_reason}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Jelaskan keunggulan Anda"
                            required
                        ></textarea>
                    </div>

                    {/* Bagian Pekerjaan dan No Handphone */}
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bagian Pekerjaan:</label>
                            <input
                                type="text"
                                name="job_role"
                                value={formData.job_role}
                                onChange={handleChange}
                                placeholder="Pilih Bagian Pekerjaan"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No Handphone:</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Masukkan No Handphone"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Masukkan Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-6 w-1/5 bg-[#00609B] text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Kirim Formulir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Fevent;
