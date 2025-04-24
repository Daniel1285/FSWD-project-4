import React, { useState } from 'react';
import style from '../style/StorageControls.module.css';

function StorageControls({ text, onOpenNewText }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [fileName, setFileName] = useState('');

  const getUserKey = () => {
    if (!currentUser) return null;
    return `docs-${currentUser.username || currentUser.email}`;
  };

  const handleSave = () => {
    const userKey = getUserKey();
    if (!userKey) return alert('User not logged in');
    if (!fileName) return alert('Please enter a file name');
  
    const userDocs = JSON.parse(localStorage.getItem(userKey)) || {};
  
    if (userDocs[fileName]) {
      const confirmOverwrite = window.confirm(
        `File "${fileName}" already exists. Do you want to overwrite it?`
      );
      if (!confirmOverwrite) return;
    }
  
    userDocs[fileName] = text;
    localStorage.setItem(userKey, JSON.stringify(userDocs));
    alert(`Saved as "${fileName}"`);
  };
  

  const handleLoad = () => {
    const userKey = getUserKey();
    if (!userKey) return alert('User not logged in');
  
    const userDocs = JSON.parse(localStorage.getItem(userKey)) || {};
  
    // Show file list if no filename provided
    if (!fileName) {
      const keys = Object.keys(userDocs);
      if (keys.length === 0) {
        return alert('No saved files found for this user.');
      }
  
      const selection = prompt(
        `Choose a file to open:\n${keys.map((k, i) => `${i + 1}. ${k}`).join('\n')}`
      );
  
      const selectedIndex = parseInt(selection) - 1;
      if (isNaN(selectedIndex) || !keys[selectedIndex]) {
        return alert('Invalid selection.');
      }
  
      const selectedFile = keys[selectedIndex];
      onOpenNewText(userDocs[selectedFile]);
      setFileName(selectedFile);
      return;
    }
  
    const content = userDocs[fileName];
    if (!content) {
      return alert(`No such file "${fileName}" found for current user`);
    }
  
    onOpenNewText(content);
  };
  

  return (
    <div className={style.storageControls}>
      <input
        type="text"
        placeholder="File name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleSave}>💾 Save</button>
      <button onClick={handleLoad}>📂 Open</button>
    </div>
  );
}

export default StorageControls;