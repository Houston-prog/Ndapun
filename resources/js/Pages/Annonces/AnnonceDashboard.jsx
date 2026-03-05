import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ properties, annonces }) {
    const [view, setView] = useState('annonces');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [imageErrors, setImageErrors] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        titre: '',
        description: '',
        contact: '',
        name: '',
        lien_url: '',
        images: [], // Tableau d'images sélectionnées
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 8 * 1024 * 1024; // 8MB

        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                errors.push(`${file.name}: format non supporté`);
            } else if (file.size > maxSize) {
                errors.push(`${file.name}: dépasse 8Mo`);
            } else {
                validFiles.push(file);
            }
        });

        setImageErrors(errors);
        setData('images', validFiles);

        // Générer des prévisualisations locales pour les fichiers valides
        const filePreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Empêcher l'envoi si des erreurs d'images existent
        if (imageErrors.length > 0) {
            alert("Veuillez corriger les erreurs d'image avant de soumettre.");
            return;
        }

        // Créer un FormData pour envoyer les fichiers
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'images' && Array.isArray(data.images)) {
                data.images.forEach(file => {
                    formData.append('images[]', file);
                });
            } else {
                formData.append(key, data[key]);
            }
        });

        post(route('annonces.store'), {
            onSuccess: () => {
                reset();
                setPreviews([]);
                setImageErrors([]);
                setIsModalOpen(false);
            },
            onError: (error) => {
                console.log(errors)
            }
        });
    };

    const handleStatusChange = (propertyId, currentStatus) => {
        const nextStatus = currentStatus === 'Loue' ? 'Vendu' : 'Loue';

        router.patch(route('properties.update-status', propertyId), {
            status: nextStatus
        }, {
            onSuccess: () => {
                // Rafraîchir la page pour voir le changement
                router.reload();
            }
        });
    };

    const isOlderThanTwoMonths = (createdAt) => {
        const createdDate = new Date(createdAt);
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        return createdDate < twoMonthsAgo;
    };

    const handleDeleteProperty = (propertyId, title, createdAt) => {
        if (!isOlderThanTwoMonths(createdAt)) {
            alert('Cette propriété ne peut être supprimée que si elle a plus de 2 mois.');
            return;
        }

        if (confirm(`Êtes-vous sûr de vouloir désactiver cette propriété?\n\n"${title}"\n\nCette action est irréversible.`)) {
            router.delete(route('properties.destroy', propertyId), {
                onSuccess: () => {
                    router.reload();
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Annonce Dashboard" />

            <div className="flex h-screen bg-black text-white">
                {/* Sidebar (Simplifiée) */}
                <aside className="w-64 border-r border-neutral-800 p-6">
                    <h1 className="text-xl font-bold text-orange-500 mb-8">
                        Ndap-Un Toit
                    </h1>
                    <nav className="space-y-2">
                        <button
                            onClick={() => setView('annonces')}
                            className={`w-full flex p-3 rounded-lg ${view === 'annonces' ? 'bg-orange-500/10 border-l-2 border-orange-500' : ''}`}
                        >
                            Annonces
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <header className="p-6 border-b border-neutral-800 flex justify-between items-center">
                        <h2 className="text-2xl font-bold capitalize">{view}</h2>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                        >
                            + Add Annonce
                        </button>
                    </header>

                    {/* Property view */}
                    <div className="p-6">
                        {view === 'annonces' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {annonces.map(prop => (
                                        <div key={prop.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg">
                                            <div className="h-48 bg-neutral-800 flex items-center justify-center">
                                                {prop.images && Array.isArray(prop.images) && prop.images.length > 0 ? (
                                                    <img src={`/storage/${prop.images[0]}`} className="object-cover w-full h-full" alt={prop.title} />
                                                ) : (
                                                    "🏠"
                                                )}
                                            </div>
                                            <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
                                                <div className="p-4 border-b border-neutral-800">
                                                    <h4 className="font-bold">{prop.titre}</h4>
                                                    <p className="text-neutral-400 text-sm">{prop.description}</p>
                                                </div>
                                                <div className="gap-4 p-4 border-b border-neutral-800">
                                                    <p className='text-neutral-400 text-sm'>
                                                        Contact: {prop.contact}
                                                    </p>
                                                    <p className='text-neutral-400 text-sm'>
                                                        Propriétaire: {prop.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-neutral-800/30">
                                                <p className='text-neutral-400 text-xs'>
                                                    📅 Créé le: {new Date(prop.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="p-4 border-t border-neutral-800">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusChange(prop.id, prop.status)}
                                                        className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-lg font-bold transition-colors"
                                                    >
                                                        Changer le statut
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProperty(prop.id, prop.title, prop.created_at)}
                                                        disabled={!isOlderThanTwoMonths(prop.created_at)}
                                                        className={`flex-1 py-2 rounded-lg font-bold transition-colors ${
                                                            isOlderThanTwoMonths(prop.created_at)
                                                                ? 'bg-red-600 hover:bg-red-500 text-white'
                                                                : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                                        }`}
                                                    >
                                                        Désactiver
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                </main>

                {/* Modal de création (Simplifiée) */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="modal-content absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl">
                            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex justify-between z-10">
                                <h3 className="text-xl font-bold text-white">Add New Annonce</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 mx-8 py-4">
                                {/* Infos de base */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-neutral-400 mb-1">Titre de l'annonce</label>
                                            <input
                                                type="text"
                                                value={data.titre}
                                                onChange={e => setData('titre', e.target.value)}
                                                className="w-full bg-black border border-neutral-700 rounded-lg p-2.5"
                                                required
                                            />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Contact</label>
                                    <input
                                        type="text"
                                        value={data.contact}
                                        onChange={e => setData('contact', e.target.value)}
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-2.5"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-neutral-400 mb-1">Propriétaire</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full bg-black border border-neutral-700 rounded-lg p-2.5"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm text-neutral-400 mb-1">Lien Whatsapp</label>
                                        <input
                                            type="text"
                                            value={data.lien_url}
                                            onChange={e => setData('lien_url', e.target.value)}
                                            className="w-full bg-black border border-neutral-700 rounded-lg p-2.5"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-black border border-neutral-700 rounded-lg p-2.5 h-24 resize-none"
                                    >

                                    </textarea>
                                </div>

                                {/* Section Upload Multiple */}
                                <h3 className="text-xl font-bold mb-4">Add Images</h3>
                                <div className="border-2 border-dashed border-neutral-700 p-6 rounded-xl text-center">
                                    <label className="cursor-pointer block">
                                        <span className="text-orange-500 font-medium">Cliquez pour ajouter des photos</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/png, image/jpeg, image/webp"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-neutral-500 mt-2">JPG, PNG ou WEBP jusqu'à 8Mo par fichier</p>

                                    {/* Prévisualisation des images sélectionnées */}
                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                                            {previews.map((url, index) => (
                                                <div key={index} className="relative h-16 w-16 border border-neutral-700 rounded overflow-hidden">
                                                    <img src={url} className="object-cover h-full w-full" alt="Preview" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {imageErrors.length > 0 && (
                                        <div className="text-sm text-red-400 mt-2 space-y-1 text-left">
                                            {imageErrors.map((err, i) => (
                                                <div key={i}>{err}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Ajoutez les autres champs ici (Price, Location, etc.) */}
                                <div className="flex gap-3">
                                    {/* <button type="button" onClick={() => setIsModalAnnonceOpen(false)} className="flex-1 bg-neutral-800 py-2 rounded-lg">Cancel</button> */}
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-neutral-800 py-2 rounded-lg">Cancel</button>
                                    <button type="submit" className="flex-1 bg-orange-500 py-2 rounded-lg">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
