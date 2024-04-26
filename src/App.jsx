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
    
    const handleDelete = (clientId) => {
      const updatedClient = clientes.filter(cliente => cliente.id !== clientId)
      localStorage.setItem('ClientesInLocalStorage', JSON.stringify(updatedClient))
      setClientes(updatedClient)
    }

    return (
        <div className='container'>
          <div className="colForm">
           <Form onSubmit={handleSubmit} />
          </div>
          <div className="col">
           {clientes.length > 0 && <Respostas dados={clientes} onDelete={handleDelete}/>}
          </div>
        </div>
    );
};

export default App