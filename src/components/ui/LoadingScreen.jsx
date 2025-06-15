import React from 'react';
import { FaCircleNotch } from 'react-icons/fa'; // This will be the spinning loading dot

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="flex items-center justify-center space-x-4 text-white">
                {/* Spinning Loading Dot */}
                <FaCircleNotch className="animate-spin text-4xl text-amber-300" /><br />

                {/* Text */}
                <span className="text-xl"></span>
            </div>
        </div>
    );
}
