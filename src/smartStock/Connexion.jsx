import '../styles/connexion.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import db from '../firebase-config'; // Assurez-vous que votre configuration Firebase est correcte
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importez les méthodes nécessaires de Firestore
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Connexion = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState(''); // Gestion des erreurs d'authentification
  const [isLoading, setIsLoading] = useState(false)

  const connexion = async (data) => {
    try {
      setIsLoading(true)
      // Création d'une requête pour chercher l'utilisateur avec l'email
      const q = query(
        collection(db, 'users'),
        where('mail', '==', data.mail)
      );

      // Exécution de la requête pour récupérer l'utilisateur
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si aucun utilisateur trouvé
        setErrorMsg('Utilisateur non trouvé');
        return;
      }

      const user = querySnapshot.docs[0].data(); // Récupérer le premier utilisateur trouvé

      // Vérification du mot de passe
      if (user.mdpLogin !== data.mdpLogin) {
        setErrorMsg('Mot de passe incorrect');
        return;
      }

      console.log('Utilisateur connecté:', user );

      localStorage.setItem('user', JSON.stringify(user)); // Enregistrer l'utilisateur dans le stockage local

      // Si l'utilisateur existe et que le mot de passe est correct, naviguer vers la page suivante
      navigate('/smartStock');
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrorMsg('Erreur lors de la connexion. Veuillez réessayer.');
    }finally{
      setIsLoading(false)
    } 
  };

  return (
    <div className='connexionConteneur'>
      <div className="main">
        <header className='headerConnexion'>SMART STOCK</header>

        <div className="login">
          <form onSubmit={handleSubmit(connexion)}>
            <label htmlFor="chk" className='label' aria-hidden="true">Connexion</label>
            
            <input
              type="email"
              className={errors.mail ? 'inputError' : 'input'}
              placeholder="Email"
              {...register("mail", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "L'email n'est pas valide"
                }
              })}
            />
            {errors.mail && <p className='errorMessage'>{errors.mail.message}</p>}

            <input
              type="password"
              className={errors.mdpLogin ? 'inputError' : 'input'}
              placeholder="Mot de passe"
              {...register("mdpLogin", {
                required: "Le mot de passe est obligatoire",
                minLength: {
                  value: 5,
                  message: "Le mot de passe doit contenir au moins 5 caractères"
                }
              })}
            />
            {errors.mdpLogin && <p className='errorMessage'>{errors.mdpLogin.message}</p>}

            {/* Affichage des messages d'erreur liés à la connexion */}
            {errorMsg && <p className='errorMessage'>{errorMsg}</p>}

            <button className='button'>
              {
                isLoading ? <FaSpinner/> : "S'identifier"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
