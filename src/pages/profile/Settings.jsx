import { useState, useEffect } from 'react';
import { updateUserProfile, getUserProfile } from '../../api/profileService';
import {
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield,
    FaGlobe, FaLinkedin, FaGithub, FaTwitter, FaFilePdf, FaEdit
} from 'react-icons/fa';
import { ImStack } from 'react-icons/im';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
    const navigate = useNavigate();
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
        skills: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: ''
    });

    const [previewImage, setPreviewImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                    skills: profile.skills?.join(', ') || '',
                    website: profile.socialLinks?.website || '',
                    linkedin: profile.socialLinks?.linkedin || '',
                    github: profile.socialLinks?.github || '',
                    twitter: profile.socialLinks?.twitter || ''
                });

                if (profile.profileImage) {
                    setPreviewImage(`/${profile.profileImage}`);
                }
            } catch (err) {
                console.error('Error loading profile:', err);
                toast.error('Failed to load profile data');
            } finally {
                setIsLoading(false);
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
        setIsSubmitting(true);

        const payload = new FormData();
        for (const key in formData) {
            if (formData[key] !== null && formData[key] !== undefined) {
                payload.append(key, formData[key]);
            }
        }

        try {
            await updateUserProfile(payload);
            toast.success('Profile updated successfully!', {
                position: 'top-center',
                style: {
                    background: '#10b981',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '12px'
                },
                iconTheme: {
                    primary: '#ffffff',
                    secondary: '#10b981'
                }
            });
            setTimeout(() => navigate('/profile'), 1500);
        } catch (err) {
            console.error('Update failed:', err);
            toast.error('Failed to update profile. Please try again.', {
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '12px'
                }
            });
        } finally {
            setIsSubmitting(false);
        }
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] text-white px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-green-950 rounded-xl shadow-xl p-6 md:p-8"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
                            <FaEdit />
                            Edit Profile
                        </h2>
                        <button
                            onClick={() => navigate('/profile')}
                            className="text-green-400 hover:text-green-300 text-sm font-medium"
                        >
                            Back to Profile
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Profile Image */}
                            <div className="lg:col-span-1">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <div className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md overflow-hidden bg-green-900 flex items-center justify-center">
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <FaUser className="text-4xl text-green-400" />
                                            )}
                                        </div>
                                        {formData.membership_status === 'Premium' && (
                                            <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                                                <RiVerifiedBadgeFill size={20} />
                                            </div>
                                        )}
                                    </div>

                                    <label className="cursor-pointer bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                        Change Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-green-400 mt-2">JPG, PNG (Max 2MB)</p>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4 text-green-300">Social Links</h3>
                                    <InputField 
                                        icon={<FaGlobe />} 
                                        label="Website" 
                                        name="website" 
                                        value={formData.website} 
                                        onChange={handleChange} 
                                        placeholder="https://yourwebsite.com"
                                    />
                                    <InputField 
                                        icon={<FaLinkedin />} 
                                        label="LinkedIn" 
                                        name="linkedin" 
                                        value={formData.linkedin} 
                                        onChange={handleChange} 
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                    <InputField 
                                        icon={<FaGithub />} 
                                        label="GitHub" 
                                        name="github" 
                                        value={formData.github} 
                                        onChange={handleChange} 
                                        placeholder="https://github.com/username"
                                    />
                                    <InputField 
                                        icon={<FaTwitter />} 
                                        label="Twitter" 
                                        name="twitter" 
                                        value={formData.twitter} 
                                        onChange={handleChange} 
                                        placeholder="https://twitter.com/username"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField icon={<FaUser />} label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <InputField icon={<FaEnvelope />} label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" required />
                                    <InputField icon={<FaPhone />} label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" />
                                    <InputField icon={<FaMapMarkerAlt />} label="Location" name="location" value={formData.location} onChange={handleChange} />
                                    <InputField icon={<FaBriefcase />} label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
                                    <InputField icon={<FaBirthdayCake />} label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} type="date" onChange={handleChange} />
                                    <SelectField 
                                        icon={<FaVenusMars />} 
                                        label="Gender" 
                                        name="sex" 
                                        value={formData.sex} 
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select gender' },
                                            { value: 'Male', label: 'Male' },
                                            { value: 'Female', label: 'Female' },
                                            { value: 'Other', label: 'Other' },
                                            { value: 'Prefer not to say', label: 'Prefer not to say' }
                                        ]}
                                    />
                                    <SelectField 
                                        icon={<FaCrown />} 
                                        label="Membership" 
                                        name="membership_status" 
                                        value={formData.membership_status} 
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Basic', label: 'Basic' },
                                            { value: 'Premium', label: 'Premium' },
                                            { value: 'Professional', label: 'Professional' }
                                        ]}
                                    />
                                    <InputField icon={<FaCalendarAlt />} label="Joined" name="dateJoined" value={formData.dateJoined} type="date" onChange={handleChange} disabled />
                                    <InputField icon={<FaUserShield />} label="User Type" name="userType" value={formData.userType} onChange={handleChange} disabled />
                                </div>

                                <div className="mt-6">
                                    <label className="text-green-400 text-sm mb-2 block font-medium">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-green-800 border border-green-700 rounded-lg px-4 py-3 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        placeholder="Tell us about yourself, your experience, and your interests..."
                                    />
                                </div>

                                <div className="mt-6">
                                    <label className="text-green-400 text-sm mb-2 block font-medium">Skills (comma separated)</label>
                                    <textarea
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        rows={2}
                                        className="w-full bg-green-800 border border-green-700 rounded-lg px-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        placeholder="React, Node.js, TypeScript, Design, etc."
                                    />
                                </div>

                                <div className="flex justify-end mt-8 space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/profile')}
                                        className="px-6 py-2 rounded-lg font-medium border border-green-600 text-green-300 hover:bg-green-900 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting}
                                        className={`px-6 py-2 rounded-lg font-medium text-white ${isSubmitting ? 'bg-green-700' : 'bg-green-600 hover:bg-green-500'} transition-colors flex items-center gap-2`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>Save Changes</>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

function InputField({ icon, label, name, value, onChange, type = "text", disabled = false, required = false, placeholder }) {
    return (
        <div className="mb-4">
            <label className="text-green-400 mb-2 text-sm flex items-center gap-2 font-medium">
                {icon}
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`w-full bg-green-800 border border-green-700 rounded-lg px-4 py-2 text-white ${placeholder ? 'placeholder-green-300' : ''} focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
        </div>
    );
}

function SelectField({ icon, label, name, value, onChange, options }) {
    return (
        <div className="mb-4">
            <label className="text-green-400 mb-2 text-sm flex items-center gap-2 font-medium">
                {icon}
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-green-800 border border-green-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}