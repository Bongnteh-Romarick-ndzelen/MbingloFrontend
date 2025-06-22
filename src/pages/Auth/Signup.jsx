import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../api/authService';
import {
    EnvelopeIcon,
    LockClosedIcon,
    PhoneIcon,
    MapPinIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        location: '',
        adminSecret: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Min 8 characters';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone required';
        }

        if (!formData.location) {
            newErrors.location = 'Location required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const { token, user } = await registerUser(formData);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Account created! Redirecting...', {
                position: 'top-center',
                autoClose: 3000,
            });
            setTimeout(() => navigate('/dashboard'), 3500);
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = error.response?.data?.error || error.message || 'Registration failed';
            if (error.response?.status === 409) {
                errorMessage = 'Email exists';
                setErrors({ email: errorMessage });
            }
            toast.error(errorMessage, { position: 'top-center' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start pt-10 justify-center bg-[#0b3d2e] px-4 mb-14" >
            <ToastContainer />
            <div className="w-full max-w-xs bg-[#10291f] text-white p-6 rounded-xl shadow-xl mt-15">
                <h2 className="text-xl font-bold text-center mb-4 text-green-400">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-1 text-xs text-gray-300">
                            Email
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="w-3 h-3 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`text-xs pl-8 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'}`}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    {/* Password with toggle */}
                    <div>
                        <label htmlFor="password" className="block mb-1 text-xs text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="w-3 h-3 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={`text-xs pl-8 pr-8 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'}`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="w-3 h-3" />
                                ) : (
                                    <EyeIcon className="w-3 h-3" />
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-1 text-xs text-gray-300">
                            Phone
                        </label>
                        <div className="relative">
                            <PhoneIcon className="w-3 h-3 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+1234567890"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`text-xs pl-8 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'}`}
                            />
                        </div>
                        {errors.phoneNumber && <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block mb-1 text-xs text-gray-300">
                            Location
                        </label>
                        <div className="relative">
                            <MapPinIcon className="w-3 h-3 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="City, Country"
                                value={formData.location}
                                onChange={handleChange}
                                className={`text-xs pl-8 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'}`}
                            />
                        </div>
                        {errors.location && <p className="mt-1 text-xs text-red-400">{errors.location}</p>}
                    </div>

                    {/* Admin Secret (if enabled) */}
                    {process.env.VITE_ENABLE_ADMIN_REGISTRATION === 'true' && (
                        <div>
                            <label htmlFor="adminSecret" className="block mb-1 text-xs text-gray-300">
                                Admin Secret
                            </label>
                            <input
                                id="adminSecret"
                                name="adminSecret"
                                type="password"
                                placeholder="Admin secret"
                                value={formData.adminSecret}
                                onChange={handleChange}
                                className="text-xs pl-3 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`text-xs w-full py-2 text-white rounded font-medium ${isSubmitting ? 'bg-green-800 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
                    >
                        {isSubmitting ? 'Creating...' : 'Register'}
                    </button>
                </form>

                <div className="mt-4 text-center text-xs text-green-300">
                    Have an account?{' '}
                    <Link to="/auth/login" className="text-green-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}