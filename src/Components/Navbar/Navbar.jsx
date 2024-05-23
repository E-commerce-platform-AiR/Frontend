import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo3.png';
import cart_icon from '../Assets/shopping-cart.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = ({ userLoggedIn, handleLogout }) => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout(); // Wywołanie funkcji handleLogout przekazanej jako props
    navigate('/'); // Przekierowanie na stronę główną po wylogowaniu
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="" style={{ width: '130px', height: 'auto' }} />
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu('shop') }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
          {menu === 'shop' ? <h /> : <></>}
        </li>
        {/* Pozostałe linki menu */}
      </ul>
      <div className='nav-login-cart'>
        {/* Warunkowe renderowanie przycisków na podstawie stanu zalogowania */}
        {userLoggedIn ? (
          <>
            <button onClick={handleLogoutClick}>Logout</button>
            <Link style={{ textDecoration: 'none' }} to='/cart'>
              <img src={cart_icon} alt="" style={{ width: '40px', height: 'auto' }} />
            </Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </>
        ) : (
          <>
            <Link style={{ textDecoration: 'none' }} to='/signup'><button>Login</button></Link>
            <Link style={{ textDecoration: 'none' }} to='/cart'>
              <img src={cart_icon} alt="" style={{ width: '40px', height: 'auto' }} />
            </Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;