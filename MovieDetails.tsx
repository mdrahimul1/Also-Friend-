import React from 'react';
import { Movie } from './Home';

interface MovieDetailsProps {
    movie: Movie;
    onBack: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={onBack}
                className="mb-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
                &larr; ফিরে যান
            </button>

            <div className="aspect-w-16 aspect-h-9 mb-4">
                 <video
                    src={movie.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full rounded-lg shadow-2xl bg-black"
                >
                   আপনার ব্রাউজার ভিডিও ট্যাগ সমর্থন করে না।
                </video>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                <p className="text-gray-300">{movie.description}</p>
            </div>
        </div>
    );
};

export default MovieDetails;