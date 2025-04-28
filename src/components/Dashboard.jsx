import React from 'react';
import styles from '../style/Dashboard.module.css';

function Dashboard({ user, onLogout }) {
  return (
    <div className={styles.dashboardInfoBox}>
      <button className={styles.buttonLogout} onClick={onLogout}>Logout</button>
      <span>Hello {user.username}</span>
    </div>
  );
}

export default Dashboard;