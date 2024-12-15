import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginSuccess } from '../redux/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Inisialisasi useNavigate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fungsi untuk login
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // Kirim data login ke backend
            const response = await fetch('http://202.10.42.158:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Simpan status login ke localStorage
                localStorage.setItem('isLoggedIn', 'true');

                if (data.user.role === 'admin') {
                    localStorage.setItem('isAdmin', 'true');
                    dispatch(
                        loginSuccess({
                            email: data.user.email,
                            isAdmin: true,
                        })
                    );
                    navigate('/SidebarAdmin'); // Navigasi ke halaman admin
                } else {
                    localStorage.setItem('isAdmin', 'false');
                    dispatch(
                        loginSuccess({
                            email: data.user.email,
                            isAdmin: false,
                        })
                    );
                    navigate('/Sidebar'); // Navigasi ke halaman user biasa
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Login gagal.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan pada server.');
        }
    };

    // Fungsi untuk menangani klik tombol "Daftar"
    const handleSignUpClick = () => {
        navigate('/Signup'); // Arahkan ke halaman SignUp
    };

    return (
        <div className="min-h-screen flex bg-gray-100 m-2">
            {/* Form Section */}
            <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-8 bg-white shadow-lg">
                <div className="mb-1">
                    <img src="/images/nautika.png" alt="logo" className="w-[152px] h-[115px] object-cover rounded-md" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Masuk</h2>
                <p className="text-gray-600 mb-6">Tambahkan kredensial Anda untuk masuk</p>

                <form className="w-full" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email*</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan alamat email"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi*</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 focus:outline-none"
                            autoComplete="current-password" // Tambahkan atribut ini
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 flex items-center justify-center bg-[#00609B] text-white rounded-md hover:bg-blue-600 transition duration-200 px-4 text-base font-medium shadow-sm"
                    >
                        Masuk
                    </button>
                </form>

                <button
                    onClick={handleSignUpClick} // Tambahkan event handler untuk navigasi
                    className="w-full h-12 flex items-center justify-center bg-[#00609B] text-white rounded-md hover:bg-blue-600 transition duration-200 px-4 mt-4 text-base font-medium shadow-sm"
                >
                    Daftar
                </button>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex w-1/2 bg-white justify-center items-center px-6 py-8 md:p-8 lg:p-12">
                <img
                    src="/images/plastik.jpg"
                    alt="loginimage"
                    className="w-[775px] h-[px] p-4 object-cover rounded-md"
                />
            </div>
        </div>
    );
};

export default Login;
