import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import db from '../../firebase-config';
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from 'firebase/firestore';
import { FaCirclePlus } from 'react-icons/fa6';
import { Spinner, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

export default function SortirMateriel() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const [titles, setTitles] = useState([]); // Liste des matériels
  const [errorsMesg, setErrorsMesg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMateriels, setSelectedMateriels] = useState([]); // Matériels sélectionnés
  const [remise, setRemise] = useState(0);

  // Récupérer les matériels depuis Firebase
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materiels'));
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
        },
      ]);
    }

    setErrorsMesg("");
    reset({ titre: "", quantite: "" });
  };

  // Calculer le total avant remise
  const calculateTotal = () => {
    return selectedMateriels.reduce(
      (total, materiel) => total + materiel.quantite * materiel.prixUnitaire,
      0
    );
  };

  // Calculer le total après remise
  const calculateTotalAfterRemise = () => {
    const total = calculateTotal();
    return remise > 0 ? total - remise : total;
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

        const updatedStock = parseInt(materielData.stock) - materiel.quantite;
        await updateDoc(doc(db, 'materiels', materielDoc.id), { stock: updatedStock });
      }

      const field = {
        materiels: JSON.stringify(selectedMateriels),
        nomClient: data.nomClient,
        phone: data.phone,
        remise: remise,
        total: calculateTotal(),
        montant: calculateTotalAfterRemise(),
        type: "Sortie",
        destination: data.destination,
        createdAt: new Date().toLocaleDateString(),
      };

      await addDoc(collection(db, 'historiques'), field);

      toast.success('Sortie de matériel effectuée avec succès !');
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
      <label htmlFor="chk" className="label" aria-hidden="true">Sortie de matériel</label>

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

      <input
        type="text"
        className={errors.destination ? 'inputError' : 'input'}
        placeholder="Destination"
        {...register("destination", { required: "La destination est obligatoire " })}
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

      <input
        className={errors.quantite ? 'inputError' : 'input'}
        type="number"
        placeholder="Quantité à sortir"
        {...register("quantite", { min: 1 })}
      />
      <div style={{ color: "goldenrod", cursor: "pointer" }} onClick={() => addMateriel({ titre: getValues("titre"), quantite: getValues("quantite") })}>
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
              <td>{materiel.quantite * materiel.prixUnitaire}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>Total avant remise (F CFA)</td>
            <td>{calculateTotal()}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>Remise (F CFA)</td>
            <td>
              <input
                type="number"
                style={{ width: "100px" }}
                value={remise}
                onChange={(e) => setRemise(parseInt(e.target.value))}
              />
            </td> 
          </tr>

          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}>Total après remise (F CFA)</td>
            <td>{calculateTotalAfterRemise()}</td>
          </tr>

        </tfoot>
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
