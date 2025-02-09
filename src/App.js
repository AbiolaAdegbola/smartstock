import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './smartStock/Dashboard';
import Connexion from './smartStock/Connexion';
import UpdateMateriel from './smartStock/UpdateMateriel';
import { Analytics } from "@vercel/analytics/react"
import 'react-toastify/dist/ReactToastify.css';
import Inscription from './smartStock/Inscription';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/smartStock' element={<Dashboard />}/>
        <Route path='/update_materiel/' element={<UpdateMateriel />}/>
        <Route path='/ajouter-utilisateur' element={<Inscription/>}/>
        <Route path='/' element={<Connexion/>}/>
      </Routes>
      <Analytics/>
    </div>
  );
}

export default App;
