import React from 'react';
function Datav_Admin({ data, onBack }) {
    return (
        <>
            <div className="bg-gray-100 flex flex-col items-center p-8 w-full">
                <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-8">
                    <button
                        onClick={() => onBack()}
                        className="bg-[#00609B] text-white px-4 py-2 rounded-lg shadow-md mb-4"
                    >
                        Kembali
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">Profile Relawan</h1>
                    <p className="text-gray-600">{data.email}</p>
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 font-medium">Nama Depan:</label>
                                <p className="text-gray-800">{data.first_name}</p>
                            </div>
                            <div>
                                <label className="text-gray-600 font-medium">Nama Belakang:</label>
                                <p className="text-gray-800">{data.last_name}</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-600 font-medium">Alasan Tertarik Menjadi Relawan:</label>
                            <p className="text-gray-800">{data.interest_reason}</p>
                        </div>
                        <div>
                            <label className="text-gray-600 font-medium">Alasan Anda Tepat untuk Pekerjaan Ini:</label>
                            <p className="text-gray-800">{data.suitability_reason}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 font-medium">Bagian Pekerjaan:</label>
                                <p className="text-gray-800">{data.job_role}</p>
                            </div>
                            <div>
                                <label className="text-gray-600 font-medium">No HP:</label>
                                <p className="text-gray-800">{data.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Datav_Admin;
