import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const blogPosts = [
    {
        id: 1,
        image: 'https://via.placeholder.com/400x200?text=Blog+1',
        title: 'How to Break into Tech',
        date: 'April 20, 2025',
        description:
            'Breaking into tech requires strategy, networking, and technical skills. In this post, we explore the steps needed to land your first role, including portfolio building, interview prep, and more.',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/400x200?text=Blog+2',
        title: 'Mastering JavaScript for Beginners',
        date: 'April 18, 2025',
        description:
            'JavaScript is essential for web development. This guide introduces the fundamentals of JS, including variables, functions, loops, and how to build simple interactive websites.',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/400x200?text=Blog+3',
        title: 'Top Remote Work Tools in 2025',
        date: 'April 15, 2025',
        description:
            'Remote work is here to stay. From project management to communication, we review the top tools teams are using this year to stay productive and connected.',
    },
    {
        id: 4,
        image: 'https://via.placeholder.com/400x200?text=Blog+4',
        title: 'Building a Personal Brand in Tech',
        date: 'April 10, 2025',
        description:
            'Your personal brand can open doors. Learn how to effectively use LinkedIn, write thought leadership articles, and position yourself as a go-to expert in your field.',
    },
    {
        id: 5,
        image: 'https://via.placeholder.com/400x200?text=Blog+5',
        title: 'The Future of Work in 2025',
        date: 'April 5, 2025',
        description:
            'The future of work is here. From remote work to hybrid work, we explore the possibilities for the year ahead.',
    },
    {
        id: 6,
        image: 'https://via.placeholder.com/400x200?text=Blog+6',
        title: 'Understanding AI and Machine Learning',
        date: 'April 1, 2025',
        description:
            'AI and machine learning are transforming industries. This post breaks down the basics of AI, how it works, and its applications in various fields.',
    },
];

export default function Blog() {
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const toggleReadMore = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-[#0b3d2e] text-white px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-10 text-green-300">Latest Blog Posts</h1>

            <div className="flex overflow-x-auto pb-6 -mx-6 px-6 space-x-6 scrollbar-hide">
                {blogPosts.map((post, index) => (
                    <div
                        key={post.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="flex-shrink-0 w-80 bg-[#132c23] border border-green-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold text-green-100">{post.title}</h2>
                            <p className="text-xs text-green-400">{post.date}</p>
                            <p className="text-sm text-green-200">
                                {expanded[post.id]
                                    ? post.description
                                    : post.description.slice(0, 100) +
                                    (post.description.length > 100 ? '...' : '')}
                            </p>
                            {post.description.length > 100 && (
                                <button
                                    onClick={() => toggleReadMore(post.id)}
                                    className="text-green-300 text-xs hover:underline focus:outline-none"
                                >
                                    {expanded[post.id] ? 'Read less' : 'Read more'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
