import { useState, useEffect } from 'react';
import { updateUserProfile, getUserProfile } from '../../api/profileService';
import {
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        occupation: '',
        dateOfBirth: '',
        sex: '',
        dateJoined: '',
        membership_status: '',
        userType: '',
        bio: '',
        profileImage: null,
    });

    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getUserProfile();
                const user = profile.user || {};

                setFormData({
                    fullName: user.fullName || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNumber || '',
                    location: user.location || '',
                    occupation: profile.occupation || '',
                    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : '',
                    sex: profile.sex || '',
                    dateJoined: user.dateJoined ? new Date(user.dateJoined).toISOString().slice(0, 10) : '',
                    membership_status: profile.membership_status || '',
                    userType: profile.userType || '',
                    bio: profile.bio || '',
                    profileImage: null,
                });

                if (profile.profileImage) {
                    setPreviewImage(`/${ profile.profileImage }`);
                }
            } catch (err) {
                console.error('Error loading profile:', err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        for (const key in formData) {
            if (formData[key]) {
                payload.append(key, formData[key]);
            }
        }

        try {
            await updateUserProfile(payload);

            toast.success('✅ Thank You! Your Profile has been updated successfully!', {
                style: {
                    background: '#fEFEFE',
                    color: '#0000FF',
                    border: '1px solid #22c55e',
                    padding: '16px',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#22c55e',
                    secondary: '#1e1e1e',
                },
            });

        } catch (err) {
            console.error('Update failed:', err);
            toast.error('❌ Failed to update profile.', {
                style: {
                    background: '#7f1d1d',
                    color: '#fecaca',
                    border: '1px solid #f87171',
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#0b3d2e] text-white px-4 py-10 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-green-950 p-6 rounded-2xl shadow-lg max-w-3xl w-full"
            >
                <h2 className="text-2xl font-bold text-green-300 mb-6 text-center">Edit Profile</h2>

                <div className="flex flex-col items-center mb-6">
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover border-2 border-green-400 mb-2"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm text-green-200"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <InputField icon={<FaUser />} label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField icon={<FaEnvelope />} label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                    <InputField icon={<FaPhone />} label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    <InputField icon={<FaMapMarkerAlt />} label="Location" name="location" value={formData.location} onChange={handleChange} />
                    <InputField icon={<FaBriefcase />} label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
                    <InputField icon={<FaBirthdayCake />} label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} type="date" onChange={handleChange} />
                    <InputField icon={<FaVenusMars />} label="Sex" name="sex" value={formData.sex} onChange={handleChange} />
                    <InputField icon={<FaCalendarAlt />} label="Joined" name="dateJoined" value={formData.dateJoined} type="date" onChange={handleChange} disabled />
                    <InputField icon={<FaCrown />} label="Membership" name="membership_status" value={formData.membership_status} onChange={handleChange} />
                    <InputField icon={<FaUserShield />} label="User Type" name="userType" value={formData.userType} onChange={handleChange} />
                </div>

                <div className="mt-6">
                    <label className="text-green-400 text-sm mb-2 block">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-green-800 border border-green-700 rounded-lg px-3 py-2 text-sm text-white placeholder-green-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                        placeholder="Tell us about yourself"
                    />
                </div>

                <div className="text-center mt-8">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-medium transition duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

function InputField({ icon, label, name, value, onChange, type = "text", disabled = false }) {
    return (
        <div className="flex flex-col">
            <label className="text-green-400 mb-1 text-sm flex items-center gap-2">
                <span>{icon}</span>
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="bg-green-800 border border-green-700 rounded-lg px-3 py-2 text-sm text-white placeholder-green-300 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder={`Enter ${ label.toLowerCase() }`}
            />
        </div>
    );
}
