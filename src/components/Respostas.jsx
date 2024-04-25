import React from 'react'

const Respostas = ({ dados }) => {
    return (
        <div className='resposta'>
            {dados.map(data => (
                <div key={data.id} className='pessoa'>
                    <span>Nome: {data.nome}</span>
                    <span>Email: {data.email}</span>
                    <span>Carro: {data.carro}</span>
                    <span>Cor: {data.cor}</span>
                    <span>Valor: {data.valor}</span>
                </div>
            ))}
        </div>
    );
}

export default Respostas