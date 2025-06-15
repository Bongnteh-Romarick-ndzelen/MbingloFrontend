import React from 'react';
import PastMatchCard from '../../components/sections/PastMatchCard';

export default function PassMatches() {
    const matches = [
        {
            id: 1,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '2 - 1',
            date: '2025-05-05',
            location: 'Mbinglo Fc Stadium',
        },
        {
            id: 2,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '1 - 1',
            date: '2025-05-06',
            location: 'City Rival Stadium',
        },
        {
            id: 3,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '3 - 0',
            date: '2025-05-07',
            location: 'Stadium Conabo',
        },
        {
            id: 4,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '2 - 2',
            date: '2025-05-08',
            location: 'City Rival Stadium',
        },
        {
            id: 5,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '4 - 1',
            date: '2025-05-09',
            location: 'Stadium Real',
        },
        {
            id: 6,
            home_team: 'Mbinglo FC',
            away_team: 'City Rivals',
            result: '3 - 2',
            date: '2025-05-10',
            location: 'City Rival Stadium',
        },
    ];

    return (
        <section className="min-h-screen bg-[#040d0a] py-6 px-4 text-white flex flex-col items-center">
            <h2 className="text-3xl font-bold text-green-300 text-center mb-10">Past Matches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {matches.map(match => (
                    <PastMatchCard key={match.id} match={match} />
                ))}
            </div>
        </section>
    );
}
