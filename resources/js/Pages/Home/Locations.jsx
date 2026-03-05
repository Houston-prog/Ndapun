import { router } from "@inertiajs/react";

export default function Locations() {
    const LOCATIONS = [
        { name: 'Appartement/Studios', icon: '🏙️', count: 45, slug: 'residentiel', bg: 'images/ap.jpg' },
        { name: 'Chambres', icon: '🛏️', count: 32, slug: 'chambres', bg: 'images/ch.jpg' },
        { name: 'Meublés', icon: '🛋️', count: 32, slug: 'meubles', bg: 'images/mb.png' },
        { name: 'Bureaux/Espaces commerciales', icon: '💼', count: 32, slug: 'professionnel', bg: 'images/bc.png' },
        { name: 'Hôtel/Motels', icon: '🏨', count: 32, slug: 'hotel', bg: 'images/ht.png' },
        { name: 'Maisons', icon: '🏠', count: 32, slug: 'Villa', bg: 'images/ms.jpg' },
    ];

    const handleFilter = (type) => {
        router.get(route('properties.index'), { type: type });
    };

    return (
        <section className="py-20 bg-neutral-900" id="">
             <div class="text-center mb-12">
                <span class="text-orange-500 font-semibold text-4xl uppercase tracking-wider">
                    Explorez
                </span>
                <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
                    Zones populaires
                </h2>
                <p class="text-neutral-400 mt-4 max-w-2xl mx-auto">
                    Découvrez les meilleurs offres
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6">
                {LOCATIONS.map((loc) => (
                    <button onClick={() => handleFilter(loc.slug)} key={loc.slug} className="location-filter-btn group relative overflow-hidden rounded-2xl h-40 sm:h-48 border border-neutral-700 hover:border-orange-500 transition-all block w-full" style={{ backgroundImage: `url('${loc.bg}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-left">
                            <span className="text-2xl">{loc.icon}</span>
                            <h3 className="text-white font-bold">{loc.name}</h3>
                            <p className="text-neutral-400 text-sm">{loc.count} Properties</p>
                        </div>

                        <div className="absolute top-4 right-4 w-8 h-8 bg-orange-600/0 group-hover:bg-orange-600 rounded-full flex items-center justify-center transition-all">
                            <svg className="w-4 h-4 text-transparent group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    )
}
