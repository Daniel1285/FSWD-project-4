import React from 'react';
import TextDisplay from './TextDisplay';
import StorageControls from './StorageControls';

export default function TextCard(props) {

  const {
    text,
    index,
    isActive,
    onSelect,
    onClose,
    searchChar,
    onUpdateContent
  } = props;

  return (
    <div
      className={`text-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(index)}
    >
      <div className="card-header">
        <strong>{text.title}</strong>
        <button onClick={(e) => {
          e.stopPropagation(); // Prevents unintended card selection
          onClose(index);
        }}>
          ❌
        </button>
      </div>
      <TextDisplay text={text.content} searchChar={searchChar} />

      <StorageControls
        text={text.content}
        onOpenNewText={(newContent) => onUpdateContent(index, newContent)}
      />
    </div>
  );
}
