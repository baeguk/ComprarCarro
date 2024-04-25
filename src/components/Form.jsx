import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const Form = ({ onSubmit }) => {
    const [nome, setNome] = useState(localStorage.getItem('NomeInLocalStorage') || '');
    const [email, setEmail] = useState(localStorage.getItem('EmailInLocalStorage') || '');
    const [carro, setCarro] = useState(localStorage.getItem('CarroInLocalStorage') || '');
    const [cor, setCor] = useState(localStorage.getItem('CorInLocalStorage') || '');
    const [valor, setValor] = useState(localStorage.getItem('ValorInLocalStorage') || '');
    const [total, setTotal] = useState(0)
    const [clientes, setClients] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [totalPreto, setTotalPreto] = useState(0)
    const [totalBranco, setTotalBranco] = useState(0)
    const [totalValores, setTotalValores] = useState(0)

    useEffect(() => {
        const storedClientes = JSON.parse(localStorage.getItem('ClientesInLocalStorage'));
        if (storedClientes) {
            setClients(storedClientes);
            setTotal(storedClientes.length);
            setNome('');
            setEmail('');
            setCarro('');
            setCor('');
            setValor('');
            const carroPreto = storedClientes.filter(cliente => cliente.cor.toUpperCase() === 'PRETO').length;
            setTotalPreto(carroPreto);

            const carroBranco = storedClientes.filter(cliente => cliente.cor.toUpperCase() === 'BRANCO').length;
            setTotalBranco(carroBranco);

            let TotalValor = 0 

            storedClientes.forEach(
                cliente => {
                    const valorCarros = parseFloat(cliente.valor)
                    console.log(valorCarros)
                    TotalValor += valorCarros
                }
            )
            setTotalValores(TotalValor)

        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nome || !email || !carro || !cor || !valor) {
            return alert('Preencha todos os campos');
        }

        const validCarros = ['GOL', 'PALIO', 'AZERA', 'SONATA', 'FERRARI', 'LANCER']
        if (!validCarros.includes(carro.toUpperCase())) {
            return alert('Carro invalido, entre com gol, palio, azera, sonata, ferrari ou lancer')
        }

        const validCor = ['AZUL', 'VERMELHO', 'BRANCO', 'PRATA', 'PRETO']
        if (!validCor.includes(cor.toUpperCase())) {
            return alert('Cor invalida, entre com azul, vermelho, branco, prata ou preto')
        }

        const data = {
            id: String(new Date().getTime()),
            nome,
            email,
            carro,
            cor,
            valor
        };
        
        const updatedClientes = [...clientes, data];
        localStorage.setItem('ClientesInLocalStorage', JSON.stringify(updatedClientes));

        setClients(updatedClientes);
        setTotal(updatedClientes.length);

        const carroPreto = updatedClientes.filter(cliente => cliente.cor.toUpperCase() === 'PRETO').length;
        setTotalPreto(carroPreto);

        const carroBranco = updatedClientes.filter(cliente => cliente.cor.toUpperCase() === 'BRANCO').length;
        setTotalBranco(carroBranco);

        let TotalValor = 0 

        updatedClientes.forEach(
            cliente => {
                const valorCarros = parseFloat(cliente.valor)
                console.log(valorCarros)
                TotalValor += valorCarros
            }
        )
        setTotalValores(TotalValor)

        onSubmit(data);
        setNome('');
        setEmail('');
        setCarro('');
        setCor('');
        setValor('');

    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className='formulario'>
            
            <form onSubmit={handleSubmit}>
                <h2>Formulário para compra de carro</h2>
                <input 
                    type="text" 
                    placeholder='Insira seu nome' 
                    value={nome}
                    onChange={(event) => {
                        setNome(event.target.value);
                        localStorage.setItem('NomeInLocalStorage', event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Insira seu email' 
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        localStorage.setItem('EmailInLocalStorage', event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Insira seu carro' 
                    value={carro}
                    onChange={(event) => {
                        setCarro(event.target.value);
                        localStorage.setItem('CarroInLocalStorage', event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Insira a cor do seu carro' 
                    value={cor}
                    onChange={(event) => {
                        setCor(event.target.value);
                        localStorage.setItem('CorInLocalStorage', event.target.value);
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Insira quanto custou seu carro' 
                    value={valor}
                    onChange={(event) => {
                        setValor(event.target.value);
                        localStorage.setItem('ValorInLocalStorage', event.target.value);
                    }}
                />
                <button className='button' type="submit">Enviar</button>
            </form>
            <button className='button' onClick={openModal} >Totais</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Example Modal"
            >
                <div className="titulo">
                    <h2>Total</h2>
                    <button onClick={closeModal}>X</button>
                </div>
                <div className='totais'>
                    <p>Total de clientes: {total}</p>
                    <p>Total de carros pretos: {totalPreto}</p>
                    <p>Total de carros brancos: {totalBranco}</p>
                    <p>Total de valores dos carros: {totalValores}</p>
                </div>
                
            </Modal>
        </div>
    );
};

export default Form;


/* import React, { useState } from 'react'
import Respostas from './Respostas'

const Form = () => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [carro, setCarro] = useState('')
    const [cor, setCor] = useState('')
    const [valor, setValor] = useState('')
    const [dados, setDados] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (!nome || !email || !carro || !cor || !valor) {
            return alert('Preencha todos os campos')
        }

        const data = {
            id: String(new Date().getTime()),
            nome,
            email,
            carro,
            cor,
            valor
        }

        setDados([...dados, data])
        console.log(dados)
        setNome('')
        setCarro('')
        setEmail('')
        setCor('')
        setValor('')
    }

  return (
    <div className='formulario'>
        <h2>Formulário para compra de carro</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder='Insira seu nome' 
            value={nome}
            onChange={event => setNome(event.target.value)}/>
            <input 
            type="text" 
            placeholder='Insira seu email' 
            value={email}
            onChange={event => setEmail(event.target.value)}/>
            <input 
            type="text" 
            placeholder='Insira seu carro' 
            value={carro}
            onChange={event => setCarro(event.target.value)}/>
            <input 
            type="text" 
            placeholder='Insira a cor do seu carro' 
            value={cor}
            onChange={event => setCor(event.target.value)}/>
            <input 
            type="text" 
            placeholder='Insira quanto custou seu carro' 
            value={valor}
            onChange={event => setValor(event.target.value)}/>
        </form>
        <button className='button' type='submit'>Enviar</button>
        {dados.length > 0 && <Respostas dados={dados} />}
    </div>
  )
}

export default Form */