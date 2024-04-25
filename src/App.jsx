import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Respostas from './components/Respostas';
import './css/style.css'

const App = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const storedClientes = JSON.parse(localStorage.getItem('ClientesInLocalStorage')) || [];
        setClientes(storedClientes);
    }, []);

    const handleSubmit = (data) => {
        setClientes([...clientes, data]);
    };

    return (
        <div className='container'>
          <div className="colForm">
           <Form onSubmit={handleSubmit} />
          </div>
          <div className="col">
           {clientes.length > 0 && <Respostas dados={clientes} />}
          </div>
        </div>
    );
};

export default App

/* import { useState } from 'react'
import './css/style.css'
import Form from './components/Form'
import Respostas from './components/Respostas'

function App() {
  return (
    <div className='container'>
      <div className="colForm">
        <Form />
      </div>
      <div className="col">
        <Respostas />
      </div>
    </div>
  )
}

export default App
 */