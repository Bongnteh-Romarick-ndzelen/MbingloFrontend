import { useState, useEffect } from 'react';
import { updateMyProfile as updateUserProfile, getMyProfile as getUserProfile } from '../../api/profileService';
import {
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase,
    FaBirthdayCake, FaVenusMars, FaCalendarAlt, FaCrown, FaUserShield,
    FaEdit
} from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        occupation: '',
        dateOfBirth: '',
        sex: 'Male',
        membership_status: 'active',
        userType: '',
        bio: '',
        profileImage: null
    });

    const [previewImage, setPreviewImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);

    // Handle authentication errors and redirect
    useEffect(() => {
        if (authError) {
            toast.error('Session expired. Redirecting to login...', {
                position: 'top-center',
                duration: 3000,
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '12px'
                }
            });
            const timer = setTimeout(() => {
                navigate('/auth/login', { state: { from: '/profile/settings' } });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [authError, navigate]);

    // Fetch profile data with comprehensive image handling
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profile = await getUserProfile();
                console.log('Profile data received:', profile);

                if (profile?.error === 'Authentication failed') {
                    setAuthError(true);
                    return;
                }

                // Format date for date input
                const formattedDateOfBirth = profile.dateOfBirth
                    ? new Date(profile.dateOfBirth).toISOString().split('T')[0]
                    : '';

                // Update form data
                setFormData({
                    fullName: profile.user?.fullName || '',
                    email: profile.user?.email || '',
                    phoneNumber: profile.user?.phoneNumber || '',
                    location: profile.user?.location || '',
                    occupation: profile.occupation || '',
                    dateOfBirth: formattedDateOfBirth,
                    sex: profile.sex || 'Male',
                    membership_status: profile.membership_status || 'active',
                    userType: profile.userType || '',
                    bio: profile.bio || '',
                    profileImage: null
                });

                // Handle profile image
                if (profile.profileImage) {
                    await loadProfileImage(profile.profileImage);
                }
            } catch (err) {
                console.error('Profile load error:', err);
                if (err.response?.status === 401) {
                    setAuthError(true);
                } else {
                    toast.error('Failed to load profile data', {
                        position: 'top-center',
                        style: {
                            background: '#ef4444',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            padding: '16px',
                            borderRadius: '12px'
                        }
                    });
                }
            } finally {
                setIsLoading(false);
            }
        };

        const loadProfileImage = async (imagePath) => {
            const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
            const imageUrls = [
                // Try with API base URL
                `${baseUrl}/${imagePath.replace(/^\/+/, '')}`,
                // Try with current origin
                `${window.location.origin}/${imagePath.replace(/^\/+/, '')}`,
                // Try relative path
                `/${imagePath.replace(/^\/+/, '')}`
            ];

            for (const url of imageUrls) {
                try {
                    const img = new Image();
                    img.src = url;
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                    console.log('Successfully loaded image from:', url);
                    setPreviewImage(url);
                    setImageLoadError(false);
                    return;
                } catch (err) {
                    console.log(`Image load failed for URL: ${url}`);
                }
            }

            console.log('All image URL attempts failed');
            setImageLoadError(true);
            setPreviewImage('');
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size too large. Max 5MB allowed.', {
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '12px'
                }
            });
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error('Invalid file type. Only JPG, PNG, or GIF allowed.', {
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '16px',
                    borderRadius: '12px'
                }
            });
            return;
        }

        setFormData(prev => ({ ...prev, profileImage: file }));
        setPreviewImage(URL.createObjectURL(file));
        setImageLoadError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authError) return;

        setIsSubmitting(true);

        try {
            const formPayload = new FormData();

            // Append all fields except null/undefined/empty values
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    if (key === 'profileImage' && !(value instanceof File)) return;
                    formPayload.append(key, value);
                }
            });

            const updatedProfile = await updateUserProfile(formPayload);
            console.log('Profile update response:', updatedProfile);

            if (updatedProfile.profileImage) {
                const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
                const imageUrl = `${baseUrl}/${updatedProfile.profileImage.replace(/^\/+/, '')}`;
                setPreviewImage(imageUrl);
                setImageLoadError(false);
            }

            toast.success('Profile updated successfully!', {
                position: 'top-center',
                duration: 3000,
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
            console.error('Update error:', err);
            if (err.response?.status === 401) {
                setAuthError(true);
                return;
            }

            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to update profile. Please try again.';

            toast.error(errorMessage, {
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

    if (authError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] to-[#0d1f1a] flex items-center justify-center">
                <div className="text-center p-6 bg-green-950 rounded-xl shadow-lg">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-red-400 text-xl font-bold mb-4"
                    >
                        Session Expired
                    </motion.div>
                    <p className="text-green-300">You will be redirected to the login page shortly...</p>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full mx-auto mt-6"
                    />
                </div>
            </div>
        );
    }

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
            <div className="max-w-4xl mx-auto mt-6">
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

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Profile Image */}
                            <div className="lg:col-span-1">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <div className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md overflow-hidden bg-green-900 flex items-center justify-center">
                                            {previewImage && !imageLoadError ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                    onError={() => {
                                                        console.error('Failed to load profile image');
                                                        setImageLoadError(true);
                                                    }}
                                                    crossOrigin="anonymous"
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
                                            accept="image/jpeg, image/png, image/gif"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-green-400 mt-2">JPG, PNG (Max 5MB)</p>
                                </div>
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        icon={<FaUser />}
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputField
                                        icon={<FaEnvelope />}
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                    />
                                    <InputField
                                        icon={<FaPhone />}
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        type="tel"
                                    />
                                    <InputField
                                        icon={<FaMapMarkerAlt />}
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        icon={<FaBriefcase />}
                                        label="Occupation"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        icon={<FaBirthdayCake />}
                                        label="Date of Birth"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        type="date"
                                        onChange={handleChange}
                                    />
                                    <SelectField
                                        icon={<FaVenusMars />}
                                        label="Gender"
                                        name="sex"
                                        value={formData.sex}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Male', label: 'Male' },
                                            { value: 'Female', label: 'Female' },
                                            { value: 'Other', label: 'Other' }
                                        ]}
                                    />
                                    <SelectField
                                        icon={<FaCrown />}
                                        label="Membership"
                                        name="membership_status"
                                        value={formData.membership_status}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'active', label: 'Active' },
                                            { value: 'inactive', label: 'Inactive' },
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'premium', label: 'Premium' }
                                        ]}
                                    />
                                    <InputField
                                        icon={<FaUserShield />}
                                        label="User Type"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleChange}
                                        disabled
                                    />
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

function InputField({ icon, label, name, value, onChange, type = "text", disabled = false, required = false }) {
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
                className={`w-full bg-green-800 border border-green-700 rounded-lg px-4 py-2 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                placeholder={`Enter ${label.toLowerCase()}`}
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