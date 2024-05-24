import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AddProduct.css';
import upload_area from '../Assets/upload.png';

const AddProduct = ({ userId }) => {
  const [image, setImage] = useState(false);
  
  //zeby nowy produkt sie wpisal do database
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    price: "",
    userId: userId || ""
  });

  const location = useLocation();

  useEffect(() => {
    if (userId) {
      setProductDetails(prevDetails => ({ ...prevDetails, userId }));
    } else {
      const params = new URLSearchParams(location.search);
      const userIdFromQuery = params.get('userId');
      if (userIdFromQuery) {
        setProductDetails(prevDetails => ({ ...prevDetails, userId: userIdFromQuery }));
      }
    }
  }, [location, userId]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const Add_Product = async () => {
    console.log(productDetails);
    //gdy klikamy add dane sa przesylane do backendu
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product Added") : alert("Failed");
      });
    }
  }

  return (
    <div className='add-product'>
      <div className="add-product-container">
        <div className="addproduct-itemfield">
          <p>Product title</p>
          <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
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
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image ? URL.createObjectURL(image) : upload_area} className={image ? 'addproduct-thumbnail-img-large' : 'addproduct-thumbnail-img-small'} alt="" style={{ height: 'auto', opacity: image ? 1 : 0.6 }} />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={Add_Product} className='addproduct-button'>ADD</button>
      </div>
    </div>
  )
}

export default AddProduct;
