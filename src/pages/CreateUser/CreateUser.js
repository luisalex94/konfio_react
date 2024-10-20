import React from 'react';
import { Link } from 'react-router-dom';
import './CreateUser.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleCreateUser = async (event) => {

        event.preventDefault();

        const payload = {
            name: name,
            address: address,
            user: email,
            password: password
        };

        setLoading(true);

        console.log('Payload:', payload);

        try {
            const response = await axios.post('https://xouhn8vhoh.execute-api.us-east-1.amazonaws.com/prod/sign-up', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);
            console.log('Response data:', response.data);

            if (response.status === 200) {
                console.log('Usuario creado correctamente');
                window.history.back();
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <header className="app-header">
                <img src={konfioLogo} alt="Logo" className="logo-top-right" />
            </header>

            <div className="create-user-container">
                <form className="create-user-form" onSubmit={handleCreateUser}>
                    <h2>Crear Usuario</h2>
                    <label>
                        <input type="text" name="name" placeholder='Nombre' required value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        <input type="text" name="address" placeholder='Dirección' required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <label>
                        <input type="email" name="email" required placeholder='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <input type="password" name="password" placeholder='Contraseña' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className="form-buttons" onClick={handleCreateUser}>
                        <button type="submit">{loading ? 'Cargando...' : 'Crear Usuario'}</button>
                        <button type="button" onClick={() => window.history.back()}>Regresar</button>
                    </div>
                    <Link to="/terms-and-conditions">Términos y Condiciones</Link>
                </form>
            </div>
        </>
    );
};

export default CreateUser;