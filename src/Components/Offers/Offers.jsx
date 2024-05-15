import React from 'react'
import './Offers.css'
import allProducts from '../Assets/all_products';

import Item from '../Item/Item'

const Offers = () => {
  return (
    <div className='offers'>
        <h2>ALL PRODUCTS</h2>
       
        <div className='offers-item'>
      {allProducts.map((item,i)=>{
        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
      })}
    </div>
    </div>
  )
}

export default Offers
