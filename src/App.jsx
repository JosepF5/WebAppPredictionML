import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './components/login/Login';
import Menu from './components/Menu/Menu';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useState } from 'react';
import Historico from './components/Historico/Historico';
import Admin from './components/Admin/Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />}  />
        <Route path="/reset-password" element={<ResetPassword />}  />
        <Route path="/" element={checkAuth()}>
          <Route path="/menu" element={<Menu setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/historico" element={<Historico setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/admin" element={<Admin setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App
