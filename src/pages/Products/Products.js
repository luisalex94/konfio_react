import React from 'react';
import './Products.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useNavigate } from 'react-router-dom';

function Products() {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  }

  return (

    <div className="products-services">
      <div className="products-header-content">
        <nav>
          <div className="columns">
            <div className="spacer"></div>
            <button onClick={handleBack} className='back-button'>Regresar</button>
            <h1 className='head-text'>Productos y Servicios</h1>
            <div className="spacer"></div>
          </div>
        </nav>
        <img src={konfioLogo} alt="Konfio Logo" className="konfio-logo" />

      </div>

      <div className="grid-container">
        <div className="product-box">
          <h2>Prestamos empresariales</h2>
          <p>Prespuesto para tus grandes ideas.</p>
        </div>
        <div className="product-box">
          <h2>Micropréstamos</h2>
          <p>Préstamos pequeños para quienes apenas comienzan.</p>
        </div>
        <div className="product-box">
          <h2>Hipotecas empresariales</h2>
          <p>Integramos las hipotecas con productos bancarios para una máxima flexibilidad</p>
        </div>
        <div className="product-box">
          <h2>Terminales y otros</h2>
          <p>Por que lo pequeño no es lo menos importante, las terminales y otros servicios te dan ofrecen seriedad y seguridad ante tus clientes.</p>
        </div>
      </div>
    </div>
  );
}

export default Products;
