import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { EmailIcon, LockIcon, EyeIcon, EyeSlashIcon } from './icons';

interface RegisterProps {
    switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password || !confirmPassword) {
            setError('অনুগ্রহ করে সমস্ত ঘর পূরণ করুন।');
            return;
        }
        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড দুটি মিলছে না।');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন।');
            return;
        }

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
            });
            setSuccess('রেজিস্ট্রেশন সফল হয়েছে! এখন লগইন করুন।');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // onAuthStateChanged will handle redirect
        } catch (err: any) {
             if (err.code === 'auth/email-already-in-use') {
                setError('এই ইমেইল ঠিকানাটি ইতিমধ্যে ব্যবহৃত হয়েছে।');
            } else {
                setError('রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white tracking-wider">মুভি অ্যাপ</h1>
                <p className="text-gray-400 mt-2">আপনার অ্যাকাউন্ট তৈরি করুন</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        ইমেইল
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <EmailIcon />
                        </span>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                        পাসওয়ার্ড
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <LockIcon />
                        </span>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white" aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}>
                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirm-password">
                        পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <LockIcon />
                        </span>
                        <input
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            required
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white" aria-label={showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}>
                            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>
                
                {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}
                {success && <p className="text-green-400 text-center text-sm mb-4">{success}</p>}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'রেজিস্টার'}
                    </button>
                </div>
            </form>
            
            <p className="text-center text-gray-400 text-sm mt-6">
                আপনার ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
                <button onClick={switchToLogin} className="font-bold text-blue-500 hover:text-blue-400 transition-colors bg-transparent border-none">
                    লগইন করুন
                </button>
            </p>
        </div>
    );
};

export default Register;
