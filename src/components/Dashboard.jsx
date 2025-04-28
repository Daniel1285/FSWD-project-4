import React from 'react';
import styles from '../style/Dashboard.module.css';

function Dashboard({ user, onLogout }) {
  return (
    <div className={styles.dashboardInfoBox}>
      <span>Hello {user.username}</span>
      <button className={styles.buttonLogout} onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;