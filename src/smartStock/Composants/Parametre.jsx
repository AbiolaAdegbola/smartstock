import React, { useState } from 'react'
import FactureModel from './FactureModel';
import { FaDatabase, FaLock, FaUser } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import ListeUsers from './ListeUsers';
import AddUser from './AddUser';
import UsersAdmin from './UsersAdmin';

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
            Paramètre Smart Stock
        </div>
        
        <div style={{position:"relative"}}>

        <div style={{position: "fixed", height:"100vh", width:"220px", fontSize:"14px", marginTop:"20px"}}>      

        <div className={titreElementActif === 'Model Facture' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<FactureModel />, "Model Facture")} style={{padding:" 4px 8px"}}>
           <FaLock style={{ fontSize: "18px" }} />
           <div style={{ marginLeft: "10px" }}>Configurer la facture</div> 
           
        </div>

        <div className={titreElementActif === 'Liste users' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<ListeUsers />, "Liste users")} style={{padding:" 4px 8px"}}>
           <FaUser style={{ fontSize: "18px" }} />
           <div style={{ marginLeft: "10px" }}>Liste des utilisateurs</div> 
            
        </div>

        <div className={titreElementActif === 'Nouveau user' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<AddUser />, "Nouveau user")} style={{padding:" 4px 8px"}}>
        <FaCirclePlus style={{ fontSize: "18px" }} /> 
        <div style={{ marginLeft: "10px" }}>Ajouter un utilisateur</div> 
        
        </div>

        <div className={titreElementActif === 'Gestion users' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<UsersAdmin />, "Gestion users")} style={{padding:" 4px 8px"}}>
        <FaDatabase style={{ fontSize: "18px" }} />
        <div style={{ marginLeft: "10px" }}>Gerer les utilisateurs</div> 
       
        </div>

        </div>

{/* conteneur des sous elements de parametre */}
        <div style={{ marginLeft: "240px", marginRight: "10px", paddingTop: "20px", backgroundColor: "#F4F5F7", height: "100vh" }} >
        {elementActif}
        </div>

        </div>

    </div>
  )
}

export default Parametre
