import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import db from '../firebase-config'; // Importez vos configurations Firebase
import { doc, updateDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function AddMateriel() {
    const {
        register,
        handleSubmit,
        setValue, // Permet de définir la valeur d'un champ spécifique
        formState: { errors }
    } = useForm();

    const [errorsMesg, setErrorsMesg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useLocation(); // Récupère l'état passé via la navigation
    const navigate = useNavigate(); // Permet de rediriger après l'ajout ou la mise à jour
    const connexion = async (data) => {
        setIsLoading(true);
        setErrorsMesg(""); // Réinitialise les messages d'erreur

        try {
            const materielData = {
                file: "lien du fichier", // Remplacez par l'URL du fichier si nécessaire
                titre: data.titre,
                stock: data.stock || '',
                codeMateriel: data.codeMateriel || '',
                prixAchat: data.prixAchat || '',
                fournisseur: data.fournisseur || '',
                comment: data.comment || '',
            };

                // Si un matériel est passé via state, on le met à jour
                const materielRef = doc(db, 'materiels', state.materiel.id);
                await updateDoc(materielRef, materielData);

                toast.success('Matériel mis à jour avec succès');
        
            setIsLoading(false);
            navigate('/smartStock'); // Rediriger vers la page des matériels après l'action
        } catch (error) {
            console.error('Erreur lors de l’ajout ou la mise à jour du matériel :', error);
            setErrorsMesg("Une erreur est survenue. Veuillez réessayer.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const recu_material = () => {
            if (state?.materiel) {
                const { titre, stock, codeMateriel, prixAchat, fournisseur, comment } = state.materiel;
                setValue("titre", titre);
                setValue("stock", stock);
                setValue("codeMateriel", codeMateriel);
                setValue("prixAchat", prixAchat);
                setValue("fournisseur", fournisseur);
                setValue("comment", comment);
            }
        };
        console.log(state);
        recu_material();
    }, [state, setValue]);

    return (
        <form onSubmit={handleSubmit(connexion)}>
            <label htmlFor="chk" className="label" aria-hidden="true">{state?.materiel ? "Modifier le matériel" : "Nouveau matériel"}</label>

            {/* Champ Titre */}
            <input
                type="text"
                className={errors.titre ? 'inputError' : 'input'}
                placeholder="Titre matériel"
                {...register("titre", {
                    required: "Le titre est obligatoire",
                    minLength: { value: 3, message: "Le titre doit contenir au moins 3 caractères" },
                })}
            />
            {errors.titre && <span className="errorMessage">{errors.titre.message}</span>}

            {/* Champ Stock */}
            <input
                type="text"
                className={errors.stock ? 'inputError' : 'input'}
                placeholder="Stock Disponible"
                {...register("stock", {
                    required: "Le stock est obligatoire",
                    pattern: { value: /^[0-9]+$/, message: "Le stock doit être un nombre" },
                })}
            />
            {errors.stock && <span className="errorMessage">{errors.stock.message}</span>}

            {/* Champ Code matériel */}
            <input
                type="text"
                className="input"
                placeholder="Code matériel"
                {...register("codeMateriel", {
                    required: "Le code matériel est obligatoire",
                    minLength: { value: 5, message: "Le code matériel doit contenir au moins 5 caractères" },
                })}
            />
            {errors.codeMateriel && <span className="errorMessage">{errors.codeMateriel.message}</span>}

            {/* Champ Prix d'achat */}
            <input
                type="text"
                className={errors.prixAchat ? 'inputError' : 'input'}
                placeholder="Prix d'achat"
                {...register("prixAchat", {
                    required: "Le prix d'achat est obligatoire",
                    pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Le prix doit être un nombre valide" },
                })}
            />
            {errors.prixAchat && <span className="errorMessage">{errors.prixAchat.message}</span>}

            {/* Champ Fournisseur */}
            <input
                type="text"
                className="input"
                placeholder="Nom du fournisseur"
                {...register("fournisseur", {
                    required: "Le nom du fournisseur est obligatoire",
                    minLength: { value: 2, message: "Le nom doit contenir au moins 2 caractères" },
                })}
            />
            {errors.fournisseur && <span className="errorMessage">{errors.fournisseur.message}</span>}

            {/* Champ Commentaire */}
            <textarea
                placeholder="Commentaire sur le matériel"
                {...register("comment")}
                className="input"
                rows={10}
                style={{ height: "150px" }}
            ></textarea>

            {/* Message d'erreur global */}
            <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
                {errorsMesg}
            </div>

            <button className="button" disabled={isLoading}>
                {isLoading ? <FaSpinner className="spinner" /> : 'VALIDER'}
            </button>

      <ToastContainer position="top-right" autoClose={3000} />

        </form>
    );
}
