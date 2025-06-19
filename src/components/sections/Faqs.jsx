import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqItems = [
        {
            question: "How do I create an account?",
            answer: "Click 'Sign Up' in the navigation, complete the form, and verify your email."
        },
        {
            question: "What subscription plans are available?",
            answer: "Basic (free), Premium ($9.99/month), and VIP ($19.99/month) with varying benefits."
        },
        {
            question: "How can I purchase match tickets?",
            answer: "Available in the Tickets section after login. Premium/VIP get early access."
        },
        {
            question: "What's your refund policy?",
            answer: "Full refunds for cancellations. Other cases require 48h notice with 10% fee."
        },
        {
            question: "How do I contact support?",
            answer: "24/7 through Contact page. VIP: <2h response, others: <12h response."
        },
        {
            question: "Can I change my subscription?",
            answer: "Yes, upgrade/downgrade anytime in Account Settings. Changes apply next billing."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-emerald-400 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-gray-400 max-w-lg mx-auto">
                        Quick answers about MbingloFC memberships, tickets, and services
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.08 }}
                            viewport={{ once: true }}
                            className="border-b border-gray-800 last:border-0"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
                            >
                                <h3 className="text-base md:text-lg font-medium text-gray-200 group-hover:text-emerald-300 transition-colors">
                                    {item.question}
                                </h3>
                                <span className="text-emerald-400 ml-4 shrink-0">
                                    {activeIndex === index ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-4">
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faqs;