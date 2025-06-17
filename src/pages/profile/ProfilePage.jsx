import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield,
    FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaFilePdf
} from 'react-icons/fa';
import { ImStack } from 'react-icons/im';
import { IoMdNotifications } from 'react-icons/io';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        occupation: "Senior Software Engineer",
        sex: "Male",
        dateOfBirth: "1990-05-15",
        membership_status: "Premium",
        userType: "Admin",
        verified: true,
        skills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
        bio: "Passionate about building scalable web applications with modern technologies. Open source contributor and tech enthusiast.",
        profileImage: "profile.png",
        socialLinks: {
            website: "https://johndoe.dev",
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            twitter: "https://twitter.com/johndoe"
        },
        stats: {
            projects: 24,
            connections: 356,
            recommendations: 12
        },
        user: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "+1 (234) 567-890",
            location: "New York, USA",
            dateJoined: "2020-01-01"
        }
    });

    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);

    // Simulate loading
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] text-white px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header with notification */}
                <div className="flex justify-between items-center mb-6 mt-15">
                    <h1 className="text-2xl font-bold text-green-300">Profile</h1>
                    <div className="relative">
                        <button 
                            className="p-2 rounded-full bg-green-900 hover:bg-green-800 transition-colors"
                            aria-label="Notifications"
                        >
                            <IoMdNotifications size={20} />
                        </button>
                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-green-950 rounded-xl shadow-lg p-6"
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <img
                                        src={profile.profileImage ? `/${profile.profileImage}` : 'https://i.pravatar.cc/150?img=32'}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
                                    />
                                    {profile.verified && (
                                        <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                                            <RiVerifiedBadgeFill size={20} />
                                        </div>
                                    )}
                                </div>
                                
                                <h2 className="text-xl font-bold text-center text-green-300">{profile.user.fullName}</h2>
                                <p className="text-gray-400 text-center">{profile.occupation}</p>
                                
                                <div className="flex space-x-2 mt-4">
                                    <SocialIcon 
                                        href={profile.socialLinks.linkedin} 
                                        icon={<FaLinkedin />} 
                                        tooltip="LinkedIn" 
                                    />
                                    <SocialIcon 
                                        href={profile.socialLinks.github} 
                                        icon={<FaGithub />} 
                                        tooltip="GitHub" 
                                    />
                                    <SocialIcon 
                                        href={profile.socialLinks.twitter} 
                                        icon={<FaTwitter />} 
                                        tooltip="Twitter" 
                                    />
                                    <SocialIcon 
                                        href={profile.socialLinks.website} 
                                        icon={<FaGlobe />} 
                                        tooltip="Website" 
                                    />
                                </div>
                                
                                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                    <StatItem value={profile.stats.projects} label="Projects" />
                                    <StatItem value={profile.stats.connections} label="Connections" />
                                    <StatItem value={profile.stats.recommendations} label="Recs" />
                                </div>
                                
                                <Link to="/profile/settings" className="w-full mt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                                    >
                                        <FaEdit size={16} />
                                        <span>Edit Profile</span>
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                        
                        {/* Skills Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-green-950 rounded-xl shadow-lg p-6"
                        >
                            <h3 className="text-lg font-semibold mb-4 text-green-300 flex items-center">
                                <ImStack className="mr-2" />
                                Skills & Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-green-950 rounded-xl shadow-lg p-6"
                        >
                            {/* Bio Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 text-green-300">About</h3>
                                <p className="text-gray-300">{profile.bio}</p>
                            </div>
                            
                            {/* Tabs */}
                            <div className="border-b border-green-800 mb-6">
                                <nav className="flex space-x-4">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`py-2 px-3 font-medium text-sm ${activeTab === 'overview' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activity')}
                                        className={`py-2 px-3 font-medium text-sm ${activeTab === 'activity' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Activity
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('portfolio')}
                                        className={`py-2 px-3 font-medium text-sm ${activeTab === 'portfolio' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Portfolio
                                    </button>
                                </nav>
                            </div>
                            
                            {/* Tab Content */}
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileCardItem 
                                        icon={<FaUser className="text-green-400" />} 
                                        label="Full Name" 
                                        value={profile.user.fullName} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaEnvelope className="text-green-400" />} 
                                        label="Email Address" 
                                        value={
                                            <a href={`mailto:${profile.user.email}`} className="hover:text-green-300">
                                                {profile.user.email}
                                            </a>
                                        } 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaPhone className="text-green-400" />} 
                                        label="Phone Number" 
                                        value={
                                            <a href={`tel:${profile.user.phoneNumber.replace(/\D/g, '')}`} className="hover:text-green-300">
                                                {profile.user.phoneNumber}
                                            </a>
                                        } 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaMapMarkerAlt className="text-green-400" />} 
                                        label="Location" 
                                        value={profile.user.location} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaBriefcase className="text-green-400" />} 
                                        label="Occupation" 
                                        value={profile.occupation} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaBirthdayCake className="text-green-400" />} 
                                        label="Date of Birth" 
                                        value={formatDate(profile.dateOfBirth)} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaVenusMars className="text-green-400" />} 
                                        label="Gender" 
                                        value={profile.sex} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaCalendarAlt className="text-green-400" />} 
                                        label="Member Since" 
                                        value={formatDate(profile.user.dateJoined)} 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaCrown className="text-green-400" />} 
                                        label="Membership" 
                                        value={
                                            <span className="bg-yellow-600 text-yellow-100 px-2 py-1 rounded text-xs">
                                                {profile.membership_status}
                                            </span>
                                        } 
                                    />
                                    <ProfileCardItem 
                                        icon={<FaUserShield className="text-green-400" />} 
                                        label="User Type" 
                                        value={
                                            <span className="bg-purple-600 text-purple-100 px-2 py-1 rounded text-xs">
                                                {profile.userType}
                                            </span>
                                        } 
                                    />
                                </div>
                            )}
                            
                            {activeTab === 'activity' && (
                                <div className="text-center py-8">
                                    <p className="text-gray-400">Recent activity will appear here</p>
                                </div>
                            )}
                            
                            {activeTab === 'portfolio' && (
                                <div className="text-center py-8">
                                    <p className="text-gray-400 mb-4">Featured projects will appear here</p>
                                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded inline-flex items-center">
                                        <FaFilePdf className="mr-2" />
                                        Download Resume
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Tooltip id="social-tooltip" />
        </div>
    );
}

function ProfileCardItem({ icon, label, value }) {
    return (
        <div className="flex items-start p-3 hover:bg-green-900 rounded-lg transition-colors">
            <div className="mr-3 mt-1">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-white">{value}</p>
            </div>
        </div>
    );
}

function SocialIcon({ href, icon, tooltip }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-900 hover:bg-green-800 p-2 rounded-full transition-colors"
            data-tooltip-id="social-tooltip"
            data-tooltip-content={tooltip}
            aria-label={tooltip}
        >
            {icon}
        </a>
    );
}

function StatItem({ value, label }) {
    return (
        <div>
            <p className="text-xl font-bold text-green-300">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}