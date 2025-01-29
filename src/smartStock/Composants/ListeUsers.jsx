import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import db from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = () => (
  <ContentLoader width="100%" height={100} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="20" />
    <rect x="0" y="30" rx="5" ry="5" width="60%" height="15" />
  </ContentLoader>
);

function ListeUsers() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUtilisateurs(usersData);
        // console.log("Utilisateurs récupérés avec succès :", usersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setIsLoading(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  const filteredUsers = utilisateurs.filter(user =>
    user.mail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteDoc(doc(db, 'users', id));
        setUtilisateurs(utilisateurs.filter(user => user.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div className='row'>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          filteredUsers.map((user) => {
            return (
              <div key={user.id} className='col-lg-4'>
                <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 1px 1px rgba(192, 192, 192,0.3)", marginBottom: "10px" }}>
                  <h4>{user.nom}</h4>
                  <p>Email: {user.mail}</p>
                  <p>Type: {user.type}</p>
                  {JSON.parse(localStorage.getItem('user'))?.type === 'admin' && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <FaPencilAlt
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate(`/update_user/${user.id}`)}
                      />
                      <FaTrashAlt
                        style={{ color: "red", cursor: "pointer", marginLeft: "10px" }}
                        onClick={() => handleDeleteUser(user.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

export default ListeUsers;
