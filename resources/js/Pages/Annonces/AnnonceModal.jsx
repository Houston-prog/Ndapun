import React, { useState, useRef, useEffect } from 'react';

export default function AnnonceModal({ property, isOpen, onClose }) {
    if (!isOpen || !property) return null;

    const images = property.images && Array.isArray(property.images) ? property.images : [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbsRef = useRef(null);
    const pauseAutoRef = useRef(false);

    useEffect(() => {
        const container = thumbsRef.current;
        if (!container || images.length <= 1) return;

        const scrollStep = () => {
            if (pauseAutoRef.current) return;
            const firstChild = container.querySelector(':scope > div > *');
            const step = firstChild ? firstChild.offsetWidth + 8 : 100;
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: step, behavior: 'smooth' });
            }
        };

        const interval = setInterval(scrollStep, 2200);
        return () => clearInterval(interval);
    }, [images]);

    const showPrev = () => setCurrentIndex(i => (i <= 0 ? images.length - 1 : i - 1));
    const showNext = () => setCurrentIndex(i => (i >= images.length - 1 ? 0 : i + 1));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

            {/* Contenu */}
            <div className="relative bg-neutral-900 border border-neutral-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">✕</button>

                <div className="md:w-1/2 p-4 flex flex-col gap-3">
                    {images.length > 0 ? (
                        <div className="relative w-full h-80 md:h-[480px] bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src={`/storage/${images[currentIndex]}`}
                                alt={`${property.title} - ${currentIndex + 1}`}
                                className="object-cover w-full h-full"
                            />

                            {/* Left / Right controls */}
                            <button onClick={showPrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                                ‹
                            </button>
                            <button onClick={showNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60">
                                ›
                            </button>
                        </div>
                    ) : (
                        <div className="w-full h-80 md:h-[480px] bg-neutral-800 rounded-lg flex items-center justify-center">🏠</div>
                    )}

                    {/* Thumbnails row moved to the right column (below stats) */}
                </div>

                <div className="md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-white mt-2 mb-4 font-display">{property.titre}</h2>

                    <div className="bg-neutral-800/50 p-4 rounded-xl mb-6">
                        <p className="text-neutral-300 text-sm leading-relaxed">
                            {property.description || "Aucune description fournie pour ce bien d'exception."}
                        </p>
                    </div>

                    {/* Thumbnails row (moved here) */}
                    {images.length > 0 && (
                        <div
                            ref={thumbsRef}
                            onMouseEnter={() => (pauseAutoRef.current = true)}
                            onMouseLeave={() => (pauseAutoRef.current = false)}
                            className="w-full overflow-x-auto no-scrollbar mb-4 snap-container"
                        >
                            <div className="flex gap-2 py-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border snap-item ${idx === currentIndex ? 'border-orange-500' : 'border-neutral-700'}`}
                                    >
                                        <img src={`/storage/${img}`} alt={`thumb-${idx}`} className="object-cover w-full h-full" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <a href={`tel:${property.contact || ''}`} className="w-full inline-block text-center bg-orange-600 hover:bg-orange-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20">
                        Contacter le propriétaire{property.contact ? ` : ${property.contact}` : ''}
                    </a>
                </div>
            </div>
        </div>
    );
}
