import React, { useState } from 'react';
import { User } from 'firebase/auth';
import Home, { Movie } from './Home';
import Support from './Support';
import Profile from './Profile';
import MovieDetails from './MovieDetails';
import { HomeIcon, SupportIcon, ProfileIcon } from './icons';

interface MainAppProps {
    user: User;
}

type ActiveTab = 'home' | 'support' | 'profile';

const MainApp: React.FC<MainAppProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('home');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleBackFromDetails = () => {
        setSelectedMovie(null);
    };

    const renderContent = () => {
        if (selectedMovie) {
            return <MovieDetails movie={selectedMovie} onBack={handleBackFromDetails} />;
        }
        
        switch (activeTab) {
            case 'home':
                return <Home onSelectMovie={handleSelectMovie} />;
            case 'support':
                return <Support />;
            case 'profile':
                return <Profile user={user} />;
            default:
                return <Home onSelectMovie={handleSelectMovie} />;
        }
    };
    
    const NavButton: React.FC<{tabName: ActiveTab, label: string, children: React.ReactNode}> = ({tabName, label, children}) => {
        const isActive = activeTab === tabName;
        const activeClasses = "text-blue-400";
        const inactiveClasses = "text-gray-400 hover:text-white";
        
        return (
             <button
                onClick={() => {
                    setActiveTab(tabName);
                    setSelectedMovie(null); 
                }}
                className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? "page" : undefined}
            >
                {children}
                <span className="text-xs mt-1">{label}</span>
            </button>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
            <main className="flex-grow p-4 pb-20">
              {renderContent()}
            </main>
            
            {!selectedMovie && (
                <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg">
                    <div className="flex justify-around max-w-lg mx-auto">
                        <NavButton tabName="home" label="হোম">
                            <HomeIcon/>
                        </NavButton>
                        <NavButton tabName="support" label="সাপোর্ট">
                            <SupportIcon/>
                        </NavButton>
                        <NavButton tabName="profile" label="প্রোফাইল">
                            <ProfileIcon/>
                        </NavButton>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default MainApp;