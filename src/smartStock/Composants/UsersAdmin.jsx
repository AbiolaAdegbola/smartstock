import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import db from '../../firebase-config';
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from 'firebase/firestore';
import { FaCirclePlus } from 'react-icons/fa6';
import { Spinner, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

export default function UsersAdmin() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const [titles, setTitles] = useState([]); // Liste des matériels
  const [errorsMesg, setErrorsMesg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMateriels, setSelectedMateriels] = useState([]); // Matériels sélectionnés

  const listeEtat = ["Neuf", "Bon état", "Moyen", "Mauvais état", "Hors service"];

  // Récupérer les matériels depuis Firebase
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const fetchedTitles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTitles(fetchedTitles);
      } catch (error) {
        console.error('Erreur lors de la récupération des matériels :', error);
        toast.error("Impossible de récupérer les matériels.");
      }
    };

    fetchTitles();
  }, []);

  // Ajouter un matériel à la liste sélectionnée
  const addMateriel = (data) => {
    if (!data.titre || !data.quantite) {
      setErrorsMesg("Veuillez sélectionner un matériel et entrer une quantité.");
      return;
    }

    const selectedTitle = titles.find(item => item.titre === data.titre);
    if (!selectedTitle) {
      toast.error("Matériel sélectionné invalide.");
      return;
    }

    const existingMateriel = selectedMateriels.find(item => item.titre === data.titre);
    if (existingMateriel) {
      existingMateriel.quantite += parseInt(data.quantite);
      setSelectedMateriels([...selectedMateriels]);
    } else {
      setSelectedMateriels([
        ...selectedMateriels,
        {
          titre: selectedTitle.titre,
          quantite: parseInt(data.quantite),
          prixUnitaire: selectedTitle.prixAchat || 0,
          etat: data.etat
        },
      ]);
    }

    setErrorsMesg("");
    reset({ titre: "", quantite: "" });
  };

  // Validation et enregistrement de la sortie
  const handleSubmitFinal = async (data) => {
    setIsLoading(true);
    setErrorsMesg("");

    try {
      for (const materiel of selectedMateriels) {
        const materielQuery = query(collection(db, 'materiels'), where('titre', '==', materiel.titre));
        const querySnapshot = await getDocs(materielQuery);

        if (querySnapshot.empty) {
          toast.error(`Matériel "${materiel.titre}" non trouvé !`);
          setIsLoading(false);
          return;
        }

        const materielDoc = querySnapshot.docs[0];
        const materielData = materielDoc.data();

        if (materielData.stock < materiel.quantite) {
          toast.error(`Stock insuffisant pour le matériel "${materiel.titre}" !`);
          setIsLoading(false);
          return;
        }

        const updatedStock = parseInt(materielData.stock) + materiel.quantite;
        await updateDoc(doc(db, 'materiels', materielDoc.id), { stock: updatedStock });
      }

      const field = {
        materiels: JSON.stringify(selectedMateriels),
        nomClient: data.nomClient,
        phone: data.phone,
        remise: 0,
        total:0,
        montant: 0,
        type: "Entrée",
        destination: "",
        createdAt: new Date().toLocaleDateString(),
      };

      await addDoc(collection(db, 'historiques'), field);

      toast.success('Entrée de matériel effectuée avec succès !');
      setSelectedMateriels([]);
      reset();
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la sortie du matériel :', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitFinal)} style={{ paddingBottom: "50px" }}>
      <label htmlFor="chk" className="label" aria-hidden="true">Entrée de matériel</label>

      {/* Informations client */}
      <input
        type="text"
        className={errors.nomClient ? 'inputError' : 'input'}
        placeholder="Entrez le nom et prénoms du client"
        {...register("nomClient", { required: "Le nom du client est obligatoire" })}
      />

      <input
        type="text"
        className={errors.phone ? 'inputError' : 'input'}
        placeholder="Numéro de téléphone du client"
        {...register("phone", { required: "Le numéro de téléphone est obligatoire" })}
      />

      {/* Ajout des matériels */}
      <select
        className={errors.titre ? 'inputError' : 'input'}
        {...register("titre")}
        style={{ height: "55px" }}
      >
        <option>-- Sélectionnez un matériel --</option>
        {titles.map((item, index) => (
          <option key={index} value={item.titre}>{item.titre} - {item.prixAchat} F</option>
        ))}
      </select>

      {/* Champ Quantité */}
      <input
        type="number"
        className={errors.quantite ? 'inputError' : 'input'}
        placeholder="Quantité à entrer"
        {...register("quantite", {
          required: "La quantité est obligatoire",
          min: { value: 1, message: "La quantité doit être au moins 1" },
        })}
      />

      <select
        className={errors.etatMateriel ? 'inputError' : 'input'}
        {...register("etatMateriel", {
          required: "Le etat du matériel est obligatoire",
        })}
        style={{height: "60px"}}
      >
        <option value="">-- Sélectionnez un etat de matériel --</option>
        {listeEtat.map((title, index) => (
          <option key={index} value={title}>{title}</option>
        ))}
      </select>

      <div style={{ color: "goldenrod", cursor: "pointer" }} onClick={() => addMateriel({ titre: getValues("titre"), quantite: getValues("quantite"), etat: getValues("etatMateriel") })}>
        <FaCirclePlus /> Ajouter le matériel
      </div>

      {/* Liste des matériels sélectionnés */}
      <Table bordered size="sm" style={{ backgroundColor: "white", width: "100%" }}>
        <thead>
          <tr>
            <th>Matériel</th>
            <th>Qté</th>
            <th>Prix Unitaire (F CFA)</th>
            <th>Sous-total (F CFA)</th>
          </tr>
        </thead>
        <tbody>
          {selectedMateriels.map((materiel, index) => (
            <tr key={index}>
              <td>{materiel.titre}</td>
              <td>{materiel.quantite}</td>
              <td>{materiel.prixUnitaire}</td>
              {/* <td>{materiel.quantite * materiel.prixUnitaire}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Erreurs globales */}
      {errorsMesg && <div className="errorMessage">{errorsMesg}</div>}

      {/* Bouton de validation */}
      <button className="button" disabled={isLoading}>
        {isLoading ? <Spinner size='sm' className="spinner" /> : 'VALIDER'}
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
}
