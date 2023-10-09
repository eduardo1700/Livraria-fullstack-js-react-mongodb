import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AdicionarLivro.css'
function LivroAddedPopup() {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Livro adicionado</h3>
        
      </div>
    </div>
  );
}

function AdicionarLivro() {
  const navigate = useNavigate();

  const [livro, setLivro] = useState({
    nPaginas: '',
    autor: '',
    dataPublic: '',
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivro({ ...livro, [name]: value });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddLivro = async () => {
    try {
      const response = await fetch('http://localhost:5005/livro/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
      });

      if (response.ok) {
        setShowSuccessPopup(true);
      } else {
        console.error('Error adding livro');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="adicionar-livro-container">
      <div className="form-container">
        <div className="header">
          <button className="back-button" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h2>Adicionar Livro</h2>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="nPaginas">Número de Páginas:</label>
            <input
              type="number"
              id="nPaginas"
              name="nPaginas"
              value={livro.nPaginas}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="autor">Autor:</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={livro.autor}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataPublic">Data de Publicação:</label>
            <input
              type="text"
              id="dataPublic"
              name="dataPublic"
              value={livro.dataPublic}
              onChange={handleInputChange}
            />
          </div>
          <button className="add-button" type="button" onClick={handleAddLivro}>
            Adicionar Livro
          </button>
        </form>
      </div>
      {showSuccessPopup && <LivroAddedPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default AdicionarLivro;
