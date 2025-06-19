import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(6); // Show 6 images per page
    const [displayedImages, setDisplayedImages] = useState([]);

    // Sample player images (replace with your actual image URLs)
    const galleryImages = [
        // Page 1
        { id: 1, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', alt: 'Player celebrating goal', category: 'action' },
        { id: 2, src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', alt: 'Team huddle', category: 'team' },
        { id: 3, src: 'https://images.unsplash.com/photo-1579952363878-3f3aaf30a1cb', alt: 'Player running with ball', category: 'action' },
        { id: 4, src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20', alt: 'Stadium crowd', category: 'stadium' },
        { id: 5, src: 'https://images.unsplash.com/photo-1508098682722-e99c47a06b43', alt: 'Player shooting', category: 'action' },
        { id: 6, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', alt: 'Player training', category: 'training' },
        // Page 2
        { id: 7, src: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781', alt: 'Goalkeeper save', category: 'action' },
        { id: 8, src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', alt: 'Team celebration', category: 'team' },
        { id: 9, src: 'https://images.unsplash.com/photo-1483721310020-03333e577078', alt: 'Player dribbling', category: 'action' },
        { id: 10, src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', alt: 'Fans cheering', category: 'fans' },
        { id: 11, src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e', alt: 'Player header', category: 'action' },
        { id: 12, src: 'https://images.unsplash.com/photo-1579952363878-3f3aaf30a1cb', alt: 'Training session', category: 'training' },
    ];

    // Calculate pagination
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(galleryImages.length / imagesPerPage);

    // Update displayed images when page changes
    useEffect(() => {
        setDisplayedImages(currentImages);
    }, [currentPage, currentImages]);

    const openModal = (img, index) => {
        setSelectedImg(img);
        setCurrentIndex(indexOfFirstImage + index); // Store global index
    };

    const closeModal = () => {
        setSelectedImg(null);
    };

    const navigate = (direction) => {
        let newIndex;
        if (direction === 'prev') {
            newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        } else {
            newIndex = (currentIndex + 1) % galleryImages.length;
        }
        setCurrentIndex(newIndex);
        setSelectedImg(galleryImages[newIndex]);

        // Update page if needed
        const newPage = Math.floor(newIndex / imagesPerPage) + 1;
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    };

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-950">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-3">
                        MbingloFC Gallery
                    </h2>
                    <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                        Relive our greatest moments through these captivating images
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {displayedImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white font-medium">{img.alt}</p>
                                    <span className="text-xs text-emerald-400">{img.category}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal(img, index)}
                                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-emerald-600"
                            >
                                <FaSearchPlus className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center items-center space-x-2"
                >
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-600 cursor-not-allowed' : 'text-emerald-400 hover:bg-emerald-900'}`}
                    >
                        <FaAngleLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === number ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:bg-emerald-900'}`}
                        >
                            {number}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-600 cursor-not-allowed' : 'text-emerald-400 hover:bg-emerald-900'}`}
                    >
                        <FaAngleRight className="w-5 h-5" />
                    </button>
                </motion.div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>

                            <div className="relative max-w-4xl w-full">
                                <motion.img
                                    key={selectedImg.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={selectedImg.src}
                                    alt={selectedImg.alt}
                                    className="w-full max-h-[80vh] object-contain rounded-lg"
                                />

                                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                                    <button
                                        onClick={() => navigate('prev')}
                                        className="p-2 bg-black/50 rounded-full text-white hover:bg-emerald-600 transition-colors"
                                    >
                                        <FaChevronLeft className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                                    <button
                                        onClick={() => navigate('next')}
                                        className="p-2 bg-black/50 rounded-full text-white hover:bg-emerald-600 transition-colors"
                                    >
                                        <FaChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="mt-4 text-center text-white">
                                    <p className="font-medium">{selectedImg.alt}</p>
                                    <p className="text-sm text-emerald-400">
                                        Image {currentIndex + 1} of {galleryImages.length} • Page {currentPage} of {totalPages}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Gallery;