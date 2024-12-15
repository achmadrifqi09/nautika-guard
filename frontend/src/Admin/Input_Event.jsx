import React from "react";

    const Input_Event = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tambah Event</h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <section className="flex gap-8">
            {/* Section Foto */}
            <div className="w-1/2">
                <div className="flex items-center justify-center bg-gray-200 h-64 rounded-lg mb-4">
                <button className="text-[#00609B] hover:text-white font-semibold">
                    + Tambah Foto
                </button>
                </div>
                <label className="block text-gray-700 font-semibold mb-1">
                Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                placeholder="Masukkan Deskripsi Event"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                maxLength={100}
                rows={4}
                ></textarea>
                <label className="block text-gray-700 font-semibold mb-1">
                Kegiatan <span className="text-red-500">*</span>
                </label>
                <textarea
                placeholder="Masukkan Kegiatan apa saja yang akan dilaksanakan"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 resize-none"
                maxLength={100}
                rows={4}
                ></textarea>
            </div>

            {/* Section Detail Event */}
            <div className="w-1/2">
                <input
                type="text"
                placeholder="Masukkan judul"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="text"
                placeholder="Masukkan Nama Tim"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="text"
                placeholder="Masukkan Lokasi"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="date"
                placeholder="Masukkan Tanggal"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="time"
                placeholder="Masukkan Waktu"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="text"
                placeholder="Masukkan Perlengkapan"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />
                <input
                type="date"
                placeholder="Masukkan Batas Registrasi"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />

                <div className="flex justify-end gap-4 mt-8">
                <button className="py-2 px-6 bg-gray-300  hover:bg-gray-400 text-gray-700 rounded-lg font-semibold">
                    Batal
                </button>
                <button className="py-2 px-6 bg-[#00609B] hover:bg-blue-600 text-white rounded-lg font-semibold">
                    Submit
                </button>
                </div>
            </div>
            </section>
        </div>
        </div>
    );
    };

export default Input_Event;
