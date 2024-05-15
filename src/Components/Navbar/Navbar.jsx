import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo3.png'
import cart_icon from '../Assets/shopping-cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {

  const [menu,setMenu] = useState('shop');
const {getTotalCartItems} =useContext(ShopContext);
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" style={{ width: '130px', height: 'auto' }} />
      </div>
      <ul className='nav-menu'>
        <li onClick={()=>{setMenu('shop')}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>{menu==='shop'?<h/>:<></>}</li>
        <li onClick={()=>{setMenu('mens')}}><Link style={{ textDecoration: 'none'}} to='/mens'>Men</Link>{menu==='mens'?<h/>:<></>}</li>
        <li onClick={()=>{setMenu('womens')}}><Link style={{ textDecoration: 'none'}} to='/womens'>Women</Link>{menu==='womens'?<h/>:<></>}</li>
        <li onClick={()=>{setMenu('kids')}}><Link style={{ textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==='kids'?<h/>:<></>}</li>
        <li onClick={()=>{setMenu('accessories')}}><Link style={{ textDecoration: 'none'}} to='/accessories'>Accessories</Link>{menu==='accessories'?<h/>:<></>}</li>
      </ul>
      <div className='nav-login-cart'>
        <Link style={{ textDecoration: 'none'}} to='/login'><button>Login</button></Link>
        <Link style={{ textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" style={{ width: '40px', height: 'auto' }} /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar


