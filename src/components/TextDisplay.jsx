import React from 'react';

export default function TextDisplay({ text, searchChar }) {
  return (
    <div className="text-display">
      {text.map((item, index) => (
        <span
          key={index}
          style={item.style}
          className={
            searchChar &&
            item.char.toLowerCase() === searchChar
              ? 'highlighted-char'
              : ''
          }
        >
          
          {item.char}
        </span>
      ))}
    </div>
  );
}