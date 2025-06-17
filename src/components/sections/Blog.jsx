import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiArrowRight, FiClock, FiHeart, FiShare2 } from 'react-icons/fi';

const blogPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Mastering Ball Control Techniques',
        date: 'April 20, 2025',
        readTime: '5 min read',
        likes: 42,
        description: 'Improve your first touch and close control with these essential drills used by professional players. Learn how to shield the ball effectively and maintain possession under pressure from defenders.',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Precision Passing Exercises',
        date: 'April 18, 2025',
        readTime: '8 min read',
        likes: 89,
        description: 'Develop your passing accuracy with these targeted exercises. From short ground passes to long diagonal balls, these drills will help you find your teammates with consistency and proper weight.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Goalkeeping Fundamentals',
        date: 'April 15, 2025',
        readTime: '6 min read',
        likes: 56,
        description: 'Essential techniques every goalkeeper should master. Learn proper positioning, diving techniques, and distribution skills to become a complete last line of defense for your team.',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c47a06b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Defensive Positioning Strategies',
        date: 'April 10, 2025',
        readTime: '7 min read',
        likes: 73,
        description: 'Learn how to read the game and position yourself effectively as a defender. This guide covers zonal marking, man-to-man tactics, and how to anticipate opponent movements.',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1579952363878-3c3c5dd47582?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Striker Finishing Drills',
        date: 'April 5, 2025',
        readTime: '9 min read',
        likes: 112,
        description: 'Clinical finishing separates good strikers from great ones. Practice these shooting drills to improve your accuracy, power, and ability to finish under pressure in various game situations.',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Midfield Playmaking Guide',
        date: 'April 1, 2025',
        readTime: '10 min read',
        likes: 154,
        description: 'Develop your vision and creativity as a midfield playmaker. Learn how to control the tempo of the game, find pockets of space, and deliver decisive passes that break defensive lines.',
    },
];

export default function Blog() {
    const [expanded, setExpanded] = useState({});
    const [likedPosts, setLikedPosts] = useState({});

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quart'
        });
    }, []);

    const toggleReadMore = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleLike = (id) => {
        setLikedPosts((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleShare = (title) => {
        navigator.clipboard.writeText(`${title} - Check out this football training article!`);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-[#0b3d2e] text-white px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <h1 
                    className="text-4xl font-bold text-center mb-6 text-green-300"
                    data-aos="fade-down"
                >
                    Football Training Articles
                </h1>
                
                <p 
                    className="text-center text-green-200 mb-12 max-w-2xl mx-auto"
                    data-aos="fade-down"
                    data-aos-delay="100"
                >
                    Improve your game with expert training tips and techniques
                </p>

                {/* Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div
                            key={post.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="bg-[#132c23] border border-green-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x240?text=Football+Image';
                                        e.target.className = 'w-full h-48 object-cover bg-gray-700';
                                    }}
                                />
                            </div>
                            
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-green-400 flex items-center">
                                        <FiClock className="mr-1" /> {post.readTime}
                                    </span>
                                    <span className="text-xs text-green-400">{post.date}</span>
                                </div>
                                
                                <h2 className="text-xl font-bold mb-3 text-green-100">{post.title}</h2>
                                
                                <p className="text-sm text-green-200 mb-4">
                                    {expanded[post.id]
                                        ? post.description
                                        : `${post.description.slice(0, 120)}${post.description.length > 120 ? '...' : ''}`}
                                </p>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => toggleReadMore(post.id)}
                                        className="text-green-300 text-sm font-medium hover:underline flex items-center"
                                    >
                                        {expanded[post.id] ? 'Read less' : 'Read more'}
                                        <FiArrowRight className="ml-1" />
                                    </button>
                                    
                                    <div className="flex space-x-3">
                                        <button 
                                            onClick={() => toggleLike(post.id)}
                                            className="flex items-center text-sm"
                                        >
                                            <FiHeart 
                                                className={`mr-1 ${likedPosts[post.id] ? 'text-red-500 fill-current' : 'text-green-400'}`} 
                                            />
                                            <span className="text-green-300">
                                                {likedPosts[post.id] ? post.likes + 1 : post.likes}
                                            </span>
                                        </button>
                                        
                                        <button 
                                            onClick={() => handleShare(post.title)}
                                            className="text-green-400 hover:text-green-300"
                                        >
                                            <FiShare2 />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div 
                    className="text-center mt-12"
                    data-aos="fade-up"
                >
                    <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
}