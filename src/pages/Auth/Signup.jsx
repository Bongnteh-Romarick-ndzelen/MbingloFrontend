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
        location: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await registerUser(formData);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            toast.success('Thank you for signing up! Your Account created successfully!', {
                position: 'top-center',
                autoClose: 4000,
            });

            setTimeout(() => navigate('/'), 4500);
        } catch (err) {
            console.error('Signup error:', err.response || err.message || err);

            const message = err.response?.data?.error || err.message || 'Something went wrong';
            setError(message);
            toast.error(message, {
                position: 'top-center',
                autoClose: 4000,
            });
        }
finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b3d2e] px-4">
            <ToastContainer />
            <div className="max-w-sm w-full bg-[#10291f] text-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-400">Create an Account</h2>

                {error && (
                    <div className="bg-red-600/20 border border-red-600 text-red-400 text-xs px-3 py-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-300">Email</label>
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
                                className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block mb-1 text-gray-300">Password</label>
                        <div className="relative">
                            <LockClosedIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block mb-1 text-gray-300">Phone Number</label>
                        <div className="relative">
                            <PhoneIcon className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                id="phone"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+1234567890"
                                required
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block mb-1 text-gray-300">Location</label>
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
                                className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded transition text-sm font-medium"
                    >
                        {loading ? 'Signing up...' : 'REGISTER'}
                    </button>
                </form>

                <div className="mt-4 text-center text-xs text-green-300">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-green-400 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
