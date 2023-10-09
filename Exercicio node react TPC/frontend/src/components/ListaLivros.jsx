import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './ListaLivros.css';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (showTable) {
      fetchBooks();
    }
  }, [showTable]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5005/livro');
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleEditarClick = (livro) => {
    navigate(`/editar/${livro._id}`, { state: { livro } });
  };

  const handleAdicionarClick = () => {
    navigate('/add');
  };


  const handleGetBooksClick = () => {
    setShowTable(!showTable); 
  };

  return (
    <div className="container">
      
      <button className="button" onClick={handleGetBooksClick}>Obter Livros</button>
      <div className={`fade-in ${showTable ? 'show' : ''}`}>
          <div>
          <button className="adicionar" onClick={handleAdicionarClick}>Adicionar Livros</button>
            <table className="table">
              
              <thead>
                <tr className="table">
                  <th className="table">nPaginas</th>
                  <th className="table">Autor</th>
                  <th className="table">Data de publicação</th>
                  <th className="table">Editar</th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro, index) => (
                  <tr key={index}>
                    <td className="table">{livro.nPaginas}</td>
                    <td className="table">{livro.autor}</td>
                    <td className="table">{livro.dataPublic}</td>
                    <td className="table">
                      <button className="editar" onClick={() => handleEditarClick(livro)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>
    </div>
  );
}

export default ListaLivros;
