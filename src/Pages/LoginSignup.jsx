import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const userData = {
        userName: username,
        email: email,
        password: password
      };
  
      // Wysyłamy żądanie POST do endpointu Rejestracji na localhost:5284/Register
      const response = await axios.post('http://localhost:5284/users', userData);
  
      // Obsługujemy odpowiedź
      console.log('Odpowiedź z serwera:', response.data);
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error);
    }
  };
  

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type='text' placeholder='Your Name' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleSignup}>Continue</button> {/* Wywołujemy funkcję handleSignup po kliknięciu przycisku */}
        <p className="loginsignup-login">Already have an account? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I accept the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
