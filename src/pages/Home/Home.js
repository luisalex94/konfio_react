import React, { useState, useEffect } from 'react';
import axios from 'axios';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import './Home.css';
import { json, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
    const location = useLocation(); // Hook para acceder a la información pasada
    const { userData } = location.state || {}; // Extrae userData de location.state
    const [balance, setBalance] = useState(0.0);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSignOut, setLoadingSignOut] = useState(false);

    const navigate = useNavigate();

    const payload = {
        account: userData.account,
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.post('https://dw73vr1mj3.execute-api.us-east-1.amazonaws.com/prod/get-balance', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response balance:', response.data);
                setBalance(response.data);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await axios.post('https://dw73vr1mj3.execute-api.us-east-1.amazonaws.com/prod/get-movements', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const movements = response.data.movements;

                movements.forEach((movement) => {
                    if (movement.type === 'deposit') {
                        movement.type = 'Depósito';
                    } else if (movement.type === 'charge') {
                        movement.type = 'Cargo';
                    }
                    if (movement.amount < 0) {
                        movement.amount = -movement.amount;
                    }
                });

                setTransactions(movements);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }


        };

        fetchBalance();
        fetchTransactions();
        setLoading(false); // Simulando que ha terminado de cargar después de obtener los datos
    }, [userData]);

    const handleLogout = async (event) => {
        event.preventDefault();
        // setLoadingSignOut(true)
        setTimeout(() => {
            setLoadingSignOut(false);
        }, 2000)
        navigate('/');
        console.log("Cerrando sesión...");
    };

    const handleRequestCredit = () => {
        // Lógica para solicitar crédito
        console.log("Solicitando crédito...");
    };

    const handleSettings = () => {
        // Lógica para ir a la configuración
        console.log("Abriendo configuración...");
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-home">
            <header>
                <img src={konfioLogo} alt="Konfio Logo" className="konfio-logo" />
                <div className="header-buttons">
                    <button className='fixed-button-a' onClick={handleRequestCredit}>Solicitar Crédito</button>
                    <button className='fixed-button-a' onClick={handleSettings}>Configuración</button>
                    {loadingSignOut ? (
                        <div className="loader"></div>
                    ) : (
                        <button className='fixed-button-a' onClick={handleLogout}>Cerrar sesión</button>
                    )}
                </div>
            </header>
            <main>
                <h1>Bienvenido, {userData.name}</h1> {/* Nombre del usuario */}
                <section className="balance-section">
                    <h2>Tu saldo</h2>
                    <p>${balance.toFixed(2)}</p>
                </section>

                <section className="transactions-section">
                    <h2>Tus movimientos</h2>
                    <ul>
                        {transactions.slice().reverse().map((transaction, index) => (
                            <li
                                key={index}
                                className={transaction.type === 'Depósito' ? 'deposit' : 'charge'}
                            >
                                <p>{transaction.concept}: ${transaction.amount.toFixed(2)} - {transaction.date}</p>
                                <p>{transaction.type} - {transaction.id}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Home;
