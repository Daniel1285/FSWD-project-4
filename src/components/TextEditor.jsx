import React, { useState } from 'react';
import TextDisplay from './TextDisplay';
import Toolbar from './Toolbar';
import EditControls from './EditControls';
import VirtualKeyboard from './VirtualKeyboard';
import StorageControls from './StorageControls';

export default function TextEditor() {
  // The array of characters with styles
  const [text, setText] = useState([]);

  // Current style settings applied to new characters
  const [currentStyle, setCurrentStyle] = useState({
    color: '#000000',
    fontSize: '16px',
    fontFamily: 'Arial',
  });

  // Keyboard mode states
  const [language, setLanguage] = useState('he');
  const [emojiMode, setEmojiMode] = useState(false);
  const [symbolMode, setSymbolMode] = useState(false);
  const [emojiOverlayVisible, setEmojiOverlayVisible] = useState(false);
  const [shiftMode, setShiftMode] = useState('off'); // 'off' or 'once' or 'locked'

  // Text history for undo support
  const [history, setHistory] = useState([]);

  // Search character
  const [searchChar, setSearchChar] = useState(null);

  // 'current' or 'all'
  const [styleMode, setStyleMode] = useState('current');

  const handleShiftClick = (type) => {
    if (type === 'single') {
      setShiftMode(prev => (prev === 'off' ? 'once' : 'off'));
    } else if (type === 'double') {
      setShiftMode(prev => (prev === 'locked' ? 'off' : 'locked'));
    }
  };

  const handleSearch = () => {
    const target = prompt('Enter character to search for:');
    if (!target || target.length !== 1) return;
  
    const normalized = target.toLowerCase();
    const hasMatch = text.some((item) => item.char.toLowerCase() === normalized);
  
    if (hasMatch) {
      setSearchChar(normalized);
    } else {
      alert(`No matches found for "${target}"`);
      setSearchChar(null);
    }
  };
  
  const handleClearSearch = () => {
    setSearchChar(null);
  };

  const handleStyleChange = (style) => {
    if (styleMode === 'current') {
      setCurrentStyle(prev => ({ ...prev, ...style }));
    } else {
      // Apply style to all text
      setText(prevText =>
        prevText.map(char => ({
          ...char,
          style: { ...char.style, ...style }
        }))
      );
      setCurrentStyle(prev => ({ ...prev, ...style }));
    }
  };

  const handleKeyPress = (char) => {
    const styledChar = { char, style: currentStyle };
    setHistory([...history, [...text]]);
    setText([...text, styledChar]);
    setEmojiOverlayVisible(false);
  };

  const handleDelete = (type) => {
    setHistory([...history, [...text]]);
    if (type === 'char') {
      setText(text.slice(0, -1));
    } else if (type === 'word') {
      let newText = [...text];
      while (newText.length && newText[newText.length - 1].char !== ' ') {
        newText.pop();
      }
      if (newText.length) newText.pop(); // remove space
      setText(newText);
    }
  };

  const handleClear = () => {
    setHistory([...history, [...text]]);
    setText([]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setText(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const handleReplace = () => {
    const toFind = prompt('Enter character to replace:');
    const toReplace = prompt(`Replace "${toFind}" with:`);
    const updated = text.map((item) =>
      item.char === toFind ? { ...item, char: toReplace } : item
    );
    setHistory([...history, [...text]]);
    setText(updated);
  };

  const cycleLanguage = () => {
    setLanguage((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  return (
    <div className="text-editor">

      {/* Output area showing styled text */}
      <TextDisplay text={text} searchChar={searchChar} />

      {/* Styling toolbar: font, size, color */}
      <Toolbar
        currentStyle={currentStyle}
        setStyle={handleStyleChange}
        currentMode={styleMode}
        setStyleMode={setStyleMode}
      />

      {/* Virtual keyboard with all modes */}
      <VirtualKeyboard
        language={language}
        emojiMode={emojiMode}
        symbolMode={symbolMode}
        emojiOverlayVisible={emojiOverlayVisible}
        onKeyPress={handleKeyPress}
        onCycleLanguage={cycleLanguage}
        onToggleEmojiMode={() => {
          setEmojiMode(!emojiMode);
          setSymbolMode(false);
        }}
        onToggleSymbolMode={() => {
          setSymbolMode(!symbolMode);
          setEmojiMode(false);
        }}
        onHoverEmojiButton={() => {
          if (!emojiMode) setEmojiOverlayVisible(true);
        }}
        onLeaveEmojiButton={() => {
          if (!emojiMode) setEmojiOverlayVisible(false);
        }}
        shiftMode={shiftMode}
        onShiftClick={handleShiftClick}
      />

      {/* Text editing operations */}
      <EditControls
        onDelete={handleDelete}
        onUndo={handleUndo}
        onReplace={handleReplace}
        onClear={handleClear}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        isSearching={!!searchChar}
      />
      <StorageControls text={text} setText={setText} />
    </div>
  );
}
