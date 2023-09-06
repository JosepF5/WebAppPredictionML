import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = ({ setIsAuthenticated }) => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("???")
    setIsAuthenticated(false);
    navigate('/');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-blue-500 text-white py-4">
        <ul className="flex justify-center space-x-4">
          <li><a href="#home" className="hover:text-yellow-300">Inicio</a></li>
          <li><a href="#about" className="hover:text-yellow-300">Acerca de</a></li>
          <li><a href="#services" className="hover:text-yellow-300">Servicios</a></li>
          <li><a href="#contact" className="hover:text-yellow-300">Contacto</a></li>
          <li>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-300 focus:outline-none"
          >
            Cerrar Sesión
          </button>
        </li>
        </ul>
      </nav>
      <main className="container mx-auto mt-8 flex-grow items-center justify-center"> {/* Cambiado a flex-grow */}
        <section className="text-center">
          <h1 className="text-3xl font-bold underline">
            Estadisticas
          </h1>
          <iframe title="Report Section" className="w-full h-96" src="https://app.powerbi.com/view?r=eyJrIjoiOTMxMDM1NzYtODE5My00YmRjLWJjOWYtNTk2OWRlNTE0MWFlIiwidCI6IjBlMGNiMDYwLTA5YWQtNDlmNS1hMDA1LTY4YjliNDlhYTFmNiIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
        </section>
        
      </main>
      <footer className="bg-blue-500 text-white py-2 text-center">
        <p className="text-sm">&copy; 2023 Nuestra Empresa. Todos los derechos reservados.</p>
        <p className="text-sm"><a href="#privacy" className="hover:text-yellow-300">Política de privacidad</a> | <a href="#terms" className="hover:text-yellow-300">Términos y condiciones</a></p>
      </footer>
    </div>
  );
}

export default Menu;
