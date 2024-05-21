import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css';
import axios from 'axios';

const LoginSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const redirectToShop = () => {
    navigate('/');
  };


const handleSignin = async () => {

  try {
    const userData = {
      userName: "",
      email: email,
      password: password
    };

    const response = await axios.post('http://localhost:5284/users/login', userData);

    if (response.status === 200){
        console.log('Sukces! Odpowiedź z serwera:', response.data);
        redirectToShop()
      }

    console.log('Odpowiedź z serwera:', response.data);
  } catch (error) {
    console.error('Błąd podczas wysyłania żądania:', error);
  }
};

  return (
    <div className='login'>
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-fields">
            <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder='Password'value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button onClick={handleSignin}>Login</button>
        
      </div>
    </div>
  );
}

export default LoginSignin;