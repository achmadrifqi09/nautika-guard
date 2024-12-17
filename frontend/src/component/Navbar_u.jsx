import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Navbar_u() {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginClick = () => {
        navigate('/login')
    };

    useEffect(() => {
        if (localStorage) {
            const isLogin = localStorage.getItem('isLoggedIn');
            setIsLoggedIn(isLogin ? true : false);
        }
    }, []);
    return (
        <nav className="flex items-center justify-between p-7 shadow-lg bg-white">
            <input
                type="text"
                placeholder="Ketik Untuk Mencari.."
                className="p-2 rounded-full bg-gray-200 outline-none"
            />
            <div className="flex items-center space-x-4">
                <span className="text-gray-500"></span>
                <button className="text-gray-500">
                    <i className="fas fa-bell"></i>
                </button>
                {!isLoggedIn && (
                    <button onClick={handleLoginClick} className="px-4 py-2 bg-[#00609B] text-white rounded">
                        Masuk
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar_u;
