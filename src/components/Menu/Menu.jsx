import React from 'react';

class Menu extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#about">Acerca de</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
        <main>
          <section>
            <h1>Bienvenido a nuestro sitio web</h1>
            <p>Ofrecemos una variedad de servicios para satisfacer sus necesidades.</p>
            <p>Por favor, explore nuestro sitio para obtener más información.</p>
          </section>
        </main>
        <footer>
          <p>&copy; 2022 Nuestra Empresa. Todos los derechos reservados.</p>
          <p><a href="#privacy">Política de privacidad</a> | <a href="#terms">Términos y condiciones</a></p>
        </footer>
      </div>
    );
  }
}

export default Menu;
