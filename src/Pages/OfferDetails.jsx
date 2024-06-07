import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './CSS/OfferDetails.css';
import { CartContext } from '../CartContext'; // Importuj CartContext

const OfferDetails = () => {
  const { offerId } = useParams();
  const location = useLocation(); // Dodaj tę linię
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const [offer, setOffer] = useState(null);
  const [seller, setSeller] = useState(null);
  const { totalCartItems, setTotalCartItems } = useContext(CartContext); // Użyj CartContext

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5047/offers/${offerId}`);
      const data = await response.json();
      setOffer(data);

      const userResponse = await fetch(`http://localhost:5284/users/${data.createdBy}`);
      const userData = await userResponse.json();
      setSeller(userData.name);
    };

    fetchData();
  }, [offerId]);

  const addToCart = () => {
    fetch(`http://localhost:5252/cart/${userId}?offerId=${offerId}`, {
      method: 'PATCH',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Po dodaniu produktu do koszyka, wykonaj kolejne żądanie GET, aby zaktualizować liczbę produktów w koszyku
      fetch(`http://localhost:5252/cart/items/${userId}`)
        .then(response => response.json())
        .then(data => {
          // Zakładamy, że endpoint zwraca liczbę produktów w koszyku
          if (typeof data === 'number') {
            setTotalCartItems(data);
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className='offer-details-page'>
      {offer ? (
        <>
          <img src={offer.logo} alt={offer.title} />
          <h2>{offer.title}</h2>
          <p>{offer.description}</p>
          <p>Price: {offer.price} zł</p>
          <p>Author: {seller}</p>
          <p>Creation: {new Date(offer.createdAt).toLocaleDateString()}</p>
          <button className='addToCart-button' onClick={addToCart}>Add to cart</button>
        </>
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
  )
}

export default OfferDetails;
