import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './smartStock/Dashboard';
import Connexion from './smartStock/Connexion';
import UpdateMateriel from './smartStock/UpdateMateriel';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/smartStock' element={<Dashboard />}/>
        <Route path='/update_materiel' element={<UpdateMateriel />}/>
        <Route path='/' element={<Connexion/>}/>
      </Routes>
    </div>
  );
}

export default App;
