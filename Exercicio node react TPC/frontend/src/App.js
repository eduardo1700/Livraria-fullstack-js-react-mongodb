import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaLivros from './components/ListaLivros';
import EditarLivro from './components/EditarLivro';
import AdicionarLivro from './components/AdicionarLivro'

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1></h1>
      </div>
      <Router>
        <Routes>
          <Route path="/editar/:id" element={<EditarLivro />} />
          <Route path="/" element={<ListaLivros />} />
          <Route path="/add" element={<AdicionarLivro />} />
        </Routes>
      </Router>
    </div>
  );
}

const root = createRoot(document.getElementById('root')); // Create a root using createRoot
root.render(<App />); // Render your App component using the root

export default App;
