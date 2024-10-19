import React, { useState, useEffect } from 'react';
import axios from 'axios';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import './Home.css';
import { json, useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation(); // Hook para acceder a la información pasada
    const { userData } = location.state || {}; // Extrae userData de location.state

    console.log('userData:', userData);

    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // inicia un array vacio   
    let trans_test = [];

    console.log('userData:', userData);

    const payload = {
        account: userData.account,
    };

    useEffect(() => {
        // Función para obtener el saldo
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

        // Función para obtener los movimientos
        const fetchTransactions = async () => {
            try {
                const response = await axios.post('https://dw73vr1mj3.execute-api.us-east-1.amazonaws.com/prod/get-movements', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const movements = JSON.parse(response.data[0].movements)['movements']; // Parsea el JSON de la respuesta
                console.log('Response movements 0001:', movements);

                trans_test = movements;

                console.log('Response movements XX01: ', trans_test);

                console.log('Response movements XX02: ', trans_test[0].date);

                // imprime con un map el array de objetos
                trans_test.map((transaction, index) => {
                    console.log('Response movements XX03:', transaction);
                });

                setTransactions(movements);
                // imprime tipo de dato
                console.log('Response movements 0002:', typeof transactions);
                console.log('Response movements 0003:', transactions);

                
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }

            
        };

        fetchBalance();
        fetchTransactions();
        setLoading(false); // Simulando que ha terminado de cargar después de obtener los datos
    }, [userData]);

    // Usar useEffect para ver el valor actualizado de transactions
    useEffect(() => {
        console.log('Transactions updated:', transactions);
    }, [transactions]); // Este efecto se ejecutará cada vez que `transactions` cambie


    const handleLogout = () => {
        // Lógica de cierre de sesión
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
                    <button onClick={handleRequestCredit}>Solicitar Crédito</button>
                    <button onClick={handleSettings}>Configuración</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </header>

            <main>
                <h1>Bienvenido, {userData.name}</h1> {/* Nombre del usuario */}
                <section className="balance-section">
                    <h2>Tu saldo</h2>
                    <p>${balance}</p> {/* Saldo */}
                </section>

                <section className="transactions-section">
                    <h2>Tus movimientos</h2>
                    <ul>
                        {transactions.map((transaction, index) => (
                            <li key={index}>
                                <p>{transaction.date}: {transaction.description} - ${transaction.amount}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Home;
