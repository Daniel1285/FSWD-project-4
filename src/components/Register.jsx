import React, { useState } from 'react';
import styles from '../style/Register.module.css';

export default function Register({ onToggle }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === username)) {
      alert('Username already exists!');
      return;
    }
    if (users.find(u => u.email === email)) {
      alert('Email already registered!');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully!');
    onToggle();
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p onClick={onToggle}>Already have an account? Login</p>
    </div>
  );
}
