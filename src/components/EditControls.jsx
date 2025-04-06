import React from 'react';

export default function EditControls({ onDelete, onUndo, onReplace, onClear, onSearch, onClearSearch, isSearching }) {
  return (
    <div className="edit-controls">
      <button onClick={() => onDelete('char')}>⌫ Delete Char</button>
      <button onClick={() => onDelete('word')}>⌫ Delete Word</button>
      <button onClick={onClear}>🧹 Clear All</button>
      <button onClick={onUndo}>↩️ Undo</button>
      <button onClick={onReplace}>🔁 Replace</button>
      {isSearching ? (
        <button onClick={onClearSearch} title="Clear Search">❌</button>
      ) : (
        <button onClick={onSearch} title="Search Character">🔍</button>
      )}
    </div>
  );
}
