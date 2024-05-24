import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Login from './Pages/Login';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('userId');
    setUserLoggedIn(loggedIn);
    if (storedUserId) setUserId(storedUserId);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogout = () => {
    setUserLoggedIn(false);
    localStorage.setItem('userLoggedIn', 'false');
    localStorage.removeItem('userId');
    setUserId(null);
  };

  const handleBeforeUnload = () => {
    handleLogout();
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
          <Route path='/signup' element={<LoginSignup setUserLoggedIn={(loggedIn) => {
            setUserLoggedIn(loggedIn);
            localStorage.setItem('userLoggedIn', loggedIn ? 'true' : 'false');
          }} />} />
          <Route path='/login' element={<Login setUserLoggedIn={(loggedIn) => {
            setUserLoggedIn(loggedIn);
            localStorage.setItem('userLoggedIn', loggedIn ? 'true' : 'false');
            if (loggedIn) {
              const userId = // get userId after login
              setUserId(userId);
              localStorage.setItem('userId', userId);
            }
          }} />} />
          <Route path='/addproduct' element={<AddProduct userId={userId} />} />
          <Route path='/myproducts' element={<ListProduct userId={userId} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
