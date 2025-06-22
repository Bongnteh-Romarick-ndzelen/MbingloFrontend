import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield
} from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getMyProfile } from '../../api/profileService';

export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notificationCount] = useState(3);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const data = await getMyProfile();
                console.log('Received profile data:', data); // Debug log

                if (data?.error === 'Authentication failed') {
                    // Handle auth error if needed
                    return;
                }

                setProfileData(data);
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                setError(err.message || 'Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] flex items-center justify-center">
                <div className="text-center p-6 bg-green-950 rounded-xl max-w-md">
                    <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] flex items-center justify-center">
                <div className="text-center p-6 bg-green-950 rounded-xl max-w-md">
                    <h2 className="text-xl font-bold text-green-300 mb-2">No Profile Found</h2>
                    <p className="text-gray-300 mb-4">You haven't created a profile yet.</p>
                    <Link
                        to="/profile/create"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded inline-block"
                    >
                        Create Profile
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] text-white px-4 py-8">
            <div className="max-w-6xl mx-auto mt-18">
                {/* Header with notification */}
                <div className="flex justify-between items-center mb-6 mt-10">
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
                                        src={profileData.profileImage || '/uploads/profiles/default.jpg'}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md object-cover"
                                    />
                                    {profileData.verified && (
                                        <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                                            <RiVerifiedBadgeFill size={20} />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-center text-green-300">
                                    {profileData.fullName || 'No Name'}
                                </h2>
                                <p className="text-gray-400 text-center">{profileData.occupation || 'No Occupation'}</p>

                                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                    <StatItem value={profileData.stats?.projects || 0} label="Projects" />
                                    <StatItem value={profileData.stats?.connections || 0} label="Connections" />
                                    <StatItem value={profileData.stats?.recommendations || 0} label="Recs" />
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
                            {profileData.bio && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-green-300">About</h3>
                                    <p className="text-gray-300 whitespace-pre-line">{profileData.bio}</p>
                                </div>
                            )}

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
                                </nav>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ProfileCardItem
                                        icon={<FaUser className="text-green-400" />}
                                        label="Full Name"
                                        value={profileData.fullName || 'Not specified'}
                                    />
                                    <ProfileCardItem
                                        icon={<FaEnvelope className="text-green-400" />}
                                        label="Email Address"
                                        value={
                                            profileData.email ? (
                                                <a href={`mailto:${profileData.email}`} className="hover:text-green-300">
                                                    {profileData.email}
                                                </a>
                                            ) : 'Not specified'
                                        }
                                    />
                                    <ProfileCardItem
                                        icon={<FaPhone className="text-green-400" />}
                                        label="Phone Number"
                                        value={
                                            profileData.phoneNumber ? (
                                                <a href={`tel:${profileData.phoneNumber}`} className="hover:text-green-300">
                                                    {profileData.phoneNumber}
                                                </a>
                                            ) : 'Not specified'
                                        }
                                    />
                                    <ProfileCardItem
                                        icon={<FaVenusMars className="text-green-400" />}
                                        label="Gender"
                                        value={profileData.sex || 'Not specified'}
                                    />
                                    <ProfileCardItem
                                        icon={<FaBirthdayCake className="text-green-400" />}
                                        label="Date of Birth"
                                        value={formatDate(profileData.dateOfBirth)}
                                    />
                                    <ProfileCardItem
                                        icon={<FaBriefcase className="text-green-400" />}
                                        label="Occupation"
                                        value={profileData.occupation || 'Not specified'}
                                    />
                                    <ProfileCardItem
                                        icon={<FaMapMarkerAlt className="text-green-400" />}
                                        label="Location"
                                        value={profileData.location || 'Not specified'}
                                    />
                                    <ProfileCardItem
                                        icon={<FaCrown className="text-green-400" />}
                                        label="Membership"
                                        value={
                                            <span className={`px-2 py-1 rounded text-xs ${profileData.membership_status === 'active' ? 'bg-green-600 text-green-100' :
                                                profileData.membership_status === 'inactive' ? 'bg-red-600 text-red-100' :
                                                    'bg-yellow-600 text-yellow-100'
                                                }`}>
                                                {profileData.membership_status?.charAt(0).toUpperCase() + profileData.membership_status?.slice(1) || 'Not specified'}
                                            </span>
                                        }
                                    />
                                    <ProfileCardItem
                                        icon={<FaUserShield className="text-green-400" />}
                                        label="User Type"
                                        value={
                                            <span className={`px-2 py-1 rounded text-xs ${profileData.userType === 'admin' ? 'bg-purple-600 text-purple-100' :
                                                'bg-blue-600 text-blue-100'
                                                }`}>
                                                {profileData.userType?.charAt(0).toUpperCase() + profileData.userType?.slice(1) || 'Not specified'}
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
                        </motion.div>
                    </div>
                </div>
            </div>
            <Tooltip id="social-tooltip" />
        </div>
    );
}

// Helper components (keep these the same)
function ProfileCardItem({ icon, label, value }) {
    return (
        <div className="flex items-start p-3 hover:bg-green-900 rounded-lg transition-colors">
            <div className="mr-3 mt-1">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <div className="text-white">{value}</div>
            </div>
        </div>
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