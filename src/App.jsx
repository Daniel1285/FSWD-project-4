import React, { useState } from 'react';
import TextEditor from './components/TextEditor';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import styles from './style/App.module.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <div>
      <h1 className={styles.title}>Welcome to ~ Text Editor</h1>

      <div className={styles.appContainer}></div>
      <div className={styles.topRight}>
        {currentUser ? (
          <Dashboard user={currentUser} onLogout={handleLogout} />
        ) : (
          <button onClick={() => setShowLogin(true)} className={styles.loginBtn}>
            Login
          </button>
        )}
      </div>

      {showLogin && (
        <div className={styles.popupOverlay}>
          {isRegistering ? (
            <Register onToggle={() => setIsRegistering(false)} />
          ) : (
            <Login onLogin={handleLogin} onToggle={() => setIsRegistering(true)} />
          )}
        </div>
      )}

      <TextEditor />
    </div>
  );
}
