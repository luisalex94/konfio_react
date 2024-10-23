import React from 'react';
import './Welcome.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Welcome() {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      account: account,
      password: password,
    };

    setLoading(true);

    try {
      const response = await axios.post('https://xouhn8vhoh.execute-api.us-east-1.amazonaws.com/prod/sign-in', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);
      console.log('Response data:', response.data);
      console.log('Response data[0]:', response.data.account);

      if (response.status === 200) {
        const user = response.data;
        setUserData(user);
        setError(null);

        console.log('Response - user:', user);

        navigate('/home', { state: { userData: user } });
      }


    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  const crateUser = () => {
    navigate('/create-user');
  }


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
    <div className="welcome-App">
      <header className="welcome-App-header">
        <div className="welcome-header-content">
          <button type="submit" className='welcome-main-button' onClick={crateUser} >Crear usuario</button>
          <img src={konfioLogo} alt="Konfio Logo" className="welcome-konfio-logo" />
        </div>
        <div className="welcome-circle-background"></div>
        <h1 className="welcome-text">Konfio</h1>
        <p className="welcome-subtitle">¡Donde los negocios suceden!</p>
        <p className="welcome-description">
          Konfio es una plataforma de servicios financieros que ayuda a las pequeñas <br />
          y medianas empresas a crecer y alcanzar su potencial. Desde grandes almacenes<br />
          hasta pequeñas tiendas, Konfio está aquí para ayudarte a alcanzar tus metas.
        </p>
        <div className="welcome-columns">
          <div className="welcome-columns">
            <div className="welcome-columns">
              <div onClick={handleClick} className="welcome-background-box-001">
                <p className="box-text">Productos y servicios</p>
              </div>
              <div className="welcome-spacer"></div>
              <div className="welcome-background-box-002">
                <p className="welcome-box-text">¿Quienes somos?</p>
              </div>
              <div className="welcome-spacer"></div>
              <div className="welcome-background-box-003">
                <p className="welcome-box-text">Solicita tu crédito</p>
              </div>
              <div className="welcome-spacer"></div>
              <div className="welcome-background-box-004">
                <p className="welcome-box-text">Términos y <br /> condiciones</p>
              </div>
            </div>
            <div className="welcome-columns">
              <div className="welcome-spacer-002"></div>
            </div>
          </div>
          <div className="welcome-column">
            <h2>Iniciar Sesión</h2>
            <form>
              <div className="welcome-input-group">
                <input type="text" id="username" name="username" required placeholder='Usuario 67608891' value={account} onChange={handleInputChange} />
              </div>
              <div className="welcome-input-group">
                <input type="password" id="password" name="password" required placeholder='Contraseña 123456' value={password} onChange={handlePasswordChange} />
              </div>
              {loading ? (
                <div className="welcome-loader"></div>
              ) : (<>
                <button className='welcome-main-button' type="submit" onClick={handleSubmit} >Ingresar</button>
              </>
              )}
              {error && <p className="welcome-error-message">{error}</p>} {/* Mensaje de error si es necesario */}
            </form>
          </div>
        </div>
      </header>
      <div className="welcome-welcome-footer">
        <div>© Copyright The Konfio Company</div>
        <div>|</div>
        <div>Privacy Policy</div>
        <div>|</div>
        <div>Terms of Use</div>
      </div>
    </div>
  );
}

export default Welcome;