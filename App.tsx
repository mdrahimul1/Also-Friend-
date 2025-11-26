import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Login from './Login';
import Register from './Register';
import MainApp from './MainApp';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'login' | 'register'>('login');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen animated-bg flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (user) {
        return <MainApp user={user} />;
    }

    return (
        <div className="min-h-screen animated-bg flex flex-col items-center justify-center p-4 font-sans">
             <div className="w-full max-w-md">
                {view === 'login' ? <Login switchToRegister={() => setView('register')} /> : <Register switchToLogin={() => setView('login')} />}
             </div>
        </div>
    );
};

export default App;
