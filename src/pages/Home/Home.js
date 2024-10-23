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

        const updateUserData = async (event) => {
            const payload = {
              account: userData.account,
              password: userData.password,
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
        
                console.log('Response - user:', user);
        
                userData.name = user.name;

                navigate('/home', { state: { userData: user } });
              }

        
        
            } catch (error) {
              console.error('Error:', error);
            } finally {
              setLoading(false);
            }
          };

        updateUserData();
        fetchBalance();
        fetchTransactions();
        setLoading(false);
    }, []);

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

        navigate('/configuration', { state: { userData: userData } });
        console.log("Abriendo configuración...");
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="home-user-home">
            <header>
                <img src={konfioLogo} alt="Konfio Logo" className="home-konfio-logo" />
                <div className="home-header-buttons">
                    <button className='home-fixed-button-a' onClick={handleRequestCredit}>Solicitar Crédito</button>
                    <button className='home-fixed-button-a' onClick={handleSettings}>Configuración</button>
                    {loadingSignOut ? (
                        <div className="home-loader"></div>
                    ) : (
                        <button className='home-fixed-button-a' onClick={handleLogout}>Cerrar sesión</button>
                    )}
                </div>
            </header>
            <main>
                <h1>Bienvenido, {userData.name}</h1> {/* Nombre del usuario */}
                <section className="home-balance-section">
                    <h2>Tu saldo</h2>
                    <p>${balance.toFixed(2)}</p>
                </section>

                <section className="home-transactions-section">
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
