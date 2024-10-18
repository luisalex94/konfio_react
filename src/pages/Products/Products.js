import React from 'react';
import './Products.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';

function Products() {
  return (

    <div className="products-services">
      <div className="header-content">
        <nav>
          <h1>Productos y Servicios</h1>
        </nav>
        <img src={konfioLogo} alt="Konfio Logo" className="konfio-logo" />

      </div>

      <div className="grid-container">
        <div className="product-box">
          <h2>Producto 1</h2>
          <p>Descripción del producto 1.</p>
        </div>
        <div className="product-box">
          <h2>Producto 2</h2>
          <p>Descripción del producto 2.</p>
        </div>
        <div className="product-box">
          <h2>Producto 3</h2>
          <p>Descripción del producto 3.</p>
        </div>
        <div className="product-box">
          <h2>Producto 4</h2>
          <p>Descripción del producto 4.</p>
        </div>
      </div>
    </div>
  );
}

export default Products;
