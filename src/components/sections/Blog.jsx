import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const blogPosts = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'How to Break into Tech',
        date: 'April 20, 2025',
        description: 'Breaking into tech requires strategy, networking, and technical skills. In this post, we explore the steps needed to land your first role, including portfolio building, interview prep, and more.',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'Mastering JavaScript for Beginners',
        date: 'April 18, 2025',
        description: 'JavaScript is essential for web development. This guide introduces the fundamentals of JS, including variables, functions, loops, and how to build simple interactive websites.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'Top Remote Work Tools in 2025',
        date: 'April 15, 2025',
        description: 'Remote work is here to stay. From project management to communication, we review the top tools teams are using this year to stay productive and connected.',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'Building a Personal Brand in Tech',
        date: 'April 10, 2025',
        description: 'Your personal brand can open doors. Learn how to effectively use LinkedIn, write thought leadership articles, and position yourself as a go-to expert in your field.',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'The Future of Work in 2025',
        date: 'April 5, 2025',
        description: 'The future of work is here. From remote work to hybrid work, we explore the possibilities for the year ahead.',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1677442135136-760c813cd6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'Understanding AI and Machine Learning',
        date: 'April 1, 2025',
        description: 'AI and machine learning are transforming industries. This post breaks down the basics of AI, how it works, and its applications in various fields.',
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
        <div className="min-h-screen bg-[#0b3d2e] text-white px-6 py-auto">
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
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/320x160?text=Image+Not+Available';
                                e.target.className = 'w-full h-40 object-cover bg-gray-700';
                            }}
                        />
                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold text-green-100">{post.title}</h2>
                            <p className="text-xs text-green-400">{post.date}</p>
                            <p className="text-sm text-green-200">
                                {expanded[post.id]
                                    ? post.description
                                    : `${post.description.slice(0, 100)}${post.description.length > 100 ? '...' : ''}`}
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