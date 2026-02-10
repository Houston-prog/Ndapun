import { useForm } from "@inertiajs/react";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "images/slide1.jpg",
        title: "Trouvez votre maison de rêve",
        subtitle: "Découvrez des propriétés d'exception dans les meilleurs emplacements."
    },
    {
        image: "images/slide2.jpg",
        title: "Le luxe à votre portée",
        subtitle: "Des designs modernes et des finitions haut de gamme."
    },
    {
        image: "images/slide3.jpg",
        title: "Vues Imprenables",
        subtitle: "Des penthouses au cœur des métropoles les plus dynamiques."
    }
];

export default function Hereo() {
    const [current, setCurrent] = useState(0);

    // Auto-play du slider toutes le 5 secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Gestion du formulaire de recherche avec Inertia
    const { data, setData, get } = useForm({
        location: '',
        type: '',
        price: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('properties.index')); // Redirige vers la liste des biens avec les filtres
    };

    return (
         <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-neutral-950">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {/* Overlay dégradé du fichier source */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/50 to-orange-600/20 z-10"></div>

                    {/* Image ou Background Coloré (comme dans votre JS original) */}
                    <div
                        className="w-full h-full bg-cover bg-center scale-105"
                        style={{
                            backgroundColor: slide.color
                        }}
                    >
                        <img src={slide.image} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                </div>
            ))}

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="max-w-7xl">
                    {/* Badge Animé */}
                    <div className="animate-fade-in">
                        <span className="inline-block bg-orange-600/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-orange-600/30">
                            🏠 Bienvenue sur Ndap-Un Toit
                        </span>
                    </div>

                    {/* Titre Dynamique basé sur le slide */}
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-pulse text-center">
                        Trouvez le <span className="text-orange-500">logement de vos rêves</span>
                    </h1>

                    <p id="hero-subtitle" class="text-lg sm:text-xl text-center text-neutral-500 mb-10 leading-relaxed animate-slide-up stagger-1">
                        Découvrez les meilleurs logements adaptés à vos besoins et vos envies en un clic
                    </p>

                    {/* Bloc de Recherche (Adapté du HTML original) */}
                    <form onSubmit={handleSearch} className="bg-neutral-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-neutral-800 animate-slide-up stagger-2">
                        <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4  gap-4">
                            <div>
                                <select
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                >
                                    <option value="">Ville</option>
                                    <option value="Yaounde">Yaoundé</option>
                                    <option value="Douala">Douala</option>
                                    <option value="Limbe">Limbe</option>
                                    <option value="Buea">Buea</option>
                                    <option value="Bertoua">Bertoua</option>
                                    <option value="Kribi">Kribi</option>
                                    <option value="Bamenda">Bamenda</option>
                                    <option value="Maroua">Maroua</option>
                                    <option value="Garoua">Garoua</option>
                                    <option value="Ngaoundere">Ngaoundéré</option>
                                    <option value="Bafoussam">Bafoussam</option>
                                    <option value="Etoudi">Etoudi</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                                    value={data.type}
                                    onChange={e => setData('locality', e.target.value)}
                                >
                                    <option value="">Quartier</option>
                                    <option value="Bastos">Bastos</option>
                                    <option value="Emana">Emana</option>
                                    <option value="Essos">Essos</option>
                                    <option value="Omnissport">Omnisport</option>
                                    <option value="NgoaEklle">Ngoa-Ekéllé</option>
                                    <option value="Soa">Soa</option>
                                    <option value="Nkolmesseng">Nkolmesseng</option>
                                    <option value="Odza">Odza</option>
                                    <option value="Bependa">Bependa</option>
                                    <option value="Yassa">Yassa</option>
                                    <option value="Pk12">PK12</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                >
                                    <option value="">Typologie</option>
                                    <option value="T">T0</option>
                                    <option value="T1">T1</option>
                                    <option value="T1bis">T1 Bis</option>
                                    <option value="T2">T2</option>
                                    <option value="T3">T3</option>
                                    <option value="T4">T4</option>
                                    <option value="T5">T5</option>
                                    <option value="penthouse">Résidentiel</option>
                                    <option value="penthouse">Professionel</option>
                                    <option value="penthouse">Duplex</option>
                                    <option value="penthouse">Triplex</option>
                                    <option value="Penthouse">Penthouse</option>
                                    <option value="Villa">Villa</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 outline-none"
                                    value={data.type}
                                    onChange={e => setData('price', e.target.value)}
                                >
                                    <option value="">Prix</option>
                                    <option value="10">10 - 50000 FCFA</option>
                                    <option value="50000">50000 - 100000 FCFA</option>
                                    <option value="100000">100000 - 150000 FCFA</option>
                                    <option value="150000">150000+ FCFA</option>
                                </select>
                            </div>

                        </div>
                        <div className="bg-orange-600 p-3 gap-4 my-6 w-full text-white font-bold rounded-lg hover:bg-orange-500 transition-all">
                            <button type="submit" className="w-full rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20">
                                <SearchIcon className="w-5 h-5" />
                                Rechechers
                            </button>
                        </div>
                    </form>

                    {/* Stats Rapides */}
                    <div className="grid grid-cols-3 gap-6 mt-12 animate-slide-up stagger-3">
                        {[['500+', 'Clients Satisfaits'], ['15K+', 'villes'], ['1.2+', 'Biens Immobiliers']].map(([val, label]) => (
                            <div key={label}>
                                <div className="text-3xl font-bold text-orange-500">{val}</div>
                                <div className="text-neutral-400 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicateurs de slide (Dots) */}
            <div className="absolute bottom-10 right-10 z-30 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-orange-500' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </section>
    );
}
