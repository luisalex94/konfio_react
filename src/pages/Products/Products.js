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

    <div className="products-products-services">
      <div className="products-header-content">
        <nav>
          <div className="products-columns">
            <div className="products-spacer"></div>
            <h1 className="products-head-text">Productos y Servicios</h1>
            <div className="products-spacer"></div>
          </div>
        </nav>
        <img src={konfioLogo} alt="Konfio Logo" className="products-konfio-logo" />

      </div>

      <div className="products-grid-container">
        <div className="products-product-box-01">
          <h2>Prestamos empresariales</h2>
          <p>Prespuesto para tus grandes ideas.</p>
        </div>
        <div className="products-product-box-02">
          <h2>Micropréstamos</h2>
          <p>Préstamos pequeños para quienes apenas comienzan.</p>
        </div>
        <div className="products-product-box-03">
          <h2>Hipotecas empresariales</h2>
          <p>Integramos las hipotecas con productos bancarios para una máxima flexibilidad</p>
        </div>
        <div className="products-product-box-04">
          <h2>Terminales y otros</h2>
          <p>Por que lo pequeño no es lo menos importante, las terminales y otros servicios te dan ofrecen seriedad y seguridad ante tus clientes.</p>
        </div>
      </div>
    </div>
  );
}

export default Products;
