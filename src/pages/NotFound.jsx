import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-900 to-green-950 text-white">
            <div className="text-center p-8 max-w-md mx-auto">
                <h1 className="text-6xl font-bold mb-4 text-green-400">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-300 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Return to homepage"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;