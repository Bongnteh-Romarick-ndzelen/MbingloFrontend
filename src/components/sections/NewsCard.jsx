import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

export default function NewsCard({ news }) {
    const newsDate = new Date(news.date);
    const formattedDate = newsDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="h-48 overflow-hidden">
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <FaCalendarAlt />
                    <span className="text-sm">{formattedDate}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                <Link
                    to={`/news/${ news.id }`}
                    className="text-primary font-medium hover:text-primary-dark inline-flex items-center gap-1"
                >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}