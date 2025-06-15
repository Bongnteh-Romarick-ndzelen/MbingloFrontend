import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage, FaVideo, FaCheck, FaTimes, FaReply, FaTrash, FaArrowRight, FaEdit } from 'react-icons/fa';

export default function Chat() {
    const [chatData, setChatData] = useState([
        { id: 1, username: 'You', message: "Choose the option that best fits your project's existing icon library or preferences.", time: '10:15 AM' },
        { id: 2, username: 'Bob', message: 'Absolutely! Can’t wait! I’m so excited to see you!', time: '10:17 AM' },
        { id: 3, username: 'Young Elvis', message: "Choose the option that best fits your project's existing icon library or preferences.", time: '10:15 AM' },
        { id: 4, username: 'Daniel', message: 'Absolutely! Can’t wait! I’m so excited to see you! The TiC Foundation is an organization that leverages technology to develop innovative solutions to everyday problems plaguing African communities.', time: '10:17 AM' },
        { id: 5, username: 'Emeka Paul', message: "Choose the option that best fits your project's existing icon library or preferences. The TiC Foundation is an organization that leverages technology to develop innovative solutions to everyday problems plaguing African communities.", time: '10:15 AM' },
        { id: 6, username: 'Brain Smith', message: 'Absolutely! Can’t wait! I’m so excited to see you! The TiC Foundation is an organization that leverages technology to develop innovative solutions to everyday problems plaguing African communities.', time: '10:17 AM' },
    ]);

    const [message, setMessage] = useState('');
    const [media, setMedia] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const messagesEndRef = useRef(null);
    const imageInputRef = useRef();
    const videoInputRef = useRef();

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim() && !media) return;

        if (editingId) {
            setChatData(prev => prev.map(m => m.id === editingId ? { ...m, message, media: media?.preview || null, mediaType: media?.type || null } : m));
            setEditingId(null);
        } else {
            const newMessage = {
                id: Date.now(),
                username: 'You',
                message,
                media: media ? media.preview : null,
                mediaType: media ? media.type : null,
                replyTo,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setChatData([...chatData, newMessage]);
        }

        setMessage('');
        setMedia(null);
        setReplyTo(null);
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setMedia({ file, type, preview });
        }
    };

    const scrollToMessage = (id) => {
        const el = document.getElementById(`msg-${ id }`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('ring', 'ring-green-500');
            setTimeout(() => el.classList.remove('ring', 'ring-green-500'), 2000);
        }
    };

    const handleEdit = (chat) => {
        setMessage(chat.message);
        if (chat.media) setMedia({ preview: chat.media, type: chat.mediaType });
        setReplyTo(chat.replyTo || null);
        setEditingId(chat.id);
    };

    const handleDelete = (chatId) => {
        setChatData(prev => prev.map(m => m.id === chatId ? { ...m, message: '[message deleted]', media: null, mediaType: null } : m));
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatData]);

    return (
        <div className="min-h-screen bg-[#34382f] bg-opacity-50 flex flex-col justify-between text-white">
            <header className="text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold text-green-100">All Conversations</h1>
                <hr />
            </header>

            <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-2 max-w-3xl mx-auto w-full">
                {chatData.map(chat => (
                    <div
                        key={chat.id}
                        id={`msg-${ chat.id }`}
                        className={`relative p-3 max-w-xl transition rounded-xl ${ chat.username === 'You' ? 'ml-auto bg-[rgba(16,41,16,0.7)]' : 'bg-[#10291f]' }`}
                    >
                        <div className="text-sm font-bold text-green-400">{chat.username}</div>
                        {chat.replyTo && (
                            <div className="bg-green-800/30 text-sm p-2 rounded mb-1 border-l-4 border-green-500">
                                <span onClick={() => scrollToMessage(chat.replyTo.id)} className="text-green-100 cursor-pointer hover:text-white">
                                    <span className="font-semibold">{chat.replyTo.username}:</span> {chat.replyTo.message}
                                </span>
                            </div>
                        )}
                        <div className="text-white whitespace-pre-wrap">{chat.message}</div>
                        {chat.media && chat.mediaType === 'image' && <img src={chat.media} alt="uploaded" className="mt-2 w-[95%] h-auto rounded-lg object-cover" />}
                        {chat.media && chat.mediaType === 'video' && <video src={chat.media} controls className="mt-2 w-[95%] h-auto rounded-lg" />}

                        <div className="flex justify-between items-center mt-1 text-xs text-green-300">
                            <span>{chat.time}</span>
                            {chat.username === 'You' ? (
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center text-green-400"><FaCheck className="mr-1" size={12} />Sent</span>
                                    <button onClick={() => handleEdit(chat)} className="flex items-center text-blue-400 hover:text-white"><FaEdit className="mr-1" size={12} />Edit</button>
                                    <button onClick={() => handleDelete(chat.id)} className="flex items-center text-red-400 hover:text-white"><FaTrash className="mr-1" size={12} />Delete</button>
                                    <button onClick={() => setReplyTo({ id: chat.id, username: chat.username, message: chat.message })} className="flex items-center text-green-400 hover:text-white"><FaReply className="mr-1" size={12} />Reply</button>
                                </div>
                            ) : (
                                    <button onClick={() => setReplyTo({ id: chat.id, username: chat.username, message: chat.message })} className="flex items-center text-green-400 hover:text-white"><FaReply className="mr-1" size={12} />Reply</button>
                            )}
                        </div>
                    </div>
                ))}

                {(message.trim() || media) && (
                    <div className="p-3 max-w-xl ml-auto bg-[#1f3e2e] rounded-xl mb-2">
                        <div className="text-sm font-bold text-green-300">You</div>
                        {replyTo && (
                            <div className="bg-green-800/30 text-sm p-2 rounded mb-1 border-l-4 border-green-500">
                                <span className="font-semibold">{replyTo.username}:</span> {replyTo.message}
                            </div>
                        )}
                        <div className="text-white whitespace-pre-wrap">{message}</div>
                        {media?.type === 'image' && <img src={media.preview} alt="preview" className="mt-2 w-[95%] h-auto rounded-lg object-cover" />}
                        {media?.type === 'video' && <video src={media.preview} controls className="mt-2 w-[95%] h-auto rounded-lg" />}
                        <div className="flex justify-end items-center gap-2 text-xs text-green-300 mt-1">
                            <span>Draft</span>
                            <FaPaperPlane size={12} />
                            <FaCheck size={12} />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="fixed bottom-0 w-full bg-black border-t border-green-900 p-4">
                <div className="max-w-2xl mx-auto">
                    {replyTo && (
                        <div className="bg-green-800 text-sm rounded-t px-4 py-2 border-l-4 border-green-500 mb-1 flex justify-between items-center">
                            <div>
                                Replying to <span className="font-bold">{replyTo.username}</span>: {replyTo.message}
                            </div>
                            <button onClick={() => setReplyTo(null)} type="button">
                                <FaTimes size={14} className="text-green-300 hover:text-white" />
                            </button>
                        </div>
                    )}

                    <div className="relative flex items-center bg-green-900 rounded-full px-4 py-2 border border-green-800 focus-within:ring-2 focus-within:ring-green-500">
                        <input type="file" accept="image/*" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} className="hidden" />
                        <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileChange(e, 'video')} className="hidden" />

                        <button type="button" onClick={() => imageInputRef.current.click()} className="text-green-300 hover:text-white mr-2">
                            <FaImage size={18} />
                        </button>
                        <button type="button" onClick={() => videoInputRef.current.click()} className="text-green-300 hover:text-white mr-2">
                            <FaVideo size={18} />
                        </button>

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent text-white placeholder-green-100 focus:outline-none"
                        />

                        <button type="submit" className="text-green-100 hover:text-white ml-2">
                            <FaPaperPlane size={18} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
