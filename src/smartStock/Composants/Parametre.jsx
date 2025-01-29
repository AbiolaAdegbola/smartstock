import React, { useState } from 'react'
import FactureModel from './FactureModel';
import { FaLock, FaUsers } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import ListeUsers from './ListeUsers';
import AddUser from './AddUser';

function Parametre() {

    const [elementActif, setElementActif] = useState(<FactureModel />);
    const [titreElementActif, setTitreElementActif] = useState("Model Facture");

    const handleChangeContainer = (element, titre) => {
        setElementActif(element)
        setTitreElementActif(titre)
    }

  return (
    <div >

<div style={{fontSize:"20px", fontWeight:"bold",}}>
            Paramètre
        </div>
        
        <div style={{position:"relative"}}>

        <div style={{position: "fixed", height:"100vh", width:"170px", fontSize:"12px", marginTop:"10px"}}>      

        <div className={titreElementActif === 'Model Facture' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<FactureModel />, "Model Facture")} style={{padding:" 4px 8px"}}>
           <FaLock style={{ fontSize: "14px" }} />
           <div style={{ marginLeft: "5px" }}>Configurer la facture</div> 
           
        </div>

        <div className={titreElementActif === 'Liste users' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<ListeUsers />, "Liste users")} style={{padding:" 4px 8px"}}>
           <FaUsers style={{ fontSize: "14px" }} />
           <div style={{ marginLeft: "5px" }}>Liste des utilisateurs</div> 
            
        </div>

        <div className={titreElementActif === 'Nouveau user' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<AddUser />, "Nouveau user")} style={{padding:" 4px 8px"}}>
        <FaCirclePlus style={{ fontSize: "14px" }} /> 
        <div style={{ marginLeft: "5px" }}>Ajouter un utilisateur</div> 
        
        </div>

        </div>

{/* conteneur des sous elements de parametre */}
        <div style={{ marginLeft: "175px", marginRight: "10px", paddingTop: "20px", backgroundColor: "#F4F5F7", height: "100vh" }} >
        {elementActif}
        </div>

        </div>

    </div>
  )
}

export default Parametre
