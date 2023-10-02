import { useState } from 'react';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import './styles/App.css';
import Favourites from './components/Favourites';
import { User } from './interfaces/User';
import Register from './components/Register';

function App() {
  const [page, setPage] = useState<string>('search');
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    favourites: [],
    ingredients: [],
  });

  if (page === 'search')
    return (
      <SearchPage
        className='list-page'
        user={user}
        setUser={setUser}
        setPage={setPage}
        page={page}></SearchPage>
    );
  if (page === 'favourites')
    return (
      <Favourites
        className='list-page'
        user={user}
        setUser={setUser}
        page={page}
        setPage={setPage}
      />
    );
  if (page === 'login')
    return (
      <Login 
      className='login-page' 
      user={user}
      setUser={setUser}
      page={page}
      setPage={setPage}></Login>
    );
  if (page ==='register')
    return (
      <Register
        className='register-page'
        user={user}
        setUser={setUser}
        page={page}
        setPage={setPage}></Register>
    )
}

export default App;
