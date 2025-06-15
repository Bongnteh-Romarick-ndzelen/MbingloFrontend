import { FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 2000);
    };

    return (
        <section className="min-h-screen bg-[#0b3d2e] text-white text-sm">
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
                    <p className="text-green-300 text-base md:text-lg">Have questions or feedback? We'd love to hear from you!</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="bg-[#10291f] p-6 rounded-xl shadow-lg border border-green-800/50">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FaPaperPlane className="text-green-300" /> Send Us a Message
                        </h2>

                        {isSubmitted && (
                            <div className="mb-4 p-3 bg-green-800 rounded-lg flex items-center gap-3 border border-green-700 text-sm">
                                <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                                    <FaPaperPlane className="text-white text-xs" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Message Sent!</h3>
                                    <p className="text-green-200">We'll get back to you soon.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 text-green-100">
                                    <FaUser className="inline mr-1 text-green-300" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1 text-green-100">
                                    <FaEnvelope className="inline mr-1 text-green-300" /> Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-1 text-green-100">
                                    <FaPhone className="inline mr-1 text-green-300" /> Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            {/* Message */}
                            <div className="mb-5">
                                <label htmlFor="message" className="block mb-1 text-green-100">
                                    <FaComment className="inline mr-1 text-green-300" /> Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="pl-10 pr-3 py-2 w-full bg-[#1b352c] text-white border border-green-700 rounded focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-green-200"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 px-4 rounded-md font-semibold text-sm transition-all ${ isLoading ? 'bg-green-800' : 'bg-green-700 hover:bg-green-600' } flex items-center justify-center gap-2`}
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
                        </form>
                    </div>

                    {/* Info */}
                    <div className="bg-[#10291f] p-6 rounded-xl shadow-lg border border-green-800/50">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-green-100">
                            <FaMapMarkerAlt className="text-green-300" /> Our Location
                        </h2>
                        <div className="rounded-lg overflow-hidden mb-4 border border-green-800/50">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18..."
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                className="rounded-md"
                            ></iframe>
                        </div>
                        <p className="text-green-100 text-sm">
                            <strong>Mbinglo FC Headquarters</strong><br />
                            123 Football Avenue<br />
                            Sports City, SC 10001
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
