import { useEffect, useState } from 'react';
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

  // useEffect(() => {
  //   const ajouter = async () => {
  //    const dataMateriel = [
  //       {
  //         "titre": "Matériel 1",
  //         "stock": "10",
  //         "codeMateriel": "CODE1000",
  //         "prixAchat": "15.00",
  //         "fournisseur": "Fournisseur A",
  //         "comment": "Commentaire sur le matériel 1"
  //       },
  //       {
  //         "titre": "Matériel 2",
  //         "stock": "20",
  //         "codeMateriel": "CODE1001",
  //         "prixAchat": "30.00",
  //         "fournisseur": "Fournisseur B",
  //         "comment": "Commentaire sur le matériel 2"
  //       },
  //       {
  //         "titre": "Matériel 3",
  //         "stock": "30",
  //         "codeMateriel": "CODE1002",
  //         "prixAchat": "45.00",
  //         "fournisseur": "Fournisseur C",
  //         "comment": "Commentaire sur le matériel 3"
  //       },
  //       {
  //         "titre": "Matériel 4",
  //         "stock": "40",
  //         "codeMateriel": "CODE1003",
  //         "prixAchat": "60.00",
  //         "fournisseur": "Fournisseur D",
  //         "comment": "Commentaire sur le matériel 4"
  //       },
  //       {
  //         "titre": "Matériel 5",
  //         "stock": "50",
  //         "codeMateriel": "CODE1004",
  //         "prixAchat": "75.00",
  //         "fournisseur": "Fournisseur E",
  //         "comment": "Commentaire sur le matériel 5"
  //       },
  //       {
  //         "titre": "Matériel 6",
  //         "stock": "60",
  //         "codeMateriel": "CODE1005",
  //         "prixAchat": "90.00",
  //         "fournisseur": "Fournisseur F",
  //         "comment": "Commentaire sur le matériel 6"
  //       },
  //       {
  //         "titre": "Matériel 7",
  //         "stock": "70",
  //         "codeMateriel": "CODE1006",
  //         "prixAchat": "105.00",
  //         "fournisseur": "Fournisseur G",
  //         "comment": "Commentaire sur le matériel 7"
  //       },
  //       {
  //         "titre": "Matériel 8",
  //         "stock": "80",
  //         "codeMateriel": "CODE1007",
  //         "prixAchat": "120.00",
  //         "fournisseur": "Fournisseur H",
  //         "comment": "Commentaire sur le matériel 8"
  //       },
  //       {
  //         "titre": "Matériel 9",
  //         "stock": "90",
  //         "codeMateriel": "CODE1008",
  //         "prixAchat": "135.00",
  //         "fournisseur": "Fournisseur I",
  //         "comment": "Commentaire sur le matériel 9"
  //       },
  //       {
  //         "titre": "Matériel 10",
  //         "stock": "100",
  //         "codeMateriel": "CODE1009",
  //         "prixAchat": "150.00",
  //         "fournisseur": "Fournisseur J",
  //         "comment": "Commentaire sur le matériel 10"
  //       },
  //       {
  //         "titre": "Matériel 11",
  //         "stock": "110",
  //         "codeMateriel": "CODE1010",
  //         "prixAchat": "165.00",
  //         "fournisseur": "Fournisseur K",
  //         "comment": "Commentaire sur le matériel 11"
  //       },
  //       {
  //         "titre": "Matériel 12",
  //         "stock": "120",
  //         "codeMateriel": "CODE1011",
  //         "prixAchat": "180.00",
  //         "fournisseur": "Fournisseur L",
  //         "comment": "Commentaire sur le matériel 12"
  //       },
  //       {
  //         "titre": "Matériel 13",
  //         "stock": "130",
  //         "codeMateriel": "CODE1012",
  //         "prixAchat": "195.00",
  //         "fournisseur": "Fournisseur M",
  //         "comment": "Commentaire sur le matériel 13"
  //       },
  //       {
  //         "titre": "Matériel 14",
  //         "stock": "140",
  //         "codeMateriel": "CODE1013",
  //         "prixAchat": "210.00",
  //         "fournisseur": "Fournisseur N",
  //         "comment": "Commentaire sur le matériel 14"
  //       },
  //       {
  //         "titre": "Matériel 15",
  //         "stock": "150",
  //         "codeMateriel": "CODE1014",
  //         "prixAchat": "225.00",
  //         "fournisseur": "Fournisseur O",
  //         "comment": "Commentaire sur le matériel 15"
  //       },
  //       {
  //         "titre": "Matériel 16",
  //         "stock": "160",
  //         "codeMateriel": "CODE1015",
  //         "prixAchat": "240.00",
  //         "fournisseur": "Fournisseur P",
  //         "comment": "Commentaire sur le matériel 16"
  //       },
  //       {
  //         "titre": "Matériel 17",
  //         "stock": "170",
  //         "codeMateriel": "CODE1016",
  //         "prixAchat": "255.00",
  //         "fournisseur": "Fournisseur Q",
  //         "comment": "Commentaire sur le matériel 17"
  //       },
  //       {
  //         "titre": "Matériel 18",
  //         "stock": "180",
  //         "codeMateriel": "CODE1017",
  //         "prixAchat": "270.00",
  //         "fournisseur": "Fournisseur R",
  //         "comment": "Commentaire sur le matériel 18"
  //       },
  //       {
  //         "titre": "Matériel 19",
  //         "stock": "190",
  //         "codeMateriel": "CODE1018",
  //         "prixAchat": "285.00",
  //         "fournisseur": "Fournisseur S",
  //         "comment": "Commentaire sur le matériel 19"
  //       },
  //       {
  //         "titre": "Matériel 20",
  //         "stock": "200",
  //         "codeMateriel": "CODE1019",
  //         "prixAchat": "300.00",
  //         "fournisseur": "Fournisseur T",
  //         "comment": "Commentaire sur le matériel 20"
  //       },
  //       {
  //         "titre": "Matériel 50",
  //         "stock": "500",
  //         "codeMateriel": "CODE1049",
  //         "prixAchat": "750.00",
  //         "fournisseur": "Fournisseur X",
  //         "comment": "Commentaire sur le matériel 50"
  //       }
  //     ]
      

  //     // await addDoc(collection(db, 'materiels'), dataMateriel);

  //     for (const materiel of dataMateriel) {
  //       await addDoc(collection(db, 'materiels'), materiel);
  //     }
  //   }

  //   ajouter()
    
  // }, [])
  

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
    </form>
  );
}
