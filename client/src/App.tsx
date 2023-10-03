import { useState } from 'react';

import { AuthProvider } from './context/authContext';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Register from './components/Register';
import './styles/App.css';

function App() {
  const [page, setPage] = useState<string>('search');

  return (
    <AuthProvider>
      {page === 'search' && (
        <SearchPage page='' className='list-page' setPage={setPage} />
      )}
      {page === 'favourites' && (
        <Favourites className='list-page' page={page} setPage={setPage} />
      )}
      {page === 'login' && (
        <Login page={page} className='login-page' setPage={setPage} />
      )}
      {page === 'register' && (
        <Register className='register-page' page={page} setPage={setPage} />
      )}
    </AuthProvider>
  );
}

export default App;
