import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { loginUser } from '../../api/authService';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { token, user } = await loginUser(formData);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Login successful! Redirecting...', {
                position: 'top-center',
                autoClose: 3000,
            });

            setTimeout(() => navigate('/'), 3500);
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = error.response?.data?.error ||
                error.message ||
                'Login failed. Please try again.';

            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-start pt-10 justify-center bg-[#0b3d2e] px-4">
            <ToastContainer />
            <div className="w-full max-w-xs bg-[#10291f] text-white p-6 rounded-xl shadow-xl mt-15">
                <h2 className="text-xl font-bold text-center mb-4 text-green-400">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Email Field */}
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
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="text-xs pl-8 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
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
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="text-xs pl-8 pr-8 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
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
                    </div>

                    {/* Options */}
                    <div className="flex justify-between text-xs text-green-300">
                        <label className="inline-flex items-center space-x-1">
                            <input
                                type="checkbox"
                                className="form-checkbox accent-green-600"
                                required
                            />
                            <span>Remember me</span>
                        </label>
                        <Link to="/auth/forgot-password" className="text-green-400 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`text-xs w-full py-2 text-white rounded font-medium ${isSubmitting ? 'bg-green-800 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
                    >
                        {isSubmitting ? 'Logging in...' : 'LOGIN'}
                    </button>
                </form>

                <div className="mt-4 text-center text-xs text-green-300">
                    Don't have an account?{' '}
                    <Link to="/auth/signup" className="text-green-400 hover:underline">
                        Sign up
                    </Link>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2 mt-5">
                    <button
                        type="button"
                        className="text-xs w-full flex items-center justify-center gap-2 py-2 bg-[#2a3f36] hover:bg-[#2c4a3c] text-white rounded font-medium"
                        onClick={() => alert('Google login not implemented')}
                    >
                        <FcGoogle className="text-lg" />
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="text-xs w-full flex items-center justify-center gap-2 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded font-medium"
                        onClick={() => alert('Facebook login not implemented')}
                    >
                        <FaFacebook className="text-lg" />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </div>
    );
}