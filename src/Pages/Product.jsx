import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';


const Product = () => {
  const {allProducts}= useContext(ShopContext)
  const {productId} = useParams();
  const product = allProducts.find((e)=> e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product}/>
      

    </div>
  )
}

export default Product
