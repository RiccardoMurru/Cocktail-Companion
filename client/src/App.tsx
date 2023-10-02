import { useState } from 'react';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import './styles/App.css';
import Favourites from './components/Favourites';
import { User } from './interfaces/User';
import Register from './components/Register';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom'; 


function App() {
  const [page, setPage] = useState<string>('search');
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
    favourites: [],
    ingredients: [],
  });

  // if (page === 'search')
  //   return (
  //     <SearchPage
  //       className='list-page'
  //       user={user}
  //       setUser={setUser}
  //       setPage={setPage}
  //       page={page}></SearchPage>
  //   );
  // if (page === 'favourites')
  //   return (
  //     <Favourites
  //       className='list-page'
  //       user={user}
  //       setUser={setUser}
  //       page={page}
  //       setPage={setPage}
  //     />
  //   );
  // if (page === 'login')
  //   return (
  //     <Login 
  //     className='login-page' 
  //     user={user}
  //     setUser={setUser}
  //     page={page}
  //     setPage={setPage}></Login>
  //   );
  // if (page ==='register')
  //   return (
  //     <Register
  //       className='register-page'
  //       user={user}
  //       setUser={setUser}
  //       page={page}
  //       setPage={setPage}></Register>
  //   )
return (
<Router>
  <div className='App'>
    <Routes>
      <Route
        path='/'
        element={<SearchPage className='list-page' page='search' setPage={setPage} user={user} setUser={setUser}  />}
      />
      <Route
        path='/favourites'
        element={<Favourites user={user} setUser={setUser} className='list-page'  page='favourites' setPage={setPage}/>}
      />
      <Route
        path='/login'
        element={<Login className='login-page'  user={user} setUser={setUser}  page='login' setPage={setPage} />}
      />
      <Route
        path='/register'
        element={<Register className='register-page' user={user} setUser={setUser} page='register' setPage={setPage}/>}
      />
    </Routes>
  </div>
</Router>)
  
}

export default App;
