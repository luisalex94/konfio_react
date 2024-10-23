import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome.js';
import Products from './pages/Products/Products.js';
import Home from './pages/Home/Home.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import Configuration from './pages/Configuration/Configuration.js';
import CreditApplication from './pages/CreditApplication/CreditApplication.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/products" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/credit-application" element={<CreditApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
