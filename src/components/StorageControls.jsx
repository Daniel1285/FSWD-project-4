import React, { useState } from 'react';

function StorageControls({ text, setText }) {
  const [fileName, setFileName] = useState('');

  const handleSave = () => {
    if (!fileName) return alert('Please enter a file name');
    const isExist = localStorage.getItem(fileName);
    if (!isExist){
        localStorage.setItem(fileName, JSON.stringify(text));
        alert(`Saved as "${fileName}"`);
    }
    return alert(`File "${fileName}" is already exists!`);
  };

  const handleLoad = () => {
    if (!fileName) return alert('Please enter a file name');
    const saved = localStorage.getItem(fileName);
    if (!saved) return alert('No such file found');
    setText(JSON.parse(saved));
  };

  return (
    <div className="storage-controls">
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