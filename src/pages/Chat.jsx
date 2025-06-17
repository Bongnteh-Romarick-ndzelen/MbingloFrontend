import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage, FaVideo, FaCheck, FaTimes, FaReply, FaTrash, FaEdit, FaSmile, FaMicrophone } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import EmojiPicker from 'emoji-picker-react';

export default function Chat() {
    const [chatData, setChatData] = useState([
        { 
            id: 1, 
            username: 'You', 
            message: "Choose the option that best fits your project's existing icon library or preferences.", 
            time: '10:15 AM',
            status: 'read',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        { 
            id: 2, 
            username: 'Bob', 
            message: 'Absolutely! Can\'t wait! I\'m so excited to see you!', 
            time: '10:17 AM',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        { 
            id: 3, 
            username: 'Alice', 
            message: 'The meeting has been rescheduled to 3 PM tomorrow.', 
            time: '10:20 AM',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        { 
            id: 4, 
            username: 'Charlie', 
            message: 'I\'ve shared the document with everyone. Please review it when you get a chance.', 
            time: '10:25 AM',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        { 
            id: 5, 
            username: 'You', 
            message: 'Thanks everyone for the updates!', 
            time: '10:30 AM',
            status: 'sent',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        { 
            id: 6, 
            username: 'Diana', 
            message: 'Don\'t forget about the team lunch on Friday!', 
            time: '10:35 AM',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        }
    ]);

    const [message, setMessage] = useState('');
    const [media, setMedia] = useState(null);
    const [replyTo, setReplyTo] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [chatData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim() && !media) return;

        if (editingId) {
            setChatData(prev => prev.map(m => m.id === editingId ? { 
                ...m, 
                message, 
                media: media?.preview || null, 
                mediaType: media?.type || null,
                edited: true 
            } : m));
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
                status: 'sent',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            };
            setChatData([...chatData, newMessage]);
        }

        setMessage('');
        setMedia(null);
        setReplyTo(null);
        setShowEmojiPicker(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const type = file.type.startsWith('image') ? 'image' : 
                        file.type.startsWith('video') ? 'video' : null;
            if (type) {
                const preview = URL.createObjectURL(file);
                setMedia({ file, type, preview });
            }
        }
    };

    const handleReply = (messageId) => {
        const messageToReply = chatData.find(m => m.id === messageId);
        setReplyTo(messageToReply);
        inputRef.current.focus();
    };

    const handleEdit = (messageId) => {
        const messageToEdit = chatData.find(m => m.id === messageId);
        setMessage(messageToEdit.message);
        if (messageToEdit.media) {
            setMedia({ preview: messageToEdit.media, type: messageToEdit.mediaType });
        }
        setEditingId(messageId);
        inputRef.current.focus();
    };

    const handleDelete = (messageId) => {
        setChatData(prev => prev.map(m => 
            m.id === messageId ? { ...m, message: null, media: null, isDeleted: true } : m
        ));
    };

    const cancelReply = () => {
        setReplyTo(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setMessage('');
        setMedia(null);
    };

    return (
        <div className="min-h-screen bg-[#1a2a1f] flex pt-3 flex-col">
            {/* Header */}
            <header className="bg-[#10291f] text-center py-4 my-4 px-6 shadow-lg sticky z-10">
                <h1 className="text-xl font-semibold text-green-100 mt-7">Group Chat</h1>
                <p className="text-xs text-green-300 mt-1">3 members online</p>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3 max-w-3xl mx-auto w-full">
                {chatData.map(chat => (
                    <div key={chat.id} className={`relative flex items-start group ${chat.username === 'You' ? 'justify-end' : ''}`}>
                        {chat.username !== 'You' && !chat.isDeleted && (
                            <img 
                                src={chat.avatar} 
                                alt={chat.username}
                                className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                            />
                        )}
                        
                        <div className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 relative ${chat.username === 'You' ? 'bg-green-600 rounded-tr-none' : 'bg-green-800 rounded-tl-none'}`}>
                            {chat.isDeleted ? (
                                <div className="text-gray-300 italic text-sm">Message deleted</div>
                            ) : (
                                <>
                                    {chat.replyTo && (
                                        <div className="bg-green-900/50 text-xs rounded px-2 py-1 border-l-2 border-green-500 mb-1 truncate">
                                            <p className="font-semibold text-green-300">{chat.replyTo.username}</p>
                                            <p className="text-green-200 truncate">{chat.replyTo.message}</p>
                                        </div>
                                    )}
                                    
                                    {chat.media && (
                                        <div className="mb-2 rounded overflow-hidden">
                                            {chat.mediaType === 'image' ? (
                                                <img src={chat.media} alt="Sent media" className="max-w-full h-auto rounded" />
                                            ) : (
                                                <video controls className="max-w-full h-auto rounded">
                                                    <source src={chat.media} type="video/mp4" />
                                                </video>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className="flex items-end justify-between">
                                        <div>
                                            {chat.username !== 'You' && (
                                                <p className="text-xs font-semibold text-green-300">{chat.username}</p>
                                            )}
                                            <p className="text-white text-sm">{chat.message}</p>
                                        </div>
                                        <div className="flex items-center ml-2">
                                            <span className="text-xs text-green-200 mr-1">{chat.time}</span>
                                            {chat.username === 'You' && chat.status === 'read' && (
                                                <FaCheck className="text-blue-300 text-xs" />
                                            )}
                                            {chat.username === 'You' && chat.status === 'sent' && (
                                                <FaCheck className="text-gray-300 text-xs" />
                                            )}
                                            {chat.edited && (
                                                <span className="text-xs text-green-300 ml-1">(edited)</span>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {!chat.isDeleted && (
                                <div className={`absolute -top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${chat.username === 'You' ? '-left-2' : '-right-2'}`}>
                                    <button 
                                        onClick={() => handleReply(chat.id)}
                                        className="bg-green-700 hover:bg-green-600 text-white p-1 rounded-full"
                                    >
                                        <FaReply size={10} />
                                    </button>
                                    {chat.username === 'You' && (
                                        <>
                                            <button 
                                                onClick={() => handleEdit(chat.id)}
                                                className="bg-green-700 hover:bg-green-600 text-white p-1 rounded-full"
                                            >
                                                <FaEdit size={10} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(chat.id)}
                                                className="bg-red-700 hover:bg-red-600 text-white p-1 rounded-full"
                                            >
                                                <FaTrash size={10} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        {chat.username === 'You' && !chat.isDeleted && (
                            <img 
                                src={chat.avatar} 
                                alt={chat.username}
                                className="w-8 h-8 rounded-full object-cover ml-2 flex-shrink-0"
                            />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="bg-[#0c1f17] border-t border-green-900/50 p-3 sticky bottom-0">
                <div className="max-w-3xl mx-auto relative">
                    {(replyTo || editingId) && (
                        <div className="bg-green-800 text-xs rounded-t px-3 py-2 border-l-4 border-green-500 mb-1 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-green-300">
                                    {editingId ? 'Editing' : 'Replying to'} {replyTo?.username || chatData.find(m => m.id === editingId)?.username}
                                </p>
                                <p className="text-green-200 truncate">
                                    {replyTo?.message || chatData.find(m => m.id === editingId)?.message}
                                </p>
                            </div>
                            <button 
                                type="button" 
                                onClick={editingId ? cancelEdit : cancelReply}
                                className="text-green-300 hover:text-white"
                            >
                                <FaTimes size={12} />
                            </button>
                        </div>
                    )}

                    <div className="relative flex items-center bg-green-900/80 rounded-full px-3 py-2 border border-green-800/50 focus-within:ring-2 focus-within:ring-green-500/50 transition-all">
                        <button 
                            type="button" 
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="text-green-300 hover:text-white p-1.5 rounded-full hover:bg-green-800/50 transition-colors"
                        >
                            <FaSmile size={16} />
                        </button>
                        
                        {showEmojiPicker && (
                            <div className="absolute bottom-12 left-0 z-50 shadow-lg">
                                <EmojiPicker
                                    onEmojiClick={(emojiData) => {
                                        setMessage(prev => prev + emojiData.emoji);
                                        setShowEmojiPicker(false);
                                    }}
                                    width={300}
                                    height={350}
                                    previewConfig={{ showPreview: false }}
                                    theme="dark"
                                    skinTonesDisabled
                                    searchDisabled
                                    suggestedEmojisMode={false}
                                    lazyLoadEmojis
                                    emojiStyle="native"
                                    styles={{
                                        emojiPicker: {
                                            backgroundColor: '#0c1f17',
                                            borderColor: '#1a2a1f',
                                        },
                                        search: {
                                            backgroundColor: '#10291f',
                                            borderColor: '#1a2a1f',
                                        },
                                        emoji: {
                                            hoverBackgroundColor: '#1a2a1f',
                                        },
                                        categoryLabel: {
                                            backgroundColor: '#0c1f17',
                                        }
                                    }}
                                />
                            </div>
                        )}

                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            className="hidden"
                        />
                        <button 
                            type="button" 
                            onClick={() => fileInputRef.current.click()}
                            className="text-green-300 hover:text-white p-1.5 rounded-full hover:bg-green-800/50 transition-colors"
                        >
                            <FaImage size={16} />
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent text-white placeholder-green-300/80 focus:outline-none px-2 py-1 text-sm mx-1"
                        />

                        <button 
                            type={message.trim() || media ? "submit" : "button"}
                            onClick={!message.trim() && !media ? () => setIsRecording(!isRecording) : null}
                            className={`p-2 rounded-full transition-colors ${
                                isRecording ? 'bg-red-600 animate-pulse' : 'bg-green-600 hover:bg-green-500'
                            }`}
                        >
                            {message.trim() || media ? (
                                <IoMdSend size={16} className="text-white" />
                            ) : (
                                <FaMicrophone size={16} className="text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}