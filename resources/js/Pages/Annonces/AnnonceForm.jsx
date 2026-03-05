import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

export default function AnnonceForm() {
    const [imageErrors, setImageErrors] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isModalAnnonceOpen, setIsModalAnnonceOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        titre: '',
        description: '',
        contact: '',
        name: '',
        lien_url: '',
        images: [], // Tableau d'images sélectionnées
    });

    const handleImageAnnonceChange = (e) => {
        const files = Array.from(e.target.files);

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 52 * 1024 * 1024; // 52MB

        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                errors.push(`${file.name}: format non supporté`);
            } else if (file.size > maxSize) {
                errors.push(`${file.name}: dépasse 52Mo`);
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

    const handleAnnonceSubmit = (e) => {
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

        console.log(data)

        post(route('annonces.store'), formData, {
            onSuccess: () => {
                reset();
                setImageErrors([]);
                setIsModalAnnonceOpen(false);
            },
        });
    };

  return (
    <>
        <form onSubmit={handleAnnonceSubmit} className="space-y-4 mx-8 py-4">
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
                        onChange={handleImageAnnonceChange}
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
                <button type="reset" className="flex-1 bg-neutral-800 py-2 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 bg-orange-500 py-2 rounded-lg">Save</button>
            </div>
        </form>
    </>
  )
}
