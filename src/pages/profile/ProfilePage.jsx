import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../../api/profileService';
import {
    FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield
} from 'react-icons/fa';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getUserProfile(); // returns profile with nested user
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) return <div className="text-center text-white mt-20">Loading profile...</div>;
    if (error) return <div className="text-center text-red-400 mt-20">{error}</div>;
    if (!profile || !profile.user) return <div className="text-center text-gray-300 mt-20">No profile found</div>;

    const {
        occupation,
        sex,
        dateOfBirth,
        membership_status,
        userType,
        profileImage,
        user
    } = profile;

    const {
        fullName,
        email,
        phoneNumber,
        location,
        dateJoined
    } = user;

    return (
        <div className="min-h-screen bg-[#0b3d2e] flex items-center justify-center text-white px-4 py-12">
            <div className="bg-green-950 rounded-2xl shadow-lg p-8 max-w-2xl w-full">
                <div className="relative flex flex-col items-center mb-8">
                    <img
                        src={profileImage ? `/${ profileImage }` : 'https://i.pravatar.cc/150?img=32'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
                    />
                    <Link to="/profile/settings" className="cursor-pointer">
                        <button
                            className="absolute top-0 right-[calc(50%-4rem)] transform translate-x-1/2 bg-green-600 hover:bg-green-700 p-2 rounded-full text-white shadow-lg"
                            title="Edit Profile"
                        >
                            <FaEdit size={20} />
                        </button>
                    </Link>

                    <h2 className="text-3xl font-bold mt-4 text-green-300">{fullName}</h2>
                    <p className="text-gray-400">{occupation}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <ProfileRow icon={<FaUser />} label="Full Name" value={fullName} />
                    <ProfileRow icon={<FaEnvelope />} label="Email Address" value={email} />
                    <ProfileRow icon={<FaPhone />} label="Phone Number" value={phoneNumber} />
                    <ProfileRow icon={<FaMapMarkerAlt />} label="Location" value={location} />
                    <ProfileRow icon={<FaBriefcase />} label="Occupation" value={occupation} />
                    <ProfileRow icon={<FaBirthdayCake />} label="Date of Birth" value={formatDate(dateOfBirth)} />
                    <ProfileRow icon={<FaVenusMars />} label="Sex" value={sex} />
                    <ProfileRow icon={<FaCalendarAlt />} label="Joined" value={formatDate(dateJoined)} />
                    <ProfileRow icon={<FaCrown />} label="Membership" value={membership_status} />
                    <ProfileRow icon={<FaUserShield />} label="User Type" value={userType || user.role} />
                </div>
            </div>
        </div>
    );
}

function ProfileRow({ icon, label, value }) {
    return (
        <div className="flex items-center border-b border-green-700 pb-2">
            <div className="text-green-400 mr-2">{icon}</div>
            <span className="text-green-400 font-medium w-1/2">{label}</span>
            <span className="text-white text-right w-1/2">{value || '—'}</span>
        </div>
    );
}

function formatDate(dateStr) {
    return dateStr ? new Date(dateStr).toLocaleDateString() : '—';
}
