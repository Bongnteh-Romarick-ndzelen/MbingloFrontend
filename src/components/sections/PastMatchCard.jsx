import React from 'react';

export default function PastMatchCard({ match }) {
    const { home_team, away_team, result, date, location } = match;

    return (
        <div className="bg-green-900 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:scale-[1.02] transition-transform duration-300 h-full">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-green-300">{home_team} vs {away_team}</h3>
                <p className="text-lg font-semibold text-white mt-2">{result}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-green-200">
                <p><span className="font-semibold text-white">Date:</span> {date}</p>
                <p><span className="font-semibold text-white">Stadium:</span> {location}</p>
            </div>
        </div>
    );
}
