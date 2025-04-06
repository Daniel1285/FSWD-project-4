import React, { useState } from 'react';
import TextDisplay from './TextDisplay';
import Toolbar from './Toolbar';
import EditControls from './EditControls';
import VirtualKeyboard from './VirtualKeyboard';
import StorageControls from './StorageControls';
import TextCard from './TextCard';

export default function TextEditor() {
  
  const [texts, setTexts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Current style settings applied to new characters
  const [currentStyle, setCurrentStyle] = useState({
    color: '#000',
    fontSize: '16px',
    fontFamily: 'Arial',
  });
  
  // Keyboard mode states
  const [language, setLanguage] = useState('he');
  const [emojiMode, setEmojiMode] = useState(false);
  const [symbolMode, setSymbolMode] = useState(false);
  const [emojiOverlayVisible, setEmojiOverlayVisible] = useState(false);
  const [shiftMode, setShiftMode] = useState('off'); // 'off' or 'once' or 'locked'
  const [history, setHistory] = useState([]); // Text history for undo support
  const [searchChar, setSearchChar] = useState(null); // Search character
  const [styleMode, setStyleMode] = useState('current'); // 'current' or 'all'

  const handleShiftClick = (type) => {
    if (type === 'single') {
      setShiftMode(prev => (prev === 'off' ? 'once' : 'off'));
    } else if (type === 'double') {
      setShiftMode(prev => (prev === 'locked' ? 'off' : 'locked'));
    }
  };

  const handleSearch = () => {
    if (activeIndex === null) return;
    const target = prompt('Search character:');
    if (!target || target.length !== 1) return;
    const found = texts[activeIndex].content.some(
      item => item.char.toLowerCase() === target.toLowerCase()
    );
    if (!found) {
      alert('No matches found.');
      setSearchChar(null);
    } else {
      setSearchChar(target.toLowerCase());
    }
  };
  
  const handleClearSearch = () => setSearchChar(null);

  // Handle style changes for the current text or all texts
  const handleStyleChange = (style) => {
    if (styleMode === 'current') {
      setCurrentStyle(prev => ({ ...prev, ...style }));
    } else if (activeIndex !== null) {
      const updated = [...texts];
      updated[activeIndex].content = updated[activeIndex].content.map(char => ({
        ...char,
        style: { ...char.style, ...style },
      }));
      setTexts(updated);
      setCurrentStyle(prev => ({ ...prev, ...style }));
    }
  };

  const handleKeyPress = (char) => {
    if (activeIndex === null) return;
    const newChar = { char, style: currentStyle };
    const updated = [...texts];
    updated[activeIndex].content.push(newChar);
    setTexts(updated);
    setHistory([...history, JSON.parse(JSON.stringify(updated))]);
    setEmojiOverlayVisible(false);
  };

  // Add new text area
  const handleNewText = () => {
    const newText = {
      id: Date.now(),
      title: `Text ${texts.length + 1}`,
      content: [],
    };
    setTexts([...texts, newText]);
    setActiveIndex(texts.length);
  };

  // Close text area
  const handleCloseText = (index) => {
    const shouldSave = window.confirm('Do you want to save before closing?');
    if (shouldSave) {
      const fileName = prompt('Enter file name to save:');
      if (fileName) {
        localStorage.setItem(fileName, JSON.stringify(texts[index].content));
        alert(`Saved as "${fileName}"`);
      }
    }
    const updated = texts.filter((_, i) => i !== index);
    setTexts(updated);
    if (activeIndex === index) {
      setActiveIndex(null);
    } else if (activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Handle delete character or word
  const handleDelete = (type) => {
    if (activeIndex === null) return;
    const updated = [...texts];
    if (type === 'char') {
      updated[activeIndex].content.pop();
    } else if (type === 'word') {
      while (
        updated[activeIndex].content.length &&
        updated[activeIndex].content.at(-1).char !== ' '
      ) {
        updated[activeIndex].content.pop();
      }
      updated[activeIndex].content.pop();
    }
    setTexts(updated);
    setHistory([...history, JSON.parse(JSON.stringify(updated))]);
  };

  const handleClear = () => {
    if (activeIndex === null) return;
    const updated = [...texts];
    updated[activeIndex].content = [];
    setTexts(updated);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setTexts(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const handleReplace = () => {
    if (activeIndex === null) return;
    const target = prompt('Enter character to replace:');
    const toReplace = prompt('Replace with:');
    const updated = [...texts];
    updated[activeIndex].content = updated[activeIndex].content.map(item =>
      item.char === target ? { ...item, char: toReplace } : item
    );
    setTexts(updated);
  };

  const handleOpenNewText = (newContent) => {
    const newText = {
      id: Date.now(),
      title: `Text ${texts.length + 1}`,
      content: newContent,
    };
    setTexts([...texts, newText]);
    setActiveIndex(texts.length);
  };

  const cycleLanguage = () => {
    setLanguage(prev => (prev === 'he' ? 'en' : 'he'));
  };

  const handleUpdateTextContent = (index, newContent) => {
    const updated = [...texts];
    updated[index].content = newContent;
    setTexts(updated);
  };

  return (
    <div className="text-editor">

      <div className="text-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {texts.map((text, i) => (
          <TextCard
            key={text.id}
            index={i}
            text={text}
            isActive={i === activeIndex}
            onSelect={setActiveIndex}
            onClose={handleCloseText}
            searchChar={searchChar}
            onUpdateContent={handleUpdateTextContent}
          />
        ))}

        <div className="text-card add-card" onClick={handleNewText}>
            <div className="card-header" style={{ justifyContent: 'center' }}>
              ➕ Add Text
            </div>
        </div>
      </div>

      <Toolbar
        currentStyle={currentStyle}
        setStyle={handleStyleChange}
        currentMode={styleMode}
        setStyleMode={setStyleMode}
      />

      <VirtualKeyboard
        language={language}
        emojiMode={emojiMode}
        symbolMode={symbolMode}
        shiftMode={shiftMode}
        onKeyPress={handleKeyPress}
        onCycleLanguage={cycleLanguage}
        onShiftClick={handleShiftClick}
        onToggleEmojiMode={() => {
          setEmojiMode(!emojiMode);
          setSymbolMode(false);
        }}
        onToggleSymbolMode={() => {
          setSymbolMode(!symbolMode);
          setEmojiMode(false);
        }}
        onHoverEmojiButton={() => !emojiMode && setEmojiOverlayVisible(true)}
        onLeaveEmojiButton={() => !emojiMode && setEmojiOverlayVisible(false)}
        emojiOverlayVisible={emojiOverlayVisible}
      />

      <EditControls
        onDelete={handleDelete}
        onUndo={handleUndo}
        onReplace={handleReplace}
        onClear={handleClear}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        isSearching={!!searchChar}
      />
    </div>
  );
}
