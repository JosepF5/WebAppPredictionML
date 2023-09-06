import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/login/Login';
import Menu from './components/Menu/Menu';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />}  /> {/* Ruta de inicio de sesión */}
        <Route path="/reset-password" element={<ResetPassword />}  />
        <Route path="/" element={checkAuth()}>
          <Route path="/menu" element={<Menu setIsAuthenticated={setIsAuthenticated}/>} />
          {/* Otras rutas protegidas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App
