import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Profile_User() {
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
    });
    const [profileForm, setProfileForm] = useState({
        fullName: "",
        email: "",
    });
    const [formChangePassword, setFormChangePassowrd] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Detail Profil");

    const handleChangeProfileForm = (e) => {
        const { name, value } = e.target;
        setProfileForm({ ...profile, [name]: value });
    };

    const handleChangePasswordForm = (e) => {
        const { name, value } = e.target;
        setFormChangePassowrd({ ...formChangePassword, [name]: value });
    };

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const response = await axios.get(
                `http://localhost:3001/user/${userId}`
            );
            if (response.status === 200) {
                setProfile({
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                });
                setProfileForm({
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                });
            }
        } catch {
            alert("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put("http://localhost:3001/user", {
                ...profileForm,
                id: localStorage.getItem("userId"),
            });
            if (response.status === 200) {
                setProfile({
                    fullName: response.data.user.fullName,
                    email: response.data.user.email,
                });
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Profil anda berhasil diperbarui",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text:
                    error?.response?.data?.message ||
                    "Terjadi kesalahan saat memperbarui data",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (
            formChangePassword.confirm_password !==
            formChangePassword.new_password
        ) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Opps",
                text: "Konfirmasi password tidak sesuai",
            });
        } else if (
            formChangePassword.confirm_password.length == 0 ||
            formChangePassword.new_password.length == 0 ||
            formChangePassword.current_password.length == 0
        ) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Opps",
                text: "Semua data wajib diisi",
            });
        } else {
            try {
                setLoading(true);

                const response = await axios.put(
                    "http://localhost:3001/user/change-password",
                    {
                        id: localStorage.getItem("userId"),
                        oldPassword: formChangePassword.current_password,
                        newPassword: formChangePassword.new_password,
                    }
                );
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Password anda berhasil diperbarui",
                    });
                    setFormChangePassowrd({
                        current_password: "",
                        confirm_password: "",
                        new_password: "",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Opps",
                    text:
                        error?.response?.data?.message ||
                        "Terjadi kesalahan saat memperbarui data",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center">
            {/* Profile Banner */}
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 mt-10">
                <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"></div>
                <div className="flex flex-col items-center -mt-16">
                    <img
                        src="images/profil.png"
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-white"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mt-2">
                        {profile.fullName}
                    </h2>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 mt-6 p-6">
                <div className="flex space-x-4 border-b pb-3">
                    <button
                        onClick={() => setActiveTab("Detail Profil")}
                        className={`py-2 px-4 font-medium ${
                            activeTab === "Detail Profil"
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-600"
                        }`}
                    >
                        Detail Profil
                    </button>
                    <button
                        onClick={() => setActiveTab("Edit Profil")}
                        className={`py-2 px-4 font-medium ${
                            activeTab === "Edit Profil"
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-600"
                        }`}
                    >
                        Edit Profil
                    </button>
                    <button
                        onClick={() => setActiveTab("Ganti Password")}
                        className={`py-2 px-4 font-medium ${
                            activeTab === "Ganti Password"
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-600"
                        }`}
                    >
                        Ganti Password
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === "Detail Profil" && (
                        <div>
                            {loading && (
                                <div className="w-8 h-8 rounded-full animate-spin border-4 mt-6 border-solid border-indigo-500 border-t-transparent mx-auto"></div>
                            )}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Full Name
                                    </span>
                                    <span className="font-semibold">
                                        {profile.fullName}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Email</span>
                                    <span className="font-semibold">
                                        {profile.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "Edit Profil" && (
                        <form
                            className="space-y-4"
                            onSubmit={(e) => handleUpdateProfile(e)}
                        >
                            <div>
                                <label className="block text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profileForm.fullName}
                                    onChange={handleChangeProfileForm}
                                    placeholder="Enter your full name"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileForm.email}
                                    onChange={handleChangeProfileForm}
                                    placeholder="Enter your email"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    // onClick={handleSave}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 flex gap-2 items-center"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent mx-auto"></div>
                                            <p className="text-white">
                                                Saving ..
                                            </p>
                                        </>
                                    ) : (
                                        <span>Save Changes</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === "Ganti Password" && (
                        <form
                            className="space-y-4"
                            onSubmit={(e) => handleUpdatePassword(e)}
                        >
                            <div>
                                <label className="block text-gray-700">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    name="current_password"
                                    value={formChangePassword.current_password}
                                    onChange={(e) =>
                                        handleChangePasswordForm(e)
                                    }
                                    placeholder="Enter old password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={formChangePassword.new_password}
                                    onChange={(e) =>
                                        handleChangePasswordForm(e)
                                    }
                                    placeholder="Enter new password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirm_password"
                                    value={formChangePassword.confirm_password}
                                    onChange={(e) =>
                                        handleChangePasswordForm(e)
                                    }
                                    placeholder="Confirm new password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent mx-auto"></div>
                                            <p className="text-white">
                                                Saving ..
                                            </p>
                                        </>
                                    ) : (
                                        <span>Change Password</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile_User;
