import React, { useState, useEffect } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import db from '../../firebase-config'; // Assurez-vous d'importer correctement votre configuration Firebase
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Importez les méthodes Firestore
import { useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader'; // Assurez-vous d'importer ContentLoader

// Squelette de chargement
const SkeletonLoader = () => (
  <ContentLoader
    width="100%"
    height={230}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="120" />
    <rect x="0" y="130" rx="5" ry="5" width="60%" height="20" />
    <rect x="0" y="160" rx="5" ry="5" width="30%" height="20" />
  </ContentLoader>
);

function Materiels() {
  const [materiels, setMateriels] = useState([]); // État pour stocker les matériels
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement des données
  const navigate = useNavigate();

  // Utilisez useEffect pour récupérer les matériels à chaque fois que le composant se monte
  useEffect(() => {
    const fetchMateriels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materiels')); // Récupère tous les matériels de la collection "materiels"
        const materielsData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Ajoutez l'ID du document pour des opérations futures (supprimer, modifier, etc.)
          ...doc.data(), // Récupère les données du document
        }));
        setMateriels(materielsData); // Mettez à jour l'état avec les données récupérées
        setIsLoading(false); // Les données ont été chargées, on arrête le chargement
      } catch (error) {
        console.error("Erreur lors de la récupération des matériels :", error);
        setIsLoading(false); // En cas d'erreur, arrêter également le chargement
      }
    };

    fetchMateriels(); // Appel de la fonction pour récupérer les matériels
    
  }, []); // Le tableau vide signifie que l'effet s'exécutera une seule fois au montage du composant

  // Filtrer les matériels en fonction du texte de recherche
  const filteredMateriels = materiels.filter(materiel => 
    materiel.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour supprimer un matériel
  const handleDeleteMateriel = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?");
    
    if (isConfirmed) {
      try {
        // Supprimer le matériel de Firestore
        await deleteDoc(doc(db, 'materiels', id));
        
        // Mettre à jour la liste des matériels après la suppression
        setMateriels(materiels.filter(materiel => materiel.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du matériel :", error);
      }
    }
  };

  return (
    <div>
      {/* Barre de recherche */}
      <input 
        type="text" 
        placeholder="Rechercher un matériel..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          outline: 'none'
        }} 
      />
      
      <div className='row'>
        {/* Si les données sont en cours de chargement, afficher le squelette */}
        {isLoading ? (
          <div className='row'>
            <div className='col-lg-4'>
            <SkeletonLoader />
            </div>
            <div className='col-lg-4'>
            <SkeletonLoader />
            </div>
           <div className='col-lg-4'>
           <SkeletonLoader />
           </div>
          </div>
        ) : (
          // Parcourez les matériels filtrés et affichez chaque matériel dans une colonne
          filteredMateriels.map((materiel) => (
            <div key={materiel.id} className='col-lg-4'>
              <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "38vh", padding: "20px", margin: "10px 0" }}>
                <img 
                  src={materiel.imageUrl || ""} 
                  alt={materiel.titre} 
                  style={{ 
                    width: "100%", 
                    minHeight: "100px", 
                    maxHeight: "100px", 
                    objectFit: "cover" 
                  }} 
                />
                <h6>{materiel.titre}</h6>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div> <span>Stock : </span> <span>{materiel.stock}</span></div>
                  {
                    JSON.parse(localStorage.getItem('user'))?.type === 'admin' && (
                      <div style={{ display: "flex" }}>
                        <FaPencilAlt 
                          style={{ color: "blue", cursor: "pointer" }} 
                          onClick={() => navigate(`/update_materiel/${materiel.id}`)} 
                        />
                        <FaTrashAlt 
                          style={{ color: "red", cursor: "pointer", marginLeft: "10px" }} 
                          onClick={() => handleDeleteMateriel(materiel.id)} 
                        />
                      </div>
                    )
                  }
                </div>
                <div style={{ marginTop: "10px" }}>
                  <span>Etat : </span>
                  <span style={{
                    backgroundColor: materiel.stock < 10 ? "red" : materiel.stock < 50 ? "orange" : "seagreen", 
                    color: "white", textAlign: "center", padding: "0px 20px", borderRadius: "5px"
                  }}>
                    {materiel.stock < 10 ? 'Faible' : materiel.stock < 50 ? 'Moyenne' : 'Bon'}
                  </span>
                </div>
                <div style={{ marginTop: "15px" }}>
                  <span>Commentaire</span>
                  <div style={{ fontSize: "14px", color: "#666" }}>{materiel.commentaire || 'Aucun commentaire'}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Materiels;
