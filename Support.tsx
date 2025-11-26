import React from 'react';
import { TelegramIcon } from './icons';

const Support: React.FC = () => {
    // This URL can be fetched from Firebase/Admin Panel in the future
    const telegramLink = "#"; // Placeholder

    return (
        <div className="flex flex-col items-center justify-center h-full text-center pt-16">
            <h1 className="text-3xl font-bold text-white mb-4">সাপোর্ট</h1>
            <p className="text-gray-400 mb-8">সমস্যা হলে আমাদের সাথে টেলিগ্রামে যোগাযোগ করুন।</p>
            
            <div className="mb-8">
                <TelegramIcon />
            </div>

            <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
            >
                এখন যোগ দিন
            </a>
            
             {telegramLink === "#" && (
                <p className="text-sm text-yellow-400 mt-4">অ্যাডমিন লিঙ্ক যোগ করলে এই বাটনটি কাজ করবে।</p>
            )}
        </div>
    );
};

export default Support;
