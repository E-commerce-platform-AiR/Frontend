import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CSS/OfferDetails.css';

const OfferDetails = () => {
  const { offerId } = useParams();
  const [offer, setOffer] = useState(null);
  const [seller, setSeller] = useState(null);

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

  return (
    <div className='offer-details-page'>
      {offer ? (
        <>
          <img src={offer.logo} alt={offer.title} />
          <h2>{offer.title}</h2>
          {/* <p>Details</p> */}
          <p>{offer.description}</p>
          <p>Price: {offer.price} zł</p>
          <p>Author: {seller}</p>
          <p>Creation: {new Date(offer.createdAt).toLocaleDateString()}</p>
          <button className='addToCart-button'>Add to cart</button>
        </>
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
  )
}

export default OfferDetails;
