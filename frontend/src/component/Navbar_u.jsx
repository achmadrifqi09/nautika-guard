import React, { useEffect, useState } from 'react';

function Navbar_u() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginClick = () => {
        setShowLoginPage(true); // Show the login page when the button is clicked
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
                <span className="text-gray-500">19 May 2022</span>
                <button className="text-gray-500">
                    <i className="fas fa-bell"></i>
                </button>
                {!isLoggedIn && (
                    <button onClick={handleLoginClick} className="px-4 py-2 bg-[#00609B] text-white rounded">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar_u;
