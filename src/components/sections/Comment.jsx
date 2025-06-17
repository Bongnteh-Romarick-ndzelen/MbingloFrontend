import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialComments = [
    {
        id: 1,
        name: 'Romarick Ndzelen',
        text: "Discover Pinterest's best ideas and inspiration for Football quotes motivational.Get inspired and try out new things. 12k people searched this Discover Pinterest's best ideas and inspiration for Football quotes motivational. Get inspired and try out new things. 12k people searched this",
        time: '10:30 AM',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: 2,
        name: 'Bob',
        text: 'I found this really insightful. Looking forward to more posts like this.',
        time: '10:45 AM',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        id: 3,
        name: 'Claire',
        text: 'Could you expand more on the last section? It was a bit brief.',
        time: '11:00 AM',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
        id: 4,
        name: 'David',
        text: 'Nice work! Very clear and informative.',
        time: '11:20 AM',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
        id: 5,
        name: 'Emma',
        text: 'Thank you! I’ve been looking for this kind of content.',
        time: '11:35 AM',
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
];

const Comment = ({ comment, onDelete }) => {
    return (
        <motion.div
            className="bg-gradient-to-br from-green-900 to-green-800 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-green-700 relative group"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <button 
                onClick={() => onDelete(comment.id)}
                className="absolute top-3 right-3 text-green-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
            >
                ×
            </button>
            <div className="flex items-start gap-3">
                <motion.img 
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <h3 className="text-green-300 font-medium">{comment.name}</h3>
                        <span className="text-xs text-green-400">{comment.time}</span>
                    </div>
                    <motion.p 
                        className="text-white mt-1 text-sm leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {comment.text}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default function CommentsPage() {
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) return;
        
        setIsSubmitting(true);
        
        // Simulate async submission
        setTimeout(() => {
            const newComment = {
                id: Date.now(),
                name,
                text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
            };
            
            setComments([newComment, ...comments]);
            setName('');
            setText('');
            setIsSubmitting(false);
        }, 500);
    };

    const handleDelete = (id) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-900 text-white px-4 py-10 md:px-6">
            <motion.div 
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-center text-2xl md:text-3xl font-bold text-green-100 mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Community Comments
                    <motion.div 
                        className="h-1 bg-green-500 mx-auto mt-2 w-20 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </motion.h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Comment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="order-last lg:order-first"
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-2xl shadow-xl border border-green-700"
                            whileHover={{ y: -5 }}
                        >
                            <h2 className="text-2xl text-green-200 font-semibold mb-4">Share Your Thoughts</h2>
                            
                            <motion.div className="mb-4" whileFocus={{ scale: 1.02 }}>
                                <label htmlFor="name" className="block text-green-300 text-sm mb-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-green-900 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-green-700"
                                    required
                                />
                            </motion.div>
                            
                            <motion.div className="mb-4" whileFocus={{ scale: 1.02 }}>
                                <label htmlFor="comment" className="block text-green-300 text-sm mb-1">Comment</label>
                                <textarea
                                    id="comment"
                                    placeholder="What's on your mind?"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-green-900 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 border border-green-700"
                                    required
                                />
                            </motion.div>
                            
                            <motion.button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2"
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="inline-block"
                                        >
                                            ⏳
                                        </motion.span>
                                        Posting...
                                    </>
                                ) : (
                                    "Post Comment"
                                )}
                            </motion.button>
                        </motion.form>
                    </motion.div>
                    
                    {/* Comments List */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl text-green-200 font-medium mb-2">{comments.length} Comments</h3>
                        
                        <AnimatePresence>
                            {comments.map(comment => (
                                <Comment 
                                    key={comment.id} 
                                    comment={comment} 
                                    onDelete={handleDelete}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}