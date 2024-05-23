import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../Components/Hero/Hero';
import Offers from '../Components/Offers/Offers';

const Shop = ({ userLoggedIn }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  return (
    <div>
      {!userLoggedIn && <Hero />}
      <Offers />
      {userLoggedIn && <p>Welcome back, user with ID: {userId}</p>}
    </div>
  );
}

export default Shop;