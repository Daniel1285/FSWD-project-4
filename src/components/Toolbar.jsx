import React from 'react';

export default function Toolbar({ currentStyle, setStyle, currentMode, setStyleMode }) {

  const fontSizes = [14, 16, 18, 20, 24, 30];

  const handleFontChange = (e) => {
    setStyle({ fontFamily: e.target.value });
  };

  const handleSizeChange = (e) => {
    setStyle({ fontSize: e.target.value });
  };

  const handleColorChange = (e) => {
    setStyle({ color: e.target.value });
  };

  const increaseFontSize = () => {
    const current = parseInt(currentStyle.fontSize || '16');
    const index = fontSizes.findIndex(s => s === current);
    if (index < fontSizes.length - 1) {
      const nextSize = fontSizes[index + 1];
      setStyle({ fontSize: `${nextSize}px` });
    }
  };
  
  const decreaseFontSize = () => {
    const current = parseInt(currentStyle.fontSize || '16');
    const index = fontSizes.findIndex(s => s === current);
    if (index > 0) {
      const prevSize = fontSizes[index - 1];
      setStyle({ fontSize: `${prevSize}px` });
    }
  };

  return (
    <div className="toolbar">
      <select onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="David">David</option>
        <option value="FrankRuehl">FrankRuehl</option>
        <option value="Rubik">Rubik</option>
      </select>

      <select onChange={handleSizeChange} value={currentStyle.fontSize}>
        {fontSizes.map((size) => (
          <option key={size} value={`${size}px`}>{size}</option>
        ))}
      </select>

      <button onClick={decreaseFontSize}>A-</button>
      <button onClick={increaseFontSize}>A+</button>

      <input type="color" onChange={handleColorChange} />

      <div className="style-mode-toggle">
        <label>
          <input
            type="radio"
            name="styleMode"
            value="current"
            checked={currentMode === 'current'}
            onChange={() => setStyleMode('current')}
          />
          Apply from now on
        </label>
        <label>
          <input
            type="radio"
            name="styleMode"
            value="all"
            checked={currentMode === 'all'}
            onChange={() => setStyleMode('all')}
          />
          Apply to all text
        </label>
      </div>
    </div>
  );
}
