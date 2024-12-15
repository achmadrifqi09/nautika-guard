import React, { useState } from 'react';
import Fevent from './Fevent'; // Ensure this import matches the file structure
import Donasi from './Donasi'; // Ensure this import matches the file structure

const Detail_Event = ({ event }) => {
    const [page, setPage] = useState('detail'); // Track current page

    if (!event) return <p>Loading...</p>;

    // Render different pages based on the current state
    if (page === 'fevent') return <Fevent />;
    if (page === 'donasi') return <Donasi />;

    return (
        <div className="p-8 bg-gray-100 h-screen overflow-y-auto">
            <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Bagian kiri - Foto Event dan Deskripsi */}
                <div className="flex-1">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-65 lg:h-80 object-cover rounded-lg mb-6"
                    />

                    <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
                    <p className="text-gray-700 mb-6">{event.description}</p>

                    <h2 className="text-2xl font-semibold mb-4">Kegiatan yang dilakukan</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Pengumpulan sampah di sepanjang garis pantai</li>
                        <li>Pemilahan sampah</li>
                        <li>Pencatatan jenis dan jumlah sampah yang terkumpul</li>
                    </ul>
                </div>

                {/* Bagian kanan - Frame Box */}
                <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-black mb-2">{event.title}</h3>
                        <p className="text-black-700 mb-4">Bersama PASUKAN PEDULI</p>

                        <div className="flex items-center text-black-600 mb-4">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                            </svg>
                            Kenjeran, Surabaya
                        </div>

                        <div className="flex items-center text-black-600 mb-4">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3h-1V2h-2v1H8V2H6v1H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM7 11h5v5H7z" />
                            </svg>
                            {event.date}
                        </div>

                        <div className="flex items-center text-black-600 mb-4">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM22 12c0 1.1-.9 2-2 2h-1.17c-.41 1.17-1.52 2-2.83 2s-2.42-.83-2.83-2H10c-.41 1.17-1.52 2-2.83 2S4.75 13.17 4.34 12H3c-1.1 0-2-.9-2-2s.9-2 2-2h1.17C4.75 7.83 5.86 7 7.17 7s2.42.83 2.83 2h4.34c.41-1.17 1.52-2 2.83-2s2.42.83 2.83 2H20c1.1 0 2 .9 2 2z" />
                            </svg>
                            Pukul 08.00 - Selesai
                        </div>

                        <p className="text-black-600 mb-6">Batas Registrasi: 18 Oktober 2024</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setPage('fevent')}
                            className="w-full bg-[#00609B] text-white font-semibold py-2 rounded-md hover:bg-[#004e7a]"
                        >
                            GABUNG
                        </button>
                        <button
                            onClick={() => setPage('donasi')}
                            className="w-full bg-[#00609B] text-white font-semibold py-2 rounded-md hover:bg-[#004e7a]"
                        >
                            DONASI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_Event;
