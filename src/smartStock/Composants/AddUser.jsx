import { useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../../firebase-config'; // Importez vos configurations Firebase
import { collection, addDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

export default function AddUser() {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const [errorsMesg, setErrorsMesg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async (data) => {
    setIsLoading(true);
    setErrorsMesg(""); // Réinitialise les messages d'erreur
    try {
      const userData = {
        nom: data.nom,
        mail: data.email,
        mdpLogin: data.motDePasse,
        type: data.type,
      };

      await addDoc(collection(db, 'users'), userData);

      // Succès
      toast.success('Utilisateur ajouté avec succès');
      setIsLoading(false);
      reset();
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’utilisateur :', error);
      setErrorsMesg("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(addUser)}>
      <label htmlFor="chk" className="label" aria-hidden="true">Nouvel Utilisateur</label>

      {/* Champ Nom */}
      <input
        type="text"
        className={errors.nom ? 'inputError' : 'input'}
        placeholder="Nom de l'utilisateur"
        {...register("nom", {
          required: "Le nom est obligatoire",
          minLength: { value: 3, message: "Le nom doit contenir au moins 3 caractères" },
        })}
      />

      {/* Champ Email */}
      <input
        type="email"
        className={errors.email ? 'inputError' : 'input'}
        placeholder="Email de l'utilisateur"
        {...register("email", {
          required: "L'email est obligatoire",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email invalide" },
        })}
      />

      {/* Champ Mot de Passe */}
      <input
        type="password"
        className={errors.motDePasse ? 'inputError' : 'input'}
        placeholder="Mot de passe"
        {...register("motDePasse", {
          required: "Le mot de passe est obligatoire",
          minLength: { value: 6, message: "Le mot de passe doit contenir au moins 6 caractères" },
        })}
      />

      {/* Champ Type d'accès */}
      <select className="input" style={{height:"57px"}} {...register("type", { required: "Le type d'accès est obligatoire" })}>
        <option value="">Sélectionner le type d'accès</option>
        <option value="admin">Administrateur</option>
        <option value="gestion">Utilisateur</option>
      </select>

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
