import React from 'react';
import style from '../style/EditControls.module.css';

export default function EditControls({
  onDelete,
  onUndo,
  onReplace,
  onClear,
  onSearch,
  onClearSearch,
  isSearching
}) {
  return (
    <div className={style.editControls}>
      <button onClick={() => onDelete('char')}>⌫ Delete Char</button>
      <button onClick={() => onDelete('word')}>⎚ Delete Word</button>
      <button onClick={onUndo}>↶ Undo</button>
      <button onClick={onReplace}>♻ Replace</button>
      <button onClick={onClear}>🧹 Clear All</button>
      {!isSearching ? (
        <button onClick={onSearch}>🔍 Search</button>
      ) : (
        <button onClick={onClearSearch}>❌ Clear Search</button>
      )}
    </div>
  );
}