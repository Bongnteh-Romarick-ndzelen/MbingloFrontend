import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { loginUser } from '../../api/authService';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const data = await loginUser(formData);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b3d2e] px-4">
            <div className="max-w-sm w-full bg-[#10291f] text-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-400">Login</h2>

                {error && (
                    <div className="relative bg-red-500/10 border border-red-500 text-red-300 text-sm px-4 py-3 rounded mb-4">
                        <strong className="font-bold text-xl">Error: </strong> {error}
                        <button
                            onClick={() => setError('')}
                            className="absolute top-2 right-2 text-red-300 hover:text-red-100 text-xl"
                        >
                            &times;
                        </button>
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
                                autoComplete="email"
                                required
                                placeholder="romarick@example.com"
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

                    {/* Options */}
                    <div className="flex justify-between text-xs text-green-300">
                        <label className="inline-flex items-center space-x-2">
                            <input
                                type="checkbox"
                                className="form-checkbox accent-green-600"
                            />
                            <span>Remember me</span>
                        </label>
                        <Link to="/auth/forgot-password" className="text-green-400 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded transition font-semibold"
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                </form>

                <div className="mt-4 text-center text-xs text-green-300">
                    Don’t have an account?{' '}
                    <Link to="/auth/signup" className="text-green-400 hover:underline">
                        Sign up
                    </Link>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2 mb-4 mt-5">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-2 bg-[#2a3f36] hover:bg-[#2c4a3c] text-white rounded text-sm font-medium"
                        onClick={() => alert('Google login not implemented')}
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded text-sm font-medium"
                        onClick={() => alert('Facebook login not implemented')}
                    >
                        <FaFacebook className="text-xl" />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}
