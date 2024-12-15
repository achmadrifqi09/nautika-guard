import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Approval_Admin = ({ issueId = null }) => {
    const [issue, setIssue] = useState(null);

    const fetchIssue = async () => {
        const response = await axios.get('http://202.10.42.158:3001/issue');
        if (response.status) {
            setIssue(response?.data?.result);
        } else {
            alert('Terjadi kesalahan saat mengambil data laporan');
        }
    };

    const getApprovalStatus = (status) => {
        if (!status || status == 0) {
            return 'Diproses';
        } else if (status == 1) {
            return 'Distujui';
        } else if (status == 2) {
            return 'Ditolak';
        }
    };

    const checkAvailableIssue = () => {
        if (Array.isArray(issue)) {
            const result = issue.filter((value) => value.approval_status == 1 || value?.approval_status == 2);
            return result.lenght > 0;
        }
        return false;
    };

    useEffect(() => {
        fetchIssue();
    }, [issueId]);
    return (
        <>
            <h3 className="ms-5 text-2xl font-bold mt-10">Riwayat Laporan</h3>
            {issue?.map((data, i) => {
                return data?.approval_status ? (
                    <div className="bg-gray-100 p-5" key={i}>
                        <div className="w-full mx-auto bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-2/3">
                                    <h1 className="text-2xl font-semibold mb-4">{data.title}</h1>
                                    <img
                                        src="images/event5.jpg"
                                        alt="Sungai Brantas"
                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                    />
                                    <h2 className="text-lg font-medium mb-2">Deskripsi</h2>
                                    <p className="text-gray-700 mb-4">{data.description}</p>
                                    <h2 className="text-lg font-medium mb-2">Harapan Pelapor</h2>
                                    <p className="text-gray-700">{data.expectation}</p>
                                </div>
                                <div className="md:w-1/3 md:pl-8 mt-6 md:mt-0">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-4">Profile Pelapor</h3>
                                        <p className="text-gray-700">
                                            <strong>Nama</strong> {data?.full_name}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Telepon</strong> {data?.phone}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Lokasi:</strong> {data?.location}
                                        </p>
                                        <div className="mt-4 flex space-x-2">
                                            <p>{getApprovalStatus(data?.approval_status)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                );
            })}
        </>
    );
};

export default Approval_Admin;
