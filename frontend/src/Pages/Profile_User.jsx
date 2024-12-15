import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile_User({ userId }) {
    const [profile, setProfile] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Detail Profil');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (userId) {
            // Pastikan userId tidak undefined
            const fetchProfile = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://202.10.42.158:3001/user/${userId}`);
                    setProfile(response.data.user);
                } catch (error) {
                    console.error('Error fetching profile:', error.response?.data || error.message);
                    alert('Failed to fetch profile. Please try again.');
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        } else {
            console.error('User ID is undefined');
        }
    }, [userId]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!profile.fullName || !profile.email || !profile.password) {
            alert('All fields are required!');
            return;
        }

        try {
            setLoading(true);
            await axios.put('http://202.10.42.158:3001/user', {
                id: userId,
                ...profile,
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put('http://202.10.42.158:3001/user/change-password', {
                id: userId,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });

            alert(response.data.message);
        } catch (error) {
            console.error('Error updating password:', error.response?.data || error.message);
            alert('Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    <h2 className="text-xl font-semibold text-gray-800 mt-2">{profile.fullName}</h2>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 mt-6 p-6">
                <div className="flex space-x-4 border-b pb-3">
                    <button
                        onClick={() => setActiveTab('Detail Profil')}
                        className={`py-2 px-4 font-medium ${
                            activeTab === 'Detail Profil' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
                        }`}
                    >
                        Detail Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('Edit Profil')}
                        className={`py-2 px-4 font-medium ${
                            activeTab === 'Edit Profil' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
                        }`}
                    >
                        Edit Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('Ganti Password')}
                        className={`py-2 px-4 font-medium ${
                            activeTab === 'Ganti Password'
                                ? 'text-blue-500 border-b-2 border-blue-500'
                                : 'text-gray-600'
                        }`}
                    >
                        Ganti Password
                    </button>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {loading && <p className="text-center text-blue-500">Loading...</p>}
                    {activeTab === 'Detail Profil' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Full Name</span>
                                <span className="font-semibold">{profile.fullName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Email</span>
                                <span className="font-semibold">{profile.email}</span>
                            </div>
                        </div>
                    )}
                    {activeTab === 'Edit Profil' && (
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={profile.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'Ganti Password' && (
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-gray-700">Old Password</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter old password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                    className="mt-1 w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handlePasswordChange}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                                >
                                    {loading ? 'Changing...' : 'Change Password'}
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
