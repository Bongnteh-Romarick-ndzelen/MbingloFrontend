import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaEdit, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield
} from 'react-icons/fa';

export default function ProfilePage() {
    // Static profile data
    const [profile, setProfile] = useState({
        occupation: "Software Developer",
        sex: "Male",
        dateOfBirth: "1990-05-15",
        membership_status: "Premium",
        userType: "Admin",
        profileImage: "profile.png",  // This should be in your public folder
        user: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            location: "New York, USA",
            dateJoined: "2020-01-01"
        }
    });

    return (
        <div className="min-h-screen bg-[#0b3d2e] flex items-center justify-center text-white px-4 py-12">
            <div className="bg-green-950 rounded-2xl shadow-lg p-8 max-w-2xl w-full">
                <div className="relative flex flex-col items-center mb-8">
                    <img
                        src={profile.profileImage ? `/${profile.profileImage}` : 'https://i.pravatar.cc/150?img=32'}
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

                    <h2 className="text-3xl font-bold mt-4 text-green-300">{profile.user.fullName}</h2>
                    <p className="text-gray-400">{profile.occupation}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <ProfileRow icon={<FaUser />} label="Full Name" value={profile.user.fullName} />
                    <ProfileRow icon={<FaEnvelope />} label="Email Address" value={profile.user.email} />
                    <ProfileRow icon={<FaPhone />} label="Phone Number" value={profile.user.phoneNumber} />
                    <ProfileRow icon={<FaMapMarkerAlt />} label="Location" value={profile.user.location} />
                    <ProfileRow icon={<FaBriefcase />} label="Occupation" value={profile.occupation} />
                    <ProfileRow icon={<FaBirthdayCake />} label="Date of Birth" value={formatDate(profile.dateOfBirth)} />
                    <ProfileRow icon={<FaVenusMars />} label="Sex" value={profile.sex} />
                    <ProfileRow icon={<FaCalendarAlt />} label="Joined" value={formatDate(profile.user.dateJoined)} />
                    <ProfileRow icon={<FaCrown />} label="Membership" value={profile.membership_status} />
                    <ProfileRow icon={<FaUserShield />} label="User Type" value={profile.userType} />
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