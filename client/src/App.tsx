import { useState } from 'react';

import { AuthProvider } from './context/authContext';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import Favourites from './components/Favourites';
import Register from './components/Register';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import MostLikedDrinks from './components/MostLikedDrinks';

function App() {
  const [page, setPage] = useState<string>('search');

  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route
              path='/'
              element={
                <SearchPage
                  className='list-page'
                  page='search'
                  setPage={setPage}
                />
              }
            />
            <Route
              path='/favourites'
              element={
                <Favourites
                  className='list-page'
                  page='favourites'
                  setPage={setPage}
                />
              }
            />
            <Route
              path='/login'
              element={
                <Login
                  className='login-page'
                  page='login'
                  setPage={setPage}
                />
              }
            />
            <Route
              path='/register'
              element={
                <Register
                  className='register-page'
                  page='register'
                  setPage={setPage}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
