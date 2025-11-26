import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

interface HomeProps {
  onSelectMovie: (movie: Movie) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectMovie }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesCollection = collection(db, 'movies');
                const movieSnapshot = await getDocs(moviesCollection);
                const moviesList = movieSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Movie));
                setMovies(moviesList);
            } catch (err) {
                console.error("Error fetching movies: ", err);
                setError("মুভি লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">জনপ্রিয় মুভি</h1>
            {movies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <button key={movie.id} onClick={() => onSelectMovie(movie)} className="text-left bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto object-cover aspect-[2/3]" />
                            <div className="p-3">
                                <h3 className="text-md font-semibold text-white truncate">{movie.title}</h3>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 mt-8">কোনো মুভি পাওয়া যায়নি।</p>
            )}
        </div>
    );
};

export default Home;