import React from 'react';
import style from '../style/TextDisplay.module.css';

export default function TextDisplay({ text, searchChar }) {
  return (
    <div className={style.textDisplay}>
      {text.map((item, index) => (
        <span
          key={index}
          style={item.style}
          className={
            searchChar &&
            item.char.toLowerCase() === searchChar
              ? style.highlightedChar
              : ''
          }
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}