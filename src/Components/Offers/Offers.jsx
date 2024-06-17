import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Offers.css';
import { CartContext } from '../../CartContext'; // Importuj CartContext

const Offers = () => {
  const [categories, setCategories] = useState([{ id: "", name: "All Categories" }]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Dodano stan dla wyszukiwania
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');
  const { setTotalCartItems } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:5047/categories')
      .then(response => response.json())
      .then(data => setCategories([{ id: "", name: "All Categories" }, ...data]));
  }, []);

  useEffect(() => {
    const endpoint = selectedCategory ? `http://localhost:5047/category/${selectedCategory}/offers` : 'http://localhost:5047/offers';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setOffers(data));
  }, [selectedCategory]);

  useEffect(() => {
    // Zaktualizuj oferty na podstawie wyszukiwania
    fetch('http://localhost:5047/offers')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(offer => offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || offer.description.toLowerCase().includes(searchTerm.toLowerCase()));
        setOffers(filteredData);
      });
  }, [searchTerm]);

  const changeHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (event, offerId) => {
    event.stopPropagation();
    fetch(`http://localhost:5252/cart/${userId}?offerId=${offerId}`, {
      method: 'PATCH',
    })
      .then(() => {
        // Po dodaniu produktu do koszyka, wykonaj kolejne żądanie GET, aby zaktualizować liczbę produktów w koszyku
        fetch(`http://localhost:5252/cart/items/${userId}`)
          .then(response => response.json())
          .then(data => setTotalCartItems(data))
          .catch((error) => console.error('Error:', error));
      })
      .catch((error) => console.error('Error:', error));
  };

  return(
    <div className='offers'>
      <div className="offers-search">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearchChange}
          className="offers-search-input"
        />
        <div className="addproduct-itemfield">
          <select value={selectedCategory} onChange={changeHandler} name="category" className='addproduct-selector'>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
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
  );
}


export default Offers;
