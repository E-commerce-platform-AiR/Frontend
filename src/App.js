import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Login from './Pages/Login';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setUserLoggedIn(loggedIn);
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    setUserLoggedIn(false);
    localStorage.setItem('userLoggedIn', 'false');
  };

  const handleBeforeUnload = () => {
    handleLogout();
    localStorage.removeItem('userId');
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar userLoggedIn={userLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Shop userLoggedIn={userLoggedIn} />} />
          <Route path='/mens' element={<ShopCategory category='men' />} />
          <Route path='/womens' element={<ShopCategory category='women' />} />
          <Route path='/kids' element={<ShopCategory category='kids' />} />
          <Route path='/accessories' element={<ShopCategory category='accessories' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          {/* Dodaj przekazywanie stanu userLoggedIn do komponentu LoginSignup */}
          <Route path='/signup' element={<LoginSignup setUserLoggedIn={(loggedIn) => {
            setUserLoggedIn(loggedIn);
            localStorage.setItem('userLoggedIn', loggedIn ? 'true' : 'false');
          }} />} />
          {/* Przekazanie stanu userLoggedIn do komponentu Login */}
          <Route path='/login' element={<Login setUserLoggedIn={(loggedIn) => {
            setUserLoggedIn(loggedIn);
            localStorage.setItem('userLoggedIn', loggedIn ? 'true' : 'false');
          }} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
