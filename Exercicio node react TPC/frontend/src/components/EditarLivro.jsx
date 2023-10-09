import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './EditarLivro.css';

function EditarLivro() {
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate(); 

  const [livroEditado, setLivroEditado] = useState({
    nPaginas: '',
    autor: '',
    dataPublic: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivroEditado({ ...livroEditado, [name]: value });
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  useEffect(() => {
    if (location.state && location.state.livro) {
      const livroData = location.state.livro;
      setLivroEditado({
        nPaginas: livroData.nPaginas,
        autor: livroData.autor,
        dataPublic: livroData.dataPublic,
      });
    }
  }, [location.state]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5005/livro/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroEditado),
      });

      if (response.ok) {
        console.log("Livro updated");
      } else {
        console.error("Erro a dar update");
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="editar-livro-container">
      <div className="form-container">
        <div className="header">
          <button className="back-button" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Editar Livro</h2>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="nPaginas">Número de Páginas:</label>
            <input
              type="number"
              id="nPaginas"
              name="nPaginas"
              value={livroEditado.nPaginas}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="autor">Autor:</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={livroEditado.autor}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataPublic">Data de Publicação:</label>
            <input
              type="text"
              id="dataPublic"
              name="dataPublic"
              value={livroEditado.dataPublic}
              onChange={handleInputChange}
            />
          </div>
          <button className="save-button" type="button" onClick={handleSave}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarLivro;
