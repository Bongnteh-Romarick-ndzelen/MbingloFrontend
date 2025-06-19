import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 6;

    const galleryImages = [
        { id: 1, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', alt: 'Player celebrating goal' },
        { id: 2, src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', alt: 'Team huddle' },
        { id: 3, src: 'https://images.unsplash.com/photo-1579952363878-3f3aaf30a1cb', alt: 'Player running with ball' },
        { id: 4, src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20', alt: 'Stadium crowd' },
        { id: 5, src: 'https://images.unsplash.com/photo-1508098682722-e99c47a06b43', alt: 'Player shooting' },
        { id: 6, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', alt: 'Player training' },
        { id: 7, src: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781', alt: 'Goalkeeper save' },
        { id: 8, src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', alt: 'Team celebration' },
        { id: 9, src: 'https://images.unsplash.com/photo-1483721310020-03333e577078', alt: 'Player dribbling' },
        { id: 10, src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', alt: 'Fans cheering' },
        { id: 11, src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', alt: 'Player header' },
        { id: 12, src: 'https://images.unsplash.com/photo-1579952363878-3f3aaf30a1cb', alt: 'Training session' },
    ];

    // Calculate current images to display
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(galleryImages.length / imagesPerPage);

    const openModal = (img) => {
        setSelectedImg(img);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setSelectedImg(null);
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    const goToPrev = () => {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImg.id);
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImg(galleryImages[prevIndex]);

        // Update page if needed
        const newPage = Math.floor(prevIndex / imagesPerPage) + 1;
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    const goToNext = () => {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImg.id);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImg(galleryImages[nextIndex]);

        // Update page if needed
        const newPage = Math.floor(nextIndex / imagesPerPage) + 1;
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    const changePage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-emerald-400 mb-3">MbingloFC Gallery</h2>
                    <p className="text-gray-400">Relive our greatest moments through these captivating images</p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {currentImages.map((img) => (
                        <div key={img.id} className="relative group overflow-hidden rounded-lg">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.alt}
                                </p>
                            </div>
                            <button
                                onClick={() => openModal(img)}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600"
                            >
                                <FaSearchPlus />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-800"
                    >
                        <FaAngleLeft />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => changePage(i + 1)}
                            className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-emerald-600' : 'hover:bg-gray-800'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full disabled:opacity-50 hover:bg-gray-800"
                    >
                        <FaAngleRight />
                    </button>
                </div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
                            onClick={closeModal}
                        >
                            <div
                                className="relative max-w-4xl w-full"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute -top-12 right-0 text-white hover:text-emerald-400"
                                >
                                    <FaTimes size={24} />
                                </button>

                                <motion.img
                                    src={selectedImg.src}
                                    alt={selectedImg.alt}
                                    className="w-full max-h-[80vh] object-contain rounded-lg"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                />

                                <div className="flex justify-between items-center mt-4 text-white">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                        className="p-2 bg-black/50 rounded-full hover:bg-emerald-600"
                                    >
                                        <FaChevronLeft />
                                    </button>

                                    <p className="text-center">
                                        {selectedImg.alt}
                                    </p>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                        className="p-2 bg-black/50 rounded-full hover:bg-emerald-600"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;