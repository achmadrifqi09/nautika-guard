import React, { useState } from "react";

    function Profil_Admin() {
    const [firstName, setFirstName] = useState("Ananda");
    const [lastName, setLastName] = useState("Putri");
    const [email, setEmail] = useState("Anandaputri@gmail.com");
    const [phone, setPhone] = useState("+6285155225048");
    const [domicile, setDomicile] = useState("Kediri");
    const [username, setUsername] = useState("user123");
    const [profileImage, setProfileImage] = useState("/images/profileadm.jpg");
    const [activeTab, setActiveTab] = useState("Detail Profil");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">

        {/* Main content */}
        <div className="w-full">

            {/* Profile Banner */}
            <div className="bg-white rounded-lg shadow-lg m-10 p-6">
            <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"></div>
            <div className="flex flex-col items-center -mt-16">
                <img
                src="images/profil.png"
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-white"
                />
                <h2 className="text-xl font-semibold text-gray-800 mt-2">
                {firstName} {lastName}
                </h2>
                <p className="text-gray-500 text-sm">{username}</p>
            </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg m-10 p-3">
            <div className="flex space-x-4 mb-6">
                <button
                onClick={() => setActiveTab("Detail Profil")}
                className={`py-2 px-4 font-medium text-gray-700 ${
                    activeTab === "Detail Profil"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
                >
                Detail Profil
                </button>
                <button
                onClick={() => setActiveTab("Edit Profil")}
                className={`py-2 px-4 font-medium text-gray-700 ${
                    activeTab === "Edit Profil" ? "border-b-2 border-blue-500" : ""
                }`}
                >
                Edit Profil
                </button>
                <button
                onClick={() => setActiveTab("Ganti Kata Sandi")}
                className={`py-2 px-4 font-medium text-gray-700 ${
                    activeTab === "Ganti Kata Sandi"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
                >
                Ganti Kata Sandi
                </button>
            </div>

            {/* Content based on active tab */}
            <div className="px-8 py-6">
                {/* Tab Detail Profil */}
                {activeTab === "Detail Profil" && (
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nama Depan</span>
                    <span className="font-semibold">{firstName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nama Belakang</span>
                    <span className="font-semibold">{lastName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold">{email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">No. Hp</span>
                    <span className="font-semibold">{phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600">Domisili</span>
                    <span className="font-semibold">{domicile}</span>
                    </div>
                </div>
                )}

                {/* Tab Edit Profil */}
                {activeTab === "Edit Profil" && (
                <form className="space-y-4">
                    <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Nama Depan</label>
                        <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-gray-700">Nama Belakang</label>
                        <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>

                    <div>
                    <label className="block text-gray-700">No. Hp</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>

                    <div>
                    <label className="block text-gray-700">Domisili</label>
                    <input
                        type="text"
                        value={domicile}
                        onChange={(e) => setDomicile(e.target.value)}
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>

                    <div className="flex flex-col space-y-4 mt-6">
                    <div>
                        <label className="text-gray-600">Ganti Username</label>
                        <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 p-2 border rounded-lg w-full"
                        />
                    </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-[#00609B] rounded-md"
                    >
                        Simpan
                    </button>
                    </div>
                </form>
                )}

                {/* Tab Ganti Kata Sandi */}
                {activeTab === "Ganti Kata Sandi" && (
                <form className="space-y-4">
                    <div>
                    <label className="block text-gray-700">Kata Sandi Lama</label>
                    <input
                        type="password"
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-700">Kata Sandi Baru</label>
                    <input
                        type="password"
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-700">
                        Konfirmasi Kata Sandi Baru
                    </label>
                    <input
                        type="password"
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 text-white bg-[#00609B] rounded-md"
                    >
                        Simpan
                    </button>
                    </div>
                </form>
                )}
            </div>
            </div>
        </div>
        </div>
    );
    }

export default Profil_Admin;
