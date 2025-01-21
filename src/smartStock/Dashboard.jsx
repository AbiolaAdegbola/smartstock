import {  FaCalculator, FaFile, FaSignOutAlt, FaStackOverflow, FaTrash, } from 'react-icons/fa'
import VueDEnsemble from './Composants/VueEnsemble';
import { useState } from 'react';
import Materiels from './Composants/Materiels';
import '../styles/dashboard/dashboard.css'
import AddMateriel from './AddMateril';
import EntrerMateriel from './Composants/EntrerMateriel';
import SortirMateriel from './Composants/SortirMateriel';
import logo from '../assets/logo.png'


function Dashboard() {


    const [elementActif, setElementActif] = useState(<VueDEnsemble />);
    const [titreElementActif, setTitreElementActif] = useState("Vue d'ensemble");

    const handleChangeContainer = (element, titre) => {
        setElementActif(element)
        setTitreElementActif(titre)
    }

    return (
        <div style={{ position: "relative", backgroundColor: "#F4F5F7" }}>
            {/* barre de menu a gauche */}
            <div style={{ position: "fixed", height: "100vh", minWidth: "268px", maxWidth: "268px", top: "0px", zIndex: 99, backgroundColor: "white" }}>

                <div style={{ fontSize: "30px", textTransform: "uppercase", fontWeight: "bold", marginTop:"30px", textAlign: "center" }}>
                    <img src={logo} alt="logo" width={200} height={140} /><br />

                    Smart Stock
                </div>
                <div style={{ marginTop: "50px" }}>

                </div>
                <div onClick={() => handleChangeContainer(<VueDEnsemble />, "Vue d'ensemble")} className={titreElementActif === "Vue d'ensemble" ? 'actifBarreGauche' : 'barreGauche'}>
                    <FaStackOverflow style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}  >Vue d'ensemble</div>
                </div>

                <div className={titreElementActif === 'Mes salles' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<Materiels />, 'Mes salles')}>
                    <FaFile style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}>Liste de matériel</div>
                </div>

                {
                    JSON.parse(localStorage.getItem('user'))?.type === 'admin' &&
                    <div className={titreElementActif === 'Ajouter materiel' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<AddMateriel />, 'Ajouter materiel')}>
                        <FaFile style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}>Ajouter materiel</div>
                    </div>
                }

                <div className={titreElementActif === 'sortir materiel' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<SortirMateriel />, 'sortir materiel')}>
                    <FaCalculator style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}>Sortie de materiel</div>
                </div>

                <div className={titreElementActif === 'entree materiel' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer(<EntrerMateriel />, 'entree materiel')}>
                    <FaCalculator style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}>Entrée de materiel</div>
                </div>

                {
                    JSON.parse(localStorage.getItem('user'))?.type === 'admin' && <div className={titreElementActif === 'Corbeilles' ? 'actifBarreGauche' : 'barreGauche'} onClick={() => handleChangeContainer("<Corbeilles />", 'Corbeilles')}>
                    <FaTrash style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }}>Corbeille</div>
                </div>
                }

                <div className='barreGauche' style={{ position: "absolute", bottom: "20px" }}>
                    <FaSignOutAlt style={{ fontSize: "18px" }} /> <div style={{ marginLeft: "10px" }} onClick={() =>{
                        localStorage.removeItem("user")
                        window.location.href = "/"
                    }}>Déconnexion</div>
                </div>


            </div>
            {/* fin barre de menu a gauche */}
            <div style={{ marginLeft: "280px", marginRight: "10px", paddingTop: "50px", backgroundColor: "#F4F5F7", height: "100vh" }} >
                {elementActif}
            </div>


        </div>
    )
}

export default Dashboard
