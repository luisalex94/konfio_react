import React from 'react';
import { Link } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
    return (
        <div className="create-user-container">
            <form className="create-user-form">
                <h2>Crear Usuario</h2>
                <label>
                    Nombre:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Dirección:
                    <input type="text" name="address" required />
                </label>
                <label>
                    Correo:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="password" required />
                </label>
                <div className="form-buttons">
                    <button type="submit">Crear Usuario</button>
                    <button type="button" onClick={() => window.history.back()}>Regresar</button>
                </div>
                <Link to="/terms-and-conditions">Términos y Condiciones</Link>
            </form>
        </div>
    );
};

export default CreateUser;