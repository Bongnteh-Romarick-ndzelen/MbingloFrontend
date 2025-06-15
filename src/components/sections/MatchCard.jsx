import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import TeamCard from './TeamCard'

export default function MatchCard({ match }) {
    return (
        <motion.div
            className="bg-gradient-to-br from-green-900 to-black border border-green-700 rounded-xl p-6 shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
        >
            <h2 className="text-2xl font-bold text-green-300 mb-4">
                {match.homeTeam} <span className="text-white">vs</span> {match.awayTeam}
            </h2>

            <div className="flex items-center text-gray-300 mb-2">
                <Calendar className="w-5 h-5 text-green-400 mr-2" />
                <span>{match.date}</span>
            </div>

            <div className="flex items-center text-gray-300 mb-2">
                <Clock className="w-5 h-5 text-green-400 mr-2" />
                <span>{match.time}</span>
            </div>

            <div className="flex items-center text-gray-300 mb-2">
                <MapPin className="w-5 h-5 text-green-400 mr-2" />
                <span>{match.venue}</span>
            </div>

            <div className="flex items-center text-gray-300">
                <Trophy className="w-5 h-5 text-green-400 mr-2" />
                <span>{match.competition}</span>
            </div>
            
        </motion.div>
    );
}
