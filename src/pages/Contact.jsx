import { FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        message: '' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [toastVisible, setToastVisible] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setToastVisible(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            
            setTimeout(() => setToastVisible(false), 5000);
        }, 1500);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
    };

    return (
        <section className="min-h-screen bg-[#0b3d2e] text-white text-sm">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mt-15 mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-2">Contact Us</h1>
                    <p className="text-green-300 text-base md:text-lg">Have questions or feedback? We'd love to hear from you!</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-[#10291f] p-6 rounded-xl shadow-lg border border-green-800/50 min-h-[500px]">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FaPaperPlane className="text-green-300" /> Send Us a Message
                        </h2>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                >
                                    {/* Form fields remain the same as before */}
                                    {/* Name */}
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block mb-1 text-green-100">
                                            <FaUser className="inline mr-1 text-green-300" /> Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border ${errors.name ? 'border-red-500' : 'border-green-700'} rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200/50`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && (
                                                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block mb-1 text-green-100">
                                            <FaEnvelope className="inline mr-1 text-green-300" /> Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border ${errors.email ? 'border-red-500' : 'border-green-700'} rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200/50`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block mb-1 text-green-100">
                                            <FaPhone className="inline mr-1 text-green-300" /> Phone (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200/50"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="mb-5">
                                        <label htmlFor="message" className="block mb-1 text-green-100">
                                            <FaComment className="inline mr-1 text-green-300" /> Message
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                className={`pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border ${errors.message ? 'border-red-500' : 'border-green-700'} rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200/50`}
                                                placeholder="Your message here..."
                                            ></textarea>
                                            {errors.message && (
                                                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3 px-4 rounded-md font-semibold text-sm transition-all ${isLoading ? 'bg-green-800 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'} flex items-center justify-center gap-2 shadow-lg hover:shadow-green-900/30`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="text-xs" /> Send Message
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaCheckCircle className="text-2xl text-green-300" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                                    <p className="text-green-200 mb-6">Your message has been sent successfully.</p>
                                    <button
                                        onClick={resetForm}
                                        className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Info Section (remains the same) */}
                    <div className="bg-[#10291f] p-6 rounded-xl shadow-lg border border-green-800/50">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-100">
                            <FaMapMarkerAlt className="text-green-300" /> Our Location
                        </h2>
                        <div className="rounded-lg overflow-hidden mb-6 border border-green-800/50">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510345!2d-73.9878449245371!3d40.74844047138967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1683123867046!5m2!1sen!2sus"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="rounded-md"
                                title="Google Maps Location"
                            ></iframe>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <FaMapMarkerAlt className="text-green-300 text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-100">Address</h3>
                                    <p className="text-green-200">123 Football Avenue<br />Sports City, SC 10001</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <FaEnvelope className="text-green-300 text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-100">Email</h3>
                                    <p className="text-green-200">info@mbinglofc.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                                    <FaPhone className="text-green-300 text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-100">Phone</h3>
                                    <p className="text-green-200">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toastVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top right-10 center z-50"
                    >
                        <div className="bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 border border-green-600">
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                <FaCheckCircle className="text-xs" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Message Sent!</h3>
                                <p className="text-green-200 text-xs">We'll get back to you soon.</p>
                            </div>
                            <button 
                                onClick={() => setToastVisible(false)}
                                className="ml-4 text-green-200 hover:text-white"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}