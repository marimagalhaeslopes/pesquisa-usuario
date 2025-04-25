import { useState } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarPerfil = async () => {
    if (!username) return;
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error('Usuário não encontrado');
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="search-box text-center w-100" style={{ maxWidth: '600px' }}>
        <div className="logo-text mb-4">
          <i className="bi bi-github me-2 fs-2"></i>
          <span>Perfil </span>
          <strong>GitHub</strong>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Digite um usuário do Github"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarPerfil()}
          />
          <button className="btn btn-primary" onClick={buscarPerfil}>
            <i className="bi bi-search"></i>
          </button>
        </div>

        {loading && <div className="mt-4 text-secondary">Carregando...</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {userData && (
          <div className="card bg-dark text-light mt-4">
            <div className="card-body text-center">
              <img
                src={userData.avatar_url}
                alt="Avatar"
                className="rounded-circle mb-3"
                width={100}
              />
              <h5>{userData.name || 'Sem nome'}</h5>
              <p>{userData.bio || 'Sem bio disponível'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
