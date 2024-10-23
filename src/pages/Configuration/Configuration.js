import React from 'react';
import { Link } from 'react-router-dom';
import './Configuration.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useState } from 'react';
import axios from 'axios';
import { json, useLocation } from 'react-router-dom';

const Configuration = () => {
    const location = useLocation();
    const { userData } = location.state || {};

    const [name, setName] = useState(userData.name);
    const [address, setAddress] = useState(userData.address);
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');

    const [loadingChangeSettings, setLoadingChangeSettings] = useState(false);
    const [loadingChangePassword, setLoadingChangePassword] = useState(false);

    const hanldeChangeConfiguration = async (event) => {

        event.preventDefault();

        const payload = {
            account: userData.account,
            name: name,
            address: address,
        };

        setLoadingChangeSettings(true);

        try {
            const response = await axios.post('https://xouhn8vhoh.execute-api.us-east-1.amazonaws.com/prod/change-info', payload, {
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
            setLoadingChangeSettings(false);
        }
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const payload = {
            account: userData.account,
            password: old_password,
            new_password: new_password
        };

        setLoadingChangePassword(true);

        try {
            const response = await axios.post('https://xouhn8vhoh.execute-api.us-east-1.amazonaws.com/prod/change-password', payload, {
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
        }
    }


    return (
        <>
            <header className="configuration-app-header">
                <img src={konfioLogo} alt="Logo" className="configuration-logo-top-right" />
            </header>

            <div className="configuration-create-user-container">
                <form className="configuration-create-user-form">
                    <h2>Configuración de datos</h2>
                    <label>
                        <input type="text" name="name" placeholder='Nombre' required value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        <input type="text" name="address" placeholder='Dirección' required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </label>
                    <button type="submit" onClick={hanldeChangeConfiguration}>{loadingChangeSettings ? 'Cargando...' : 'Cambiar datos'}</button>
                    <hr></hr>
                    <h2>Cambio de contraseña</h2>
                    <label>
                        <input type="password" name="old_password" required placeholder='Contraseña anterior' value={old_password} onChange={(e) => setOldPassword(e.target.value)} />
                    </label>
                    <label>
                        <input type="password" name="new_password" placeholder='Nueva contraseña' required value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
                    </label>
                    <button type="submit" onClick={handleChangePassword}>{loadingChangePassword ? 'Cargando...' : 'Cambiar contraseña'}</button>
                </form>
            </div>
            <div className="welcome-welcome-footer">
                <div>© Copyright The Konfio Company</div>
                <div>|</div>
                <div>Privacy Policy</div>
                <div>|</div>
                <div>Terms of Use</div>
            </div>
        </>
    );
};

export default Configuration;