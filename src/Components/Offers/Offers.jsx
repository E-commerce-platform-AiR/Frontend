import React, { useState, useEffect } from 'react';
import './Offers.css';
import allProducts from '../Assets/all_products';

import Item from '../Item/Item'

const Offers = () => {
  const [categories, setCategories] = useState([{id: "", name: "Category"}]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [offers, setOffers] = useState([]);

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
  }

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
            <div key={index}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p>{offer.price} zł</p>
              <img src={offer.logo} alt={offer.title} />
            </div>
          ))}
        </div>
    </div>
  )
}

export default Offers
