import React from 'react';
import { Link } from 'react-router-dom';
import './CreditApplication.css';
import konfioLogo from '../../assets/konfio_logo_cuadrado.png';
import { useState } from 'react';
import axios from 'axios';
import { json, useLocation } from 'react-router-dom';
import { FaBeer } from 'react-icons/fa';
import { CiCircleCheck, CiCircleMore, CiClock1 } from "react-icons/ci";

const CreditApplication = () => {
    const location = useLocation();
    const { userData } = location.state || {};

    const [personAge, setPersonAge] = useState(userData.age);
    const [personIncome, setPersonIncome] = useState(userData.income);
    const [personOwnership, setPersonOwnership] = useState(userData.ownership);
    const [loanLoanObjective, setPersonLoanObjective] = useState(userData.loanObjective);
    const [loanLoanAmount, setPersonLoanAmount] = useState(userData.loanAmount);
    const [loanInterestRate, setPersonInterestRate] = useState(userData.interestRate);
    const [loanPercentIncome, setPersonPercentIncome] = useState(userData.percentIncome);

    const [loadingLoan, setLoadingLoan] = useState(false);

    const [loadingStep1, setLoadingStep1] = useState(false);
    const [loadingStep2, setLoadingStep2] = useState(false);
    const [loadingStep3, setLoadingStep3] = useState(false);

    const [loadingInterStep1, setLoadingInterStep1] = useState(false);
    const [loadingInterStep2, setLoadingInterStep2] = useState(false);
    const [loadingInterStep3, setLoadingInterStep3] = useState(false);

    const hanldeChangeConfiguration = async (event) => {

        event.preventDefault();

        const payload = {
            account: userData.account,
        };

        setLoadingLoan(true);

        try {

            setLoadingInterStep1(true);

            // timer to simulate the process
            setTimeout(() => {
                setLoadingStep1(true);
                setLoadingInterStep2(true);
                console.log('step1:', loadingStep1);
            }, 1000);
            setTimeout(() => {
                setLoadingStep2(true);
                setLoadingInterStep3(true);
                console.log('step2:', loadingStep2);
            }, 2000);
            setTimeout(() => {
                setLoadingStep3(true);
                console.log('step3:', loadingStep3);
            }, 3000);


            const payload = {
                account: userData.account,
                concept: 'Solicitud de crédito',
                amount: loanLoanAmount.toISOString(),
                date: new Date().toISOString(),
            }

            const response = await axios.post('https://dw73vr1mj3.execute-api.us-east-1.amazonaws.com/prod/deposit-movement', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);
            console.log('Response data:', response.data);

            if (response.status === 200) {
                console.log('Crédito depositado correctamente');


                window.history.back();
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingLoan(false);
        }
    }


    return (
        <>
            <header className="creditapplication-app-header">
                <img src={konfioLogo} alt="Logo" className="creditapplication-logo-top-right" />
            </header>

            <div className="creditapplication-create-user-container">


                <form className="creditapplication-steps-form">
                    <label className='creditapplication-step-card' >
                        <p className='.creditapplication-steps-container-p'> Procesando información </p>
                        {loadingStep1 ? <CiCircleCheck size={40} /> : loadingInterStep1 ? <CiClock1 size={40} /> : <CiCircleMore size={40} />}
                    </label>

                    <label className='creditapplication-step-card' >
                        <p className='.creditapplication-steps-container-p'> Procesando solicitud </p>
                        {loadingStep2 ? <CiCircleCheck size={40} /> : loadingInterStep2 ? <CiClock1 size={40} /> : <CiCircleMore size={40} />}
                    </label>

                    <label className='creditapplication-step-card' >
                        <p className='.creditapplication-steps-container-p'> Depositando crédito </p>
                        {loadingStep3 ? <CiCircleCheck size={40} /> : loadingInterStep3 ? <CiClock1 size={40} /> : <CiCircleMore size={40} />}
                    </label>


                </form>
                <form className="creditapplication-create-user-form">
                    <h2>Solicitud de crédito</h2>
                    <label>
                        <input
                            type="text"
                            placeholder='Edad del solicitante'
                            required value={personAge}
                            onChange={(e) => setPersonAge(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Ingreso mensual'
                            required value={personIncome}
                            onChange={(e) => setPersonIncome(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Propiedad'
                            required value={personOwnership}
                            onChange={(e) => setPersonOwnership(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Objetivo del crédito'
                            required value={loanLoanObjective}
                            onChange={(e) => setPersonLoanObjective(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Monto del crédito'
                            required value={loanLoanAmount}
                            onChange={(e) => setPersonLoanAmount(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Tasa de interés'
                            required value={loanInterestRate}
                            onChange={(e) => setPersonInterestRate(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder='Porcentaje de ingresos'
                            required value={loanPercentIncome}
                            onChange={(e) => setPersonPercentIncome(e.target.value)}
                        />
                    </label>



                    <button type="submit" onClick={hanldeChangeConfiguration}>{loadingLoan ? 'Solicitando...' : 'Solicitar crédito'}</button>
                </form>
            </div>
            <div className="welcome-welcome-footer">
                <div>© Copyright The Konfio Foundation</div>
                <div>|</div>
                <div>Privacy Policy</div>
                <div>|</div>
                <div>Terms of Use</div>
            </div>
        </>
    );
};

export default CreditApplication;