import React from 'react';
import './App.css';
import konfioLogo from './assets/konfio_logo_cuadrado.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <nav>
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
          <div className="columns">
            <div className="columns">
              <div className="background-box-001">
                <p className="box-text">Productos y servicios</p>
              </div>
              <div className="spacer"></div>
              <div className="background-box-002">
                <p className="box-text">¿Quienes somos?</p>
              </div>
              <div className="spacer"></div>
              <div className="background-box-003">
                <p className="box-text">Solicita tu crédito</p>
              </div>
              <div className="spacer"></div>
              <div className="background-box-004">
                <p className="box-text">Términos y <br /> condiciones</p>
              </div>
            </div>
            <div className="columns">
              <div className="spacer-002"></div>
            </div>
          </div>
          <div className="column">
            <h2>Iniciar Sesión</h2>
            <form>
              <div className="input-group">
                <input type="text" id="username" name="username" required placeholder='Usuario' />
              </div>
              <div className="input-group">
                <input type="password" id="password" name="password" required placeholder='Contraseña' />
              </div>
              <button type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;