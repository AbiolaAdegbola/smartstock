import '../'
import { useState } from 'react';
import Connect from './connect';
import '../styles/connexion.css'

const Connexion = () => {

  const [actifContainer, setActifContainer] = useState(["connexion", ""]);

  return (
    <div className='connexionConteneur'>
      <div className="main">
        <header className='headerConnexion'>IVOIRE CLUSTER</header>

        <div className="login" style={{ display: actifContainer[0] === "connexion" ? "inherit" : "none" }}>
          
          <Connect actifContainer={actifContainer} setActifContainer={setActifContainer}/>

          <div style={{ marginTop: "50px", fontSize: "12px", fontWeight: 400, textAlign: "center" }}>
            Vous avez un compte ? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setActifContainer(["inscription", ""])}>s'inscrire</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Connexion;
