import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                            <img src="images/logo.png" alt="" className=""/>
                        </div>
                        <span className="font-display text-2xl font-bold text-white">
                            Ndap-Un Toit
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-neutral-300">
                        <Link href="#accueil" className="hover:text-orange-500 transition-colors">
                            Accueil
                        </Link>

                        <Link href="#properties" className="hover:text-orange-500 transition-colors">
                            Propiétés
                        </Link>

                        <Link href={route('annonces')} className="hover:text-orange-500 transition-colors">
                            Annonces
                        </Link>

                        <Link href="#about" className="hover:text-orange-500 transition-colors">
                            A Propos
                        </Link>

                        <Link href="#contact" className="hover:text-orange-500 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
