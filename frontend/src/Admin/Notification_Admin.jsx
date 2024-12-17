import React, { useState, useEffect } from 'react';
import Datav_Admin from './Datav_Admin';
import axios from 'axios';
import Swal from 'sweetalert2';

const Notification_Admin = () => {
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [volunteers, setVolunteers] = useState(null);
    const [issue, setIssue] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);

    const fetchIssue = async () => {
        const response = await axios.get('http://202.10.42.158:3001/issue');
        if (response.status) {
            setIssue(response?.data?.result);
        } else {
            alert('Terjadi kesalahan saat mengambil data laporan');
        }
    };

    const fetchVolunteer = async () => {
        const response = await axios.get('http://202.10.42.158:3001/volunteer');
        if (response.status) {
            setVolunteers(response?.data);
        } else {
            alert('Terjadi kesalahan saat mengambil data laporan');
        }
    };

    const handleNotificationClick = (issueData) => {
        setSelectedIssue(issueData);
    };

    const handleSelectVolunteer = (volunteer) => {
        setSelectedVolunteer(volunteer);
    };

    const handleUpdateApprovalStatus = async (id, status) => {
        const response = await axios.patch('http://202.10.42.158:3001/issue/approval', {
            id: id,
            status_aproval: status,
        });
        if (response.status) {
            fetchIssue();
            setSelectedIssue(null);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: `Status approval barhasil di update menjadi ${status == 1 ? 'disetujui' : 'ditolak'}`,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Opps',
                text: 'Terjadi kesalahan saat mengupdate approval laporan',
            });
        }
    };

    useEffect(() => {
        fetchIssue();
        fetchVolunteer();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifikasi</h2>
                {selectedIssue === null && selectedVolunteer === null ? (
                    <div className="space-y-6">
                        {issue &&
                            issue?.map((data, i) => {
                                return (
                                    (!data?.approval_status || data?.approval_status === 0) && (
                                        <div
                                            key={i}
                                            onClick={() => handleNotificationClick(data)}
                                            className="flex items-start bg-white p-4 shadow-md rounded-lg mb-4 cursor-pointer"
                                        >
                                            <div className="mr-4">
                                                <span className="block w-4 h-4 bg-red-500 rounded-full mt-2"></span>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-12 h-12 rounded-full"
                                                    src="https://via.placeholder.com/80"
                                                    alt="Avatar"
                                                />
                                            </div>
                                            <div className="flex-grow pl-4">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h4 className="text-gray-800 font-semibold">
                                                            {data.full_name}
                                                        </h4>
                                                        <p className="text-gray-400 text-sm text-left">{data.phone}</p>
                                                    </div>
                                                </div>
                                                <h5 className="text-blue-600 font-medium mt-2">{data.title}</h5>
                                                <p className="text-gray-600 text-sm mt-1">{data?.description}</p>
                                            </div>
                                        </div>
                                    )
                                );
                            })}

                        {volunteers &&
                            volunteers?.map((volunteerData, x) => {
                                return (
                                    <div
                                        key={x}
                                        onClick={() => handleSelectVolunteer(volunteerData)}
                                        className="flex items-start bg-white p-4 shadow-md rounded-lg mb-4 cursor-pointer"
                                    >
                                        <div className="mr-4">
                                            <span className="block w-4 h-4 bg-red-500 rounded-full mt-2"></span>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src="https://via.placeholder.com/80"
                                                alt="Avatar"
                                            />
                                        </div>
                                        <div className="flex-grow pl-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h4 className="text-gray-800 font-semibold">
                                                        {volunteerData.first_name} {volunteerData.last_name}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm text-left">
                                                        {volunteerData.phone}
                                                    </p>
                                                </div>
                                            </div>
                                            <h5 className="text-blue-600 font-medium mt-2">{volunteerData.job_role}</h5>
                                            {/* <p className="text-gray-600 text-sm mt-1">{volunteerData?.description}</p> */}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                ) : selectedIssue !== null && selectedVolunteer === null ? (
                    <div className="bg-gray-100 p-5">
                        <button
                            onClick={() => setSelectedIssue(null)}
                            className="bg-[#00609B] text-white px-4 py-2 rounded-lg shadow-md mb-4"
                        >
                            Kembali
                        </button>
                        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/3">
                                    <h1 className="text-2xl font-semibold mb-4">{selectedIssue.title}</h1>
                                    <img
                                        src={`http://202.10.42.158:3001/file?image=${selectedIssue.photo}`}
                                        alt={selectedIssue.title}
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                    <h2 className="text-lg font-medium mb-2">Deskripsi</h2>
                                    <p className="text-gray-700 mb-4">{selectedIssue.description}</p>
                                    <h2 className="text-lg font-medium mb-2">Harapan Pelapor</h2>
                                    <p className="text-gray-700">{selectedIssue.expectation}</p>
                                </div>
                                <div className="md:w-1/3 md:pl-8 mt-6 md:mt-0">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-4">Profile Pelapor</h3>
                                        <p className="text-gray-700">
                                            <strong>Nama</strong> {selectedIssue?.full_name}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Telepon</strong> {selectedIssue?.phone}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Lokasi:</strong> {selectedIssue?.location}
                                        </p>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => handleUpdateApprovalStatus(selectedIssue.id, 2)}
                                                className="bg-[#00609B] text-white px-4 py-2 rounded-lg shadow-md"
                                            >
                                                Tolak
                                            </button>
                                            <button
                                                onClick={() => handleUpdateApprovalStatus(selectedIssue.id, 1)}
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md"
                                            >
                                                Setuju
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    selectedIssue === null &&
                    selectedVolunteer !== null && (
                        <Datav_Admin data={selectedVolunteer} onBack={() => setSelectedVolunteer(null)} />
                    )
                )}
            </div>
        </>
    );
};

export default Notification_Admin;
