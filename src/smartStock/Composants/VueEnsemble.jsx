import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { FaBars, FaCalculator, FaTrashAlt, FaUser } from 'react-icons/fa'
import db from '../../firebase-config'; // Assurez-vous d'importer correctement votre configuration Firebase
// import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Table from 'react-bootstrap/Table';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import Recupdf from './Recupdf';
import { toast, ToastContainer } from 'react-toastify';

// Squelette de chargement
const SkeletonLoader = () => (
    <ContentLoader
        width="100%"
        height={30}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="8" ry="8" width="100%" height="30" />
    </ContentLoader>
);

function VueDEnsemble() {

    const [materiels, setMateriels] = useState([])
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement des données
    const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
    const [total, setTotal] = useState(0); // État pour stocker le total des matériels
    const [sortieTotal, setSortieTotal] = useState(0)
    const [facturesInfo, setFacturesInfo] = useState(false)
    const [typeActivite, setTypeActivite] = useState(1)

    // Utilisez useEffect pour récupérer les matériels à chaque fois que le composant se monte
    useEffect(() => {
        // const fetchMateriels = async () => {
        //     try {
        //         const querySnapshot = await getDocs(collection(db, 'historiques')); // Récupère tous les matériels de la collection "materiels"
        //         const materielsData = querySnapshot.docs.map(doc => ({
        //             id: doc.id, // Ajoutez l'ID du document pour des opérations futures (supprimer, modifier, etc.)
        //             ...doc.data(), // Récupère les données du document
        //         }));
        //         setMateriels(materielsData); // Mettez à jour l'état avec les données récupérées
        //         setIsLoading(false); // Les données ont été chargées, on arrête le chargement
        //     } catch (error) {
        //         console.error("Erreur lors de la récupération des matériels :", error);
        //         setIsLoading(false); // En cas d'erreur, arrêter également le chargement
        //     }
        // };

        // fetchMateriels(); // Appel de la fonction pour récupérer les matériels
        const fetchMateriels = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'historiques'));
                const materielsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date() // Conversion en Date
                    };
                });
    
                // Trier du plus récent au plus ancien
                const sortedMateriels = materielsData.sort((a, b) => b.createdAt - a.createdAt);
    
                setMateriels(sortedMateriels);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des matériels :", error);
                setIsLoading(false);
            }
        };
    
        fetchMateriels();

        // recuperation des informations pour la facture
        const fetchFacture = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'factures')); // Récupère tous les matériels de la collection "materiels"
                const materielsData = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Ajoutez l'ID du document pour des opérations futures (supprimer, modifier, etc.)
                    ...doc.data(), // Récupère les données du document
                }));
                setFacturesInfo(materielsData); // Mettez à jour l'état avec les données récupérées
            } catch (error) {
                console.error("Erreur lors de la récupération des information sur la facture :", error);
            }
        };

        fetchFacture()

    }, []); // Le tableau vide signifie que l'effet s'exécutera une seule fois au montage du composant

    useEffect(() => {
        const produitsCollection = collection(db, "materiels"); // Référence à la collection "produits"

        // Écoute les changements en temps réel dans la collection
        const unsubscribe = onSnapshot(produitsCollection, (snapshot) => {
            setTotal(snapshot.size); // Le nombre de documents dans la collection
        });

        // Nettoyage à la fin du cycle de vie du composant
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const historiqueCollection = collection(db, "historiques");

        // Crée une requête pour les documents où le type est "Sortie"
        const sortieQuery = query(historiqueCollection, where("type", "==", "Sortie"));

        // Écoute les changements en temps réel
        const unsubscribe = onSnapshot(sortieQuery, (snapshot) => {
            setSortieTotal(snapshot.size); // Le nombre de documents correspondant
        });

        // Nettoyage à la fin du cycle de vie du composant
        return () => unsubscribe();
    }, []);

    const handleDeleteItem = async (id) => {
        try {
            await deleteDoc(doc(db, 'historiques', id)); // Supprime le document avec l'ID spécifié de la collection "historiques"
            setMateriels(materiels.filter(materiel => materiel.id !== id)); // Met à jour l'état pour supprimer l'élément localement
            toast.success("Elément supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'élément :", error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");

        }
    };

console.log(materiels)
    // Filtrer les matériels en fonction du texte de recherche
    let filteredMateriels = materiels
    .filter(materiel => materiel && typeof materiel === "object") // Vérifie que l'objet est valide
    .filter(materiel =>
        materiel?.nomClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materiel?.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materiel?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materiel?.faitPar?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>

            <div className='row'>
                <div className='col-lg-8'>
                    {/* banniere */}
                    <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192,192,0.3)", height: "28vh", padding: "20px", position: "relative", overflowY: "auto" }}>
                        <h5 style={{ color: "goldenrod", fontSize: "22px" }}>
                            Félicitation Salomon ! 🎉🎊
                        </h5>

                        <div style={{ width: "60%", marginTop: "20px" }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, sit nam! Nesciunt quos pariatur iste debitis, cupiditate !
                        </div>
                        <br />

                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "28vh", padding: "20px" }}>
                                <h6 style={{ fontSize: "14px", display: "flex", justifyContent: "space-between" }}>
                                    <span>Matériel en stock</span>
                                    <span><FaBars /></span>
                                </h6>

                                <div style={{ marginTop: "20px" }}>
                                    <div style={{ backgroundColor: "goldenrod", color: "white", width: "50px", textAlign: "center", padding: "5px", borderRadius: "5px" }}><FaUser style={{ fontSize: "23px" }} /></div>
                                    <div style={{ fontSize: "32px", marginLeft: "20px", marginTop: "10px" }}>
                                        {total ? total : 0} {/* Affiche le total des matériels */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "28vh", padding: "20px" }}>
                                <h6 style={{ fontSize: "14px", display: "flex", justifyContent: "space-between" }}>
                                    <span>Nombre de sorties</span>
                                    <span><FaBars /></span>
                                </h6>

                                <div style={{ marginTop: "20px" }}>
                                    <div style={{ backgroundColor: "goldenrod", color: "white", width: "50px", textAlign: "center", padding: "5px", borderRadius: "5px" }}><FaCalculator style={{ fontSize: "23px" }} /></div>
                                    <div style={{ fontSize: "32px", marginLeft: "20px", marginTop: "10px" }}>
                                        {sortieTotal ? sortieTotal : 0} {/* Affiche le total des sorties */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>

                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", }}>
                    <span style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "bold" }}>LISTE DES ENtrées et sorties de matériel</span>
                    {/* Barre de recherche */}
                    <input
                        type="text"
                        placeholder="Rechercher..." // Placeholder pour la barre de recherche
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            padding: '2px',
                            height: '30px',
                            marginLeft: '5px',
                        }}
                    />
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <h5 style={{ fontSize: "15px", backgroundColor: typeActivite === 1 ? "goldenrod" : "transparent", color: typeActivite === 1 ? "white" : "black", padding: "10px", borderRadius: "10px", cursor: "pointer" }} onClick={() => {
                        setTypeActivite(1)
                        setSearchTerm("")
                    }}>Tous</h5>
                    <h5 style={{ fontSize: "15px", backgroundColor: typeActivite === 2 ? "goldenrod" : "transparent", color: typeActivite === 2 ? "white" : "black", padding: "10px", borderRadius: "10px", cursor: "pointer" }} onClick={() => {
                        setTypeActivite(2)
                        setSearchTerm("Entrée")
                    }}>Entrées</h5>
                    <h5 style={{ fontSize: "15px", backgroundColor: typeActivite === 3 ? "goldenrod" : "transparent", color: typeActivite === 3 ? "white" : "black", padding: "10px", borderRadius: "10px", cursor: "pointer" }} onClick={() => {
                        setTypeActivite(3)
                        setSearchTerm("Sortie")
                    }}>Sorties</h5>
                </div>
                <Table bordered hover responsive style={{fontSize:"12px", minWidth:"1200px"}}> {/* Tableau pour afficher les matériels */}
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Enregistreur</th>
                            <th>Client</th>
                            <th>Téléphone</th>
                            <th>Destination</th>
                            <th>Liste matériel </th>
                            <th>Total</th>
                            <th>Remise</th>
                            <th>Total Final</th>
                            <th>Date</th>
                            <th>pdf</th>
                            {JSON.parse(localStorage.getItem('user'))?.type === "admin" && <th>Actions</th>}  
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="9">
                                        <SkeletonLoader />
                                    </td>
                                </tr>
                            ) :
                                filteredMateriels.map((data, index) => (
                                    <tr key={index} >
                                        <td style={{backgroundColor:data.type==="Entrée" ? "orange" : "green", color: "white" }}>{data.type}</td>
                                        <td>{data.faitPar}</td>
                                        <td>{data.nomClient}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.destination}</td>
                                        <td>
                                            <ul>
                                                {JSON.parse(data.materiels).map((el, k) =>
                                                    <li key={k}>
                                                        {el.titre} : {el.quantite} * {el.prixUnitaire} F
                                                    </li>
                                                )}
                                            </ul>
                                        </td>
                                        <td>{data.type === "Sortie" ? data.total : "-"}</td>
                                        <td>{data.type === "Sortie" ? `${data.remise}%` : "-"}</td>
                                        <td>{data.type === "Sortie" ? data.montant : "-"}</td>
                                        <td>{data.createdAt ? data.createdAt.toLocaleDateString() : "Date inconnue"}</td>
                                        <td>
                                        {data.type === "Sortie" ? <Recupdf data={data} facturesInfo={facturesInfo} /> : "-"}
                                            
                                        </td>
                            {JSON.parse(localStorage.getItem('user'))?.type === "admin" && <td><FaTrashAlt style={{color:"red", cursor: "pointer", fontSize:"18px"}} onClick={() => {
                                if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
                                    handleDeleteItem(data.id);
                                }
                            }}/></td>}  

                                    </tr>
                                ))
                        }

                    </tbody>
                </Table>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />

        </div>
    )
}

export default VueDEnsemble
