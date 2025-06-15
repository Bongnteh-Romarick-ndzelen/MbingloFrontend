import { FaShirtsinbulk, FaStar } from 'react-icons/fa';

export default function TeamCard({ player }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition text-center">
            <div className="relative">
                <div className="h-64 overflow-hidden">
                    <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                </div>
                {player.isCaptain && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 p-1 rounded-full">
                        <FaStar />
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                    <FaShirtsinbulk className="text-primary" />
                    <span>#{player.number}</span>
                </div>
                <div className="bg-gray-100 inline-block px-3 py-1 rounded-full text-sm font-medium">
                    {player.position}
                </div>
            </div>
        </div>
    );
}