import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AddProduct.css';
import upload_area from '../Assets/upload.png';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [categories, setCategories] = useState([{id: "", name: "Category"}]);
  const [statusMessage, setStatusMessage] = useState("");
  
  //zeby nowy produkt sie wpisal do database
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    description: "",
    image: "",
    userId: ""
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userIdFromQuery = params.get('userId');
    if (userIdFromQuery) {
      setProductDetails(prevDetails => ({ ...prevDetails, userId: userIdFromQuery }));
    }
  }, [location]);

  useEffect(() => {
    fetch('http://localhost:5047/categories')
      .then(response => response.json())
      .then(data => setCategories([{id: "", name: "Category"}, ...data]));
  }, []);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const addProduct = async () => {
    if (productDetails.category === "") {
      alert('Proszę wybrać kategorię');
      return;
    }
    const offer = {
      Title: productDetails.name,
      Category: parseInt(productDetails.category),
      Description: productDetails.description,
      Logo: productDetails.image,
      Price: parseFloat(productDetails.price)
    };

    const response = await fetch(`http://localhost:5047/users/${productDetails.userId}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offer)
    });

    if (response.ok) {
      setStatusMessage("Produkt dodany");
    } else {
      setStatusMessage("Wystąpił problem");
    }
  }

  return (
    <div className='add-product'>
      <div className="add-product-container">
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-description">
          <div className="addproduct-itemfield">
            <p>Description</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="addproduct-itemuri">
          <div className="addproduct-itemfield">
            <p>Image</p>
            <input value={productDetails.image} onChange={changeHandler} type="text" name="image" placeholder='Paste here' />
          </div>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className={image ? 'addproduct-thumbnail-img-large' : 'addproduct-thumbnail-img-small'} alt="" style={{ height: 'auto', opacity: image ? 1 : 0.6 }} />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={addProduct} className='addproduct-button'>ADD</button>
      </div>
    </div>
  )
}

export default AddProduct;
