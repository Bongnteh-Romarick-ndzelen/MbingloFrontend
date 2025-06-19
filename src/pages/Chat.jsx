import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage, FaVideo, FaCheck, FaTimes, FaReply, FaTrash, FaEdit, FaSmile, FaMicrophone } from 'react-icons/fa';
import { IoMdSend, IoMdClose } from 'react-icons/io';
import EmojiPicker from 'emoji-picker-react';
import { GiSoccerBall } from 'react-icons/gi';

export default function Chat() {
    const [chatData, setChatData] = useState([
        {
            id: 1,
            username: 'You',
            message: "Great game last night! The team played really well.",
            time: '10:15 AM',
            status: 'read',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            id: 2,
            username: 'Coach',
            message: 'Thanks! The defense was solid. Need to work on finishing though.',
            time: '10:17 AM',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
            id: 3,
            username: 'Mr Mbinglo',
            message: 'Next practice is moved to 3 PM tomorrow at the main field.',
            time: '10:20 AM',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
        },
        {
            id: 4,
            username: 'Romarick Ndzelen',
            message: 'I\'ve shared the new training schedule with everyone. Check your emails!',
            time: '10:25 AM',
            avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        {
            id: 5,
            username: 'You',
            message: 'Got it! See everyone at practice.',
            time: '10:30 AM',
            status: 'sent',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
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
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    };

    const removeMedia = () => {
        if (media?.preview) {
            URL.revokeObjectURL(media.preview);
        }
        setMedia(null);
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
        <div className="min-h-screen bg-gradient-to-b from-[#0a1912] to-[#0c2319] mt-4 flex flex-col">
            {/* Header */}
            <header className="bg-[#0c1f17] text-center py-2 px-6 shadow-lg top-20 z-10 border-b border-green-900/50">
                <div className="mt-7">
                    <div className="flex items-center justify-center space-x-2 mt-5">
                        <GiSoccerBall className="text-green-400 text-xl mt-3" />
                        <h1 className="text-xl font-semibold text-green-100 mt-3">Mbinglo FC Team Chat</h1>
                    </div>
                </div>
                <p className="text-xs text-green-300 mt-1">5 members online</p>
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
                    {/* Reply/Edit Preview */}
                    {(replyTo || editingId) && (
                        <div className="bg-green-900/70 text-xs rounded-t px-3 py-2 border-l-4 border-green-500 mb-1 flex justify-between items-center">
                            <div className="truncate">
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
                                className="text-green-300 hover:text-white ml-2"
                            >
                                <IoMdClose size={14} />
                            </button>
                        </div>
                    )}

                    {/* Media Preview */}
                    {media && (
                        <div className="relative bg-green-900/50 rounded-t-lg p-2 mb-1 border border-green-800/50">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    {media.type === 'image' ? (
                                        <img
                                            src={media.preview}
                                            alt="Preview"
                                            className="max-h-40 rounded-lg object-contain"
                                        />
                                    ) : (
                                        <video
                                            src={media.preview}
                                            controls
                                            className="max-h-40 rounded-lg"
                                        />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={removeMedia}
                                    className="ml-2 text-green-300 hover:text-white bg-green-800/70 rounded-full p-1"
                                >
                                    <IoMdClose size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="relative flex items-center bg-green-900/80 rounded-lg px-3 py-2 border border-green-800/50 focus-within:ring-2 focus-within:ring-green-500/50 transition-all">
                        <div className="flex items-center space-x-1">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="text-green-300 hover:text-white p-1.5 rounded-full hover:bg-green-800/50 transition-colors"
                            >
                                <FaSmile size={16} />
                            </button>

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
                        </div>

                        <input
                            ref={inputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={media ? "Add a caption (optional)" : "Type your message..."}
                            className="flex-1 bg-transparent text-white placeholder-green-300/80 focus:outline-none px-2 py-1 text-sm mx-1 min-h-[40px]"
                        />

                        <button
                            type={message.trim() || media ? "submit" : "button"}
                            onClick={!message.trim() && !media ? () => setIsRecording(!isRecording) : null}
                            className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-600 animate-pulse' :
                                (message.trim() || media) ? 'bg-green-600 hover:bg-green-500' : 'bg-green-700 hover:bg-green-600'
                                }`}
                            disabled={!message.trim() && !media && !isRecording}
                        >
                            {message.trim() || media ? (
                                <IoMdSend size={16} className="text-white" />
                            ) : (
                                <FaMicrophone size={16} className="text-white" />
                            )}
                        </button>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div className="absolute bottom-14 left-0 z-50 shadow-lg">
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
                            />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}