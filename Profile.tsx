import React, { useState } from 'react';
import { User, signOut, updatePassword } from 'firebase/auth';
import { auth } from './firebase';
import { LogoutIcon, LockIcon } from './icons';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogout = () => {
        signOut(auth).catch((error) => console.error("Logout failed", error));
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!newPassword || !confirmPassword) {
            setError('অনুগ্রহ করে উভয় পাসওয়ার্ড ঘর পূরণ করুন।');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('নতুন পাসওয়ার্ড দুটি মিলছে না।');
            return;
        }
        if (newPassword.length < 6) {
             setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword(user, newPassword);
            setSuccess('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError('পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে। অনুগ্রহ করে লগআউট করে আবার চেষ্টা করুন।');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">প্রোফাইল</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">অ্যাকাউন্টের তথ্য</h2>
                <div className="flex items-center">
                    <p className="text-gray-300">ইমেইল:</p>
                    <p className="ml-2 text-white font-medium">{user.email}</p>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">পাসওয়ার্ড পরিবর্তন করুন</h2>
                <form onSubmit={handleChangePassword}>
                     <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="new-password">
                           নতুন পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <LockIcon />
                            </span>
                            <input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirm-new-password">
                            নতুন পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <LockIcon />
                            </span>
                            <input
                                id="confirm-new-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    {success && <p className="text-green-400 text-sm mt-2">{success}</p>}
                    <button type="submit" disabled={isLoading} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 disabled:bg-blue-400">
                        {isLoading ? 'সংরক্ষণ করা হচ্ছে...' : 'পাসওয়ার্ড সংরক্ষণ করুন'}
                    </button>
                </form>
            </div>

            <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 flex items-center justify-center"
            >
                <LogoutIcon/>
                লগ আউট
            </button>
        </div>
    );
};

export default Profile;
