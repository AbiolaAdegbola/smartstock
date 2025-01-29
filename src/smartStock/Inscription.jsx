import '../styles/connexion.css'
import { useForm } from 'react-hook-form';
import db from '../firebase-config'; // Assurez-vous que votre configuration Firebase est correcte
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'; // Importez les méthodes nécessaires de Firestore
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const Inscription = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [errorMsg, setErrorMsg] = useState(''); // Gestion des erreurs d'authentification
    const [isLoading, setIsLoading] = useState(false)

    const connexion = async (data) => {
        try {

            setIsLoading(true)
            // Création d'une requête pour chercher l'utilisateur avec l'email
            const q = query(
                collection(db, 'users'),
                where('mail', '==', data.mail)
            );

            // Exécution de la requête pour récupérer l'utilisateur
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Si aucun utilisateur trouvé
                setErrorMsg('Utilisateur existe déjà');
                return;
            }

            const field = {
                nom: data.nom,
                mail: data.mail || '',
                type: data.type || '',
                mdpLogin: data.mdpLogin || '',
            };

            await addDoc(collection(db, 'users'), field);

            toast.success("Compte utilisateur crée avec succès")

        } catch (error) {
            console.error('Erreur de connexion:', error);
            setErrorMsg('Erreur lors de la connexion. Veuillez réessayer.');
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className='connexionConteneur'>
            <div className="main">
                <header className='headerConnexion'>SMART STOCK</header>

                <div className="login">
                    <form onSubmit={handleSubmit(connexion)}>
                        <label htmlFor="chk" className='label' aria-hidden="true" style={{marginBottom:"20px", marginTop:"40px"}}>Nouveau compte utilisateur</label>

                        <input
                            type="text"
                            className={errors.nom ? 'inputError' : 'input'}
                            placeholder="Nom"
                            {...register("nom", {
                                required: "Le nom est obligatoire"
                            })}
                        />

                        <input
                            type="email"
                            className={errors.mail ? 'inputError' : 'input'}
                            placeholder="Email"
                            {...register("mail", {
                                required: "L'email est obligatoire",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "L'email n'est pas valide"
                                }
                            })}
                        />

                        <select className='input' style={{ height: "55px" }} {...register("type")} defaultValue="gestion">
                            <option value="admin">Administrateur</option>
                            <option value="gestion">Gestionnaire</option>
                        </select>

                        <input
                            type="password"
                            className={errors.mdpLogin ? 'inputError' : 'input'}
                            placeholder="Mot de passe"
                            {...register("mdpLogin", {
                                required: "Le mot de passe est obligatoire",
                                minLength: {
                                    value: 5,
                                    message: "Le mot de passe doit contenir au moins 5 caractères"
                                }
                            })}
                        />

                        {/* Affichage des messages d'erreur liés à la connexion */}
                        {errorMsg && <p className='errorMessage'>{errorMsg}</p>}

                        <button className='button'>
                            {
                                isLoading ? <Spinner size='sm' /> : "S'identifier"
                            }
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Inscription;
