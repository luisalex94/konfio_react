import React from 'react';
import './App.css';
import konfioLogo from './assets/konfio_logo_cuadrado.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <nav>
            <ul>
              <li><a href="#terms">Términos y Condiciones</a></li>
              <li><a href="#about">Quiénes Somos</a></li>
              <li><a href="#products">Productos y Servicios</a></li>
              <li><a href="#credit">Solicitar Crédito</a></li>
            </ul>
          </nav>
          <img src={konfioLogo} alt="Konfio Logo" className="konfio-logo" />
        </div>
        <div className="circle-background"></div>
        <h1 className="welcome-text">Konfio</h1>
        <p className="welcome-subtitle">¡Donde los negocios suceden!</p>
        <p className="welcome-description">
          Konfio es una plataforma de servicios financieros que ayuda a las pequeñas <br />
          y medianas empresas a crecer y alcanzar su potencial. Desde grandes almacenes<br />
          hasta pequeñas tiendas, Konfio está aquí para ayudarte a alcanzar tus metas.
        </p>
        <div className="columns">
          <div className="column">
            <p>Texto en la columna izquierda</p>
          </div>
          <div className="column">
            <p>Texto en la columna derecha</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;