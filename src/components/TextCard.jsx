import React from 'react';
import TextDisplay from './TextDisplay';
import StorageControls from './StorageControls';
import style from '../style/TextCard.module.css';

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
      className={`${style.textCard} ${isActive ? style.active : ''}`}
      onClick={() => onSelect(index)}
    >
      <div className={style.cardHeader}>
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
