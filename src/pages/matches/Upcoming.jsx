import { useState, useEffect } from 'react';
import MatchCard from '../../components/sections/MatchCard';
import PastMatches from './PastMatches';

export default function UpcomingMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));

                // Mock data
                const mockMatches = [
                    {
                        id: 1,
                        date: '2023-06-15',
                        time: '15:00',
                        homeTeam: 'MbingloFC',
                        awayTeam: 'City Rivals',
                        venue: 'Mbinglo Stadium',
                        competition: 'Premier League'
                    },
                    {
                        id: 2,
                        date: '2023-06-22',
                        time: '19:45',
                        homeTeam: 'United FC',
                        awayTeam: 'MbingloFC',
                        venue: 'United Arena',
                        competition: 'Premier League'
                    },
                    {
                        id: 3,
                        date: '2023-06-30',
                        time: '20:00',
                        homeTeam: 'MbingloFC',
                        awayTeam: 'Athletic Club',
                        venue: 'Mbinglo Stadium',
                        competition: 'Cup Quarterfinals'
                    }
                ];

                setMatches(mockMatches);
            } catch (err) {
                setError('Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "url('/src/assets/hero.jpeg')" // Replace with your actual image path
                }}
            >
                

                {/* Content */}
                <div className="relative z-10 text-center px-4 bg-emerald-400 p-4 rounded-2xl">
                    <h1 className="text-4xl font-extrabold text-green-950 mb-4 drop-shadow-lg">
                        MbingloFC Match Center
                    </h1>
                    <p className="text-lg text-green-950 max-w-2xl mx-auto drop-shadow-md">
                        Stay updated with all upcoming and recent matches of MbingloFC — see match results, schedules, and more.
                    </p>
                </div>
            </section>

            <div className="min-h-screen bg-gradient-to-br bg-[#0b3d2e] text-white">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-10 text-center text-green-100">Upcoming Matches</h1>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
                            <p className="mt-4 text-gray-200">Loading matches...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                            {error}
                        </div>
                    ) : matches.length === 0 ? (
                        <p className="text-center text-gray-400 py-12">No upcoming matches scheduled.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {matches.map(match => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    )}
                </div>
                <PastMatches />
            </div>
        </>
    );
}
