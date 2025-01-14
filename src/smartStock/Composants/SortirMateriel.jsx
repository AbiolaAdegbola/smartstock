import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import db from '../../firebase-config'; // Importez vos configurations Firebase
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';

export default function SortirMateriel() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [titles, setTitles] = useState([]); // Liste des titres des matériels
  const [errorsMesg, setErrorsMesg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Récupère tous les titres des matériels depuis Firebase
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materiels'));
        const fetchedTitles = querySnapshot.docs.map(doc => doc.data().titre);
        setTitles(fetchedTitles);
      } catch (error) {
        console.error('Erreur lors de la récupération des titres :', error);
        setErrorsMesg("Impossible de récupérer les titres des matériels.");
      }
    };

    fetchTitles();
  }, []);

  const connexion = async (data) => {
    setIsLoading(true);
    setErrorsMesg(""); // Réinitialise les messages d'erreur

    try {
      // Vérifiez si le matériel existe
      const materielQuery = query(collection(db, 'materiels'), where('titre', '==', data.titre));
      const querySnapshot = await getDocs(materielQuery);

      if (querySnapshot.empty) {
        setErrorsMesg("Matériel non trouvé !");
        setIsLoading(false);
        return;
      }

      const materielDoc = querySnapshot.docs[0];
      const materielData = materielDoc.data();

      // Vérifiez si le stock est suffisant
      if (materielData.stock < data.quantite) {
        setErrorsMesg("Stock insuffisant !");
        setIsLoading(false);
        return;
      }

      // Mettez à jour le stock
      const updatedStock = parseInt(materielData.stock) - parseInt(data.quantite);
      await updateDoc(doc(db, 'materiels', materielDoc.id), { stock: updatedStock });

      const field = {
        titre: data.titre,
        quantite: data.quantite,
        nomClient: data.nomClient,
        phone: data.phone,
        montant: data.montant,
        type: "Sortie",
        destination: data.destination,
        createdAt: new Date().toLocaleDateString(),
      };

      // Ajoutez le nouveau matériel à la base de données
      await addDoc(collection(db, 'historiques'), field);


      alert('Sortie de matériel effectuée avec succès !');
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la sortie du matériel :', error);
      setErrorsMesg("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(connexion)}>
      <label htmlFor="chk" className="label" aria-hidden="true">Sortie de matériel</label>

      {/* Champ Select pour les Titres */}
      <select
        className={errors.titre ? 'inputError' : 'input'}
        {...register("titre", {
          required: "Le titre est obligatoire",
        })}
        style={{height: "70px"}}
      >
        <option value="">-- Sélectionnez un matériel --</option>
        {titles.map((title, index) => (
          <option key={index} value={title}>{title}</option>
        ))}
      </select>
      {errors.titre && <span className="errorMessage">{errors.titre.message}</span>}

      {/* Champ Quantité */}
      <input
        type="number"
        className={errors.quantite ? 'inputError' : 'input'}
        placeholder="Quantité à sortir"
        {...register("quantite", {
          required: "La quantité est obligatoire",
          min: { value: 1, message: "La quantité doit être au moins 1" },
        })}
      />
      {errors.quantite && <span className="errorMessage">{errors.quantite.message}</span>}

      <input
        type="text"
        className={errors.nomClient ? 'inputError' : 'input'}
        placeholder="Entrez le nom et prénoms du client"
        {...register("nomClient", {
          required: "Le nom du client est obligatoire",
        })}
      />
      {errors.nomClient && <span className="errorMessage">{errors.nomClient.message}</span>}

      <input
        type="text"
        className={errors.phone ? 'inputError' : 'input'}
        placeholder="Numéro de téléphone du client"
        {...register("phone", {
          required: "Le numéro de téléphone est obligatoire",
        })}
      />
      {errors.phone && <span className="errorMessage">{errors.phone.message}</span>}

      <input
        type="text"
        className={errors.montant ? 'inputError' : 'input'}
        placeholder="Le montant payé par le client"
        {...register("montant", {
          required: "Le montant est obligatoire",
        })}
      />
      {errors.montant && <span className="errorMessage">{errors.montant.message}</span>}

      <input
        type="text"
        className={errors.destination ? 'inputError' : 'input'}
        placeholder="Le destination des matériels"
        {...register("destination", {
          required: "Le destination est obligatoire",
        })}
      />
      {errors.destination && <span className="errorMessage">{errors.destination.message}</span>}

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
