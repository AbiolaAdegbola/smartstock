import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { FaArrowDown, FaArrowUp, FaBars, FaCalculator, FaFileInvoiceDollar, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import db from '../../firebase-config'; // Assurez-vous d'importer correctement votre configuration Firebase
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Janvier',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Fevrier',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Mars',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Avril',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Mai',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Juin',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Juillet',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


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

function VueDEnsemble() {

    const [materiels, setMateriels] = useState([])
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement des données
    const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche


    // Utilisez useEffect pour récupérer les matériels à chaque fois que le composant se monte
    useEffect(() => {
        const fetchMateriels = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'historiques')); // Récupère tous les matériels de la collection "materiels"
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

    return (
        <div>

            <div className='row'>
                <div className='col-lg-8'>
                    {/* banniere */}
                    <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192,192,0.3)", height: "28vh", padding: "20px", position: "relative" }}>
                        <h5 style={{ color: "goldenrod", fontSize: "22px" }}>
                            Félicitation Salomon ! 🎉🎊
                        </h5>

                        <div style={{ width: "60%", marginTop: "20px" }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, sit nam! Nesciunt quos pariatur iste debitis, cupiditate !
                        </div>
                        <br />

                    </div>

                    {/* section 2 hearder */}
                    <div style={{ marginTop: "20px", width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "52vh", padding: "20px" }}>
                        <h6>Statistique de location de matériel mensuel</h6>
                        <ResponsiveContainer width="100%" height="95%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 5,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
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
                                        235
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
                                        34
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className='row' style={{ marginTop: "20px" }}>
                        <div className='col-lg-6'>
                            <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "26vh", padding: "20px" }}>
                                <h6 style={{ fontSize: "14px", display: "flex", justifyContent: "space-between" }}>
                                    <span>Matériel loué</span>
                                    <span><FaBars /></span>
                                </h6>

                                <div style={{ marginTop: "20px" }}>
                                    <div style={{ backgroundColor: "goldenrod", color: "white", width: "50px", textAlign: "center", padding: "5px", borderRadius: "5px" }}><FaFileInvoiceDollar style={{ fontSize: "23px" }} /></div>
                                    <div style={{ fontSize: "32px", marginLeft: "20px", marginTop: "10px" }}>
                                        189
                                    </div>

                                    <div style={{ marginTop: "10px", display: "flex", alignItems: "center", color: "green", fontSize: "14px" }}>
                                        <FaArrowUp /> <span style={{ marginLeft: "10px" }}>18%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "26vh", padding: "20px" }}>
                                <h6 style={{ fontSize: "14px", display: "flex", justifyContent: "space-between" }}>
                                    <span>Materiel desfuctueuses</span>
                                    {/* <span><FaBars /></span> */}
                                </h6>

                                <div style={{ marginTop: "20px" }}>
                                    <div style={{ backgroundColor: "goldenrod", color: "white", width: "50px", textAlign: "center", padding: "5px", borderRadius: "5px" }}><FaMessage style={{ fontSize: "23px" }} /></div>
                                    <div style={{ fontSize: "25px", marginLeft: "20px", marginTop: "10px" }}>
                                        43
                                    </div>
                                    <div style={{ marginTop: "5px", display: "flex", alignItems: "center", color: "red", fontSize: "14px" }}>
                                        <FaArrowDown /> <span style={{ marginLeft: "10px" }}>- 23%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* section 3 */}
                    <div style={{ width: "100%", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", height: "20vh", marginTop: "20px", padding: "20px" }}>
                        <h6>Promo spécial</h6>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas repellat dignissimos voluptates veritatis vero doloremque odit neque
                        </div>
                    </div>
                </div>
            </div>

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

                <header style={{ marginBottom: "15px", marginTop: "20px" }}>
                    <span style={{ fontSize: "30px", textTransform: "uppercase", fontWeight: "bold" }}>LISTE DES ENtrées et sorties de matériel</span><br />
                </header>
                <table className="responsive-table" style={{ width: "101.5%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Téléphone</th>
                            <th >Matériel </th>
                            <th >Quantité </th>
                            <th>Montant</th>
                            <th>Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            isLoading ? (
                                <tr>
                                    <td colSpan="6">
                                        <SkeletonLoader />
                                    </td>
                                </tr>
                            ) :
                                filteredMateriels.map((data, index) => (
                                    <tr key={index} >
                                        <th>{data.nomClient}</th>
                                        <td>{data.phone}</td>
                                        <td>{data.titre}</td>
                                        <td>{data.quantite}</td>
                                        <td>{data.montant}</td>
                                        <td>{data.type}</td>
                                        <td>{data.createdAt}</td>
                                    </tr>
                                ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default VueDEnsemble
