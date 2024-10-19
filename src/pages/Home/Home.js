import React from 'react';
import './Home.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      account: account,
      password: password,
    };

    try {
      const response = await axios.post('https://xouhn8vhoh.execute-api.us-east-1.amazonaws.com/prod/sign-in', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  }

  const handleInputChange = (e) => {
    setAccount(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí se debería hacer la petición al backend para validar el usuario
    // y redirigir a la página de productos
    console.log('Ingresar');
    console.log('username', account);
    console.log('password', password);
  }

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
              <div onClick={handleClick} className="background-box-001">

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
                <input type="text" id="username" name="username" required placeholder='Usuario' value={account} onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <input type="password" id="password" name="password" required placeholder='Contraseña' value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit" onClick={handleSubmit} >Ingresar</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;