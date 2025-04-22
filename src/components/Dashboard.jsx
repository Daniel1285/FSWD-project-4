import React from 'react';
import styles from '../style/Dashboard.module.css';

export default function Dashboard({ user, onLogout }) {
  return (
    <div className={styles.container}>
      <span>Hello {user.username}</span>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
