import React from 'react';

const keyboards = {
  en: [
    'q','w','e','r','t','y','u','i','o','p',
    'a','s','d','f','g','h','j','k','l',
    'z','x','c','v','b','n','m'
  ],
  he: [
    'ק','ר','א','ט','ו','ן','ם','פ',
    'ש','ד','ג','כ','ע','י','ח','ל','ך', 'ף',
    'ז','ס','ב','ה','נ','מ','צ', 'ת', 'ץ'
  ],

  symbol: [
    '1','2','3','4','5','6','7','8','9','0',
    '!','@','#','$','%','^','&','*','(',')',
    '-','_','=','+','[',']','{','}','\\','/',
    ':',';','"',`'`,'<','>',',','.','?'
  ],

  emoji: ['😀','😎','🔥','❤️','🎉','👀','💻','🚀','🌟','🤖',
          '🥲','😂','👍','🎂','🙏','😍','😅','😭','🙌','😡']
};

export default function VirtualKeyboard(props) {

    const {
    language,
    emojiMode,
    symbolMode,
    emojiOverlayVisible,
    onKeyPress,
    onCycleLanguage,
    onToggleEmojiMode,
    onToggleSymbolMode,
    onHoverEmojiButton,
    onLeaveEmojiButton,
    shiftMode,
    onShiftClick
  } = props;

  const keys = emojiMode
    ? keyboards.emoji
    : symbolMode
      ? keyboards.symbol
      : keyboards[language];

  const rows = [];
  if (emojiMode || symbolMode) {
    // Group emoji or symbol keyboard into rows of 10
    for (let i = 0; i < keys.length; i += 10) {
      rows.push(keys.slice(i, i + 10));
    }
  } else if (language === 'he') {
    rows.push(keys.slice(0, 8));   // top
    rows.push(keys.slice(8, 18));  // middle
    rows.push(keys.slice(18));     // bottom
  } else {
    // English layout (QWERTY)
    rows.push(keys.slice(0, 10));
    rows.push(keys.slice(10, 19));
    rows.push(keys.slice(19));
  }

  const renderRow = (row, rowIndex, isBottomRow, language) => {
    const buttons = row.map((char, i) => {
      const displayChar =
        shiftMode !== 'off' && /^[a-zA-Z]$/.test(char)
          ? char.toUpperCase()
          : char;
  
      return (
        <button
          key={i}
          onClick={() => {
            onKeyPress(displayChar);
            if (shiftMode === 'once') {
              onShiftClick('single');
            }
          }}
        >
          {displayChar}
        </button>
      );
    });
  
    if (isBottomRow && language === 'en') {
      let shiftIcon = '⇧'; // default

      if (shiftMode === 'locked') shiftIcon = '⇪';
      else if (shiftMode === 'once') shiftIcon = '⬆';

      buttons.unshift(
        <button
          key="shift"
          className={shiftMode !== 'off' ? 'shift-active' : ''}
          onClick={() => onShiftClick('single')}
          onDoubleClick={() => onShiftClick('double')}
        >
          {shiftIcon}
        </button>
      );
    }
  
    return <div key={rowIndex} className="keyboard-row">{buttons}</div>;
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) =>
        renderRow(row, rowIndex, rowIndex === rows.length - 1, language)
      )}

      <div className="keyboard-row">
        {!emojiMode && (
          <button onClick={onCycleLanguage}>🌐</button>
        )}

        <button className="spacebar" onClick={() => onKeyPress(' ')}>
          ⎵
        </button>

        <div>
          <button className="symbol-toggle" onClick={onToggleSymbolMode}>
            {symbolMode ? '⌨️' : '?123'}
          </button>
        </div>

        <div
          className="emoji-hover-container"
          onMouseEnter={onHoverEmojiButton}
          onMouseLeave={onLeaveEmojiButton}
        >
          <button className="emoji-toggle" onClick={onToggleEmojiMode}>
            {emojiMode ? '⌨️' : (
              <span className="material-symbols-outlined">add_reaction</span>
            )}
          </button>

          {emojiOverlayVisible && !emojiMode && (
            <div className="emoji-overlay">
              {['😂','❤️','🔥','👍','🥲'].map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => onKeyPress(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
