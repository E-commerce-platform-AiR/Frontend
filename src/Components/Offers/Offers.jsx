import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Offers.css';
import { CartContext } from '../../CartContext'; // Importuj CartContext
const Offers = () => {
  const [categories, setCategories] = useState([{id: "", name: "Category"}]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offers, setOffers] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');
  const { totalCartItems, setTotalCartItems } = useContext(CartContext); // Użyj CartContext

  useEffect(() => {
    fetch('http://localhost:5047/categories')
      .then(response => response.json())
      .then(data => setCategories([{id: "", name: "Category"}, ...data]));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:5047/category/${selectedCategory}/offers`)
        .then(response => response.json())
        .then(data => setOffers(data));
    } else {
      fetch('http://localhost:5047/offers')
        .then(response => response.json())
        .then(data => setOffers(data));
    }
  }, [selectedCategory]);

  const changeHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const addToCart = (event, offerId) => {
    event.stopPropagation();
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
    <div className='offers'>
      <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={selectedCategory} onChange={changeHandler} name="category" className='addproduct-selector'>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <h2>Offers</h2>
        <div className='offers-item'>
          {offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <Link to={`/offers/${offer.id}?userId=${userId}`} className="offer-link">
                <img src={offer.logo} alt={offer.title} className="offer-image" />
                <div className="offer-details">
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                  <p className="price">{offer.price} zł</p>
                </div>
              </Link>
              <button className='addToCartMain-button' onClick={(event) => addToCart(event, offer.id)}>Add to cart</button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Offers;
