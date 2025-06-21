import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../api/authService';
import {
    EnvelopeIcon,
    LockClosedIcon,
    PhoneIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        location: '',
        adminSecret: '' // Added for potential admin registration
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        }

        if (!formData.location) {
            newErrors.location = 'Location is required';
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

            // Store token and user data (adapt based on your auth system)
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Account created successfully! Redirecting...', {
                position: 'top-center',
                autoClose: 3000,
            });

            setTimeout(() => navigate('/dashboard'), 3500);

        } catch (error) {
            console.error('Registration error:', error);

            let errorMessage = error.response?.data?.error ||
                error.message ||
                'Registration failed. Please try again.';

            // Handle specific error cases
            if (error.response?.status === 409) {
                errorMessage = 'Email already exists';
                setErrors({ email: errorMessage });
            }

            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 4000,
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b3d2e] px-4">
            <ToastContainer />
            <div className="max-w-md w-full bg-[#10291f] text-white p-8 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-400">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-300">
                            Email
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-300">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                minLength="8"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'
                                    }`}
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                        )}
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-1 text-gray-300">
                            Phone Number
                        </label>
                        <div className="relative">
                            <PhoneIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+1234567890"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'
                                    }`}
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="mt-1 text-xs text-red-400">{errors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Location Field */}
                    <div>
                        <label htmlFor="location" className="block mb-1 text-gray-300">
                            Location
                        </label>
                        <div className="relative">
                            <MapPinIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="New York, USA"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border rounded focus:outline-none focus:ring-1 placeholder:text-green-200 ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-green-700 focus:ring-green-500'
                                    }`}
                            />
                        </div>
                        {errors.location && (
                            <p className="mt-1 text-xs text-red-400">{errors.location}</p>
                        )}
                    </div>

                    {/* Admin Secret (Optional) */}
                    {process.env.REACT_APP_ENABLE_ADMIN_REGISTRATION === 'true' && (
                        <div>
                            <label htmlFor="adminSecret" className="block mb-1 text-gray-300">
                                Admin Secret (Optional)
                            </label>
                            <input
                                id="adminSecret"
                                name="adminSecret"
                                type="password"
                                placeholder="Enter admin secret if applicable"
                                value={formData.adminSecret}
                                onChange={handleChange}
                                className="pl-3 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 text-white rounded transition font-medium ${isSubmitting
                            ? 'bg-green-800 cursor-not-allowed'
                            : 'bg-green-700 hover:bg-green-800'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'REGISTER'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-green-300">
                    Already have an account?{' '}
                    <Link
                        to="/auth/login"
                        className="text-green-400 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
}