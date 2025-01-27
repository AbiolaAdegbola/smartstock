import { useState } from 'react';
import { useForm } from 'react-hook-form';
import db from '../firebase-config'; // Importez vos configurations Firebase
import { collection, addDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';

export default function AddMateriel() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const [errorsMesg, setErrorsMesg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

      await addDoc(collection(db, 'materiels'), materielData);

      // Succès
      alert('Matériel ajouté avec succès');
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de l’ajout du matériel :', error);
      setErrorsMesg("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(connexion)}>
      <label htmlFor="chk" className="label" aria-hidden="true">Nouveau matériel</label>

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

      {/* Champ Code matériel */}
      <input
        type="text"
        className="input"
        placeholder="Code matériel"
        {...register("codeMateriel")}
      />

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

      {/* Champ Fournisseur */}
      <input
        type="text"
        className="input"
        placeholder="Nom du fournisseur"
        {...register("fournisseur", {
        })}
      />

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
    </form>
  );
}
