import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";

const Respostas = ({ dados, onDelete }) => {
    return (
        <div className='resposta'>
            {dados.map(data => (
                    <div key={data.id} className='pessoa'>
                        <div className="span">
                            <span>Nome: {data.nome}</span>
                            <span>Email: {data.email}</span>
                            <span>Carro: {data.carro}</span>
                            <span>Cor: {data.cor}</span>
                            <span>Valor: {data.valor}</span>
                        </div>
                        <div className="botao">
                            <button onClick={() => onDelete(data.id)}><FaRegTrashAlt /></button>
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default Respostas