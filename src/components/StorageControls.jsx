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
      return alert(`File "${fileName}" already exists!`);
    }

    userDocs[fileName] = text;
    localStorage.setItem(userKey, JSON.stringify(userDocs));
    alert(`Saved as "${fileName}"`);
  };

  const handleLoad = () => {
    const userKey = getUserKey();
    if (!userKey) return alert('User not logged in');
    if (!fileName) return alert('Please enter a file name');

    const userDocs = JSON.parse(localStorage.getItem(userKey)) || {};
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