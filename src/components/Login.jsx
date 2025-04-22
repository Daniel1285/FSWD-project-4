import React, { useState } from 'react';
import styles from '../style/Login.module.css';

function Login({ onToggle, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Invalid credentials');
      return;
    }
    onLogin(user);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button  onClick={handleLogin}>Login</button>
      <p onClick={onToggle}>Don't have an account? Register</p>
    </div>
  );
}

export default Login;