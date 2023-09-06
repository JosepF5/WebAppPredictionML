import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login'
import Menu from './components/Menu/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta de inicio de sesión */}
        <Route path="/menu" element={<Menu />} /> {/* Ruta de la página deseada */}
      </Routes>
    </BrowserRouter>
  );
}


export default App
