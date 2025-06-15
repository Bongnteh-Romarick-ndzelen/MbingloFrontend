import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialComments = [
    {
        id: 1,
        name: 'Romarick Ndzelen',
        text: "Discover Pinterest's best ideas and inspiration for Football quotes motivational.Get inspired and try out new things. 12k people searched this Discover Pinterest's best ideas and inspiration for Football quotes motivational. Get inspired and try out new things. 12k people searched this",
        time: '10:30 AM',
    },
    {
        id: 2,
        name: 'Bob',
        text: 'I found this really insightful. Looking forward to more posts like this.',
        time: '10:45 AM',
    },
    {
        id: 3,
        name: 'Claire',
        text: 'Could you expand more on the last section? It was a bit brief.',
        time: '11:00 AM',
    },
    {
        id: 4,
        name: 'David',
        text: 'Nice work! Very clear and informative.',
        time: '11:20 AM',
    },
    {
        id: 5,
        name: 'Emma',
        text: 'Thank you! I’ve been looking for this kind of content.',
        time: '11:35 AM',
    },
];

export default function CommentsPage() {
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;
        const newComment = {
            id: Date.now(),
            name,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setComments([newComment, ...comments]);
        setName('');
        setText('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-white px-6 py-10 animate-fade-in">
            <motion.h1
                className="text-center text-4xl font-bold text-green-100 mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Popular Comments
            </motion.h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Comments List */}
                <motion.div
                    className="space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    {comments.map(comment => (
                        <motion.div
                            key={comment.id}
                            className="bg-green-950 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between text-green-300 text-sm ">
                                <span>{comment.name}</span>
                                <span>{comment.time}</span>
                            </div>
                            <p className="text-white text-base">{comment.text}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Comment Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-green-950 p-6 rounded-2xl shadow-lg flex flex-col gap-4 animate-fade-in"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl text-green-200 font-semibold mb-2">Leave a Comment</h2>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <textarea
                        placeholder="Your comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                        className="px-4 py-2 rounded-lg bg-green-800 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-lg font-medium"
                    >
                        Submit
                    </button>
                </motion.form>
            </div>
        </div>
    );
}
