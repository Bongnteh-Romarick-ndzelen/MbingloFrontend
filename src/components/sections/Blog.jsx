import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const blogPosts = [
    {
        id: 1,
        image: 'data:image/jpeg;base64,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',
        title: 'How to Break into Tech',
        date: 'April 20, 2025',
        description:
            'Breaking into tech requires strategy, networking, and technical skills. In this post, we explore the steps needed to land your first role, including portfolio building, interview prep, and more.',
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OKT2_ePB66hR81_8Y_yK2d09iqbpANFC4Q&s',
        title: 'Mastering JavaScript for Beginners',
        date: 'April 18, 2025',
        description:
            'JavaScript is essential for web development. This guide introduces the fundamentals of JS, including variables, functions, loops, and how to build simple interactive websites.',
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR703wjlVmCRwKSSfQuNOcGS7fTsb3jEuVsQ&s',
        title: 'Top Remote Work Tools in 2025',
        date: 'April 15, 2025',
        description:
            'Remote work is here to stay. From project management to communication, we review the top tools teams are using this year to stay productive and connected.',
    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzxveiHIImtCInxOvsVppVMSBcCwpeu5oXA&s',
        title: 'Building a Personal Brand in Tech',
        date: 'April 10, 2025',
        description:
            'Your personal brand can open doors. Learn how to effectively use LinkedIn, write thought leadership articles, and position yourself as a go-to expert in your field.',
    },
    {
        id: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTef8zs3KWimI0FIEC931Oh222gd2GtqY9uBQ&s',
        title: 'The Future of Work in 2025',
        date: 'April 5, 2025',
        description:
            'The future of work is here. From remote work to hybrid work, we explore the possibilities for the year ahead.',
    },
    {
        id: 6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2UXK88KIhQ2y1wP-yDqtsMQ0jPHqDu7I8GA&s',
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
