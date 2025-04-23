import React from 'react';
import style from '../style/VirtualKeyboard.module.css';

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
          '🥲','😂','👍','🎂','🙏','😍','😅','😭','🙌','😡',
          '👋','💔','🎈','🌈','✨','🍕','🍔','🍣','🍩','🍪',]
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
    for (let i = 0; i < keys.length; i += 10) {
      rows.push(keys.slice(i, i + 10));
    }
  } else if (language === 'he') {
    rows.push(keys.slice(0, 8));
    rows.push(keys.slice(8, 18));
    rows.push(keys.slice(18));
  } else {
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
          className={style.keyboardButton}
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
      let shiftIcon = '⇧';
      if (shiftMode === 'locked') shiftIcon = '⇪';
      else if (shiftMode === 'once') shiftIcon = '⬆';

      buttons.unshift(
        <button
          key="shift"
          className={`${style.keyboardButton} ${shiftMode !== 'off' ? style.shiftActive : ''}`}
          onClick={() => onShiftClick('single')}
          onDoubleClick={() => onShiftClick('double')}
        >
          {shiftIcon}
        </button>
      );
    }

    return <div key={rowIndex} className={style.keyboardRow}>{buttons}</div>;
  };

  return (
    <div className={style.keyboard}>
      {rows.map((row, rowIndex) =>
        renderRow(row, rowIndex, rowIndex === rows.length - 1, language)
      )}

      <div className={style.keyboardRow}>
        {!emojiMode && (
          <button className={style.keyboardButton} onClick={onCycleLanguage}>🌐</button>
        )}

        <button className={style.spacebar} onClick={() => onKeyPress(' ')}>
          ⎵
        </button>

        <button className={style.symbolToggle} onClick={onToggleSymbolMode}>
          {symbolMode ? '⌨️' : '?123'}
        </button>

        <div
          className={style.emojiHoverContainer}
          onMouseEnter={onHoverEmojiButton}
          onMouseLeave={onLeaveEmojiButton}
        >
          <button className={style.emojiToggle} onClick={onToggleEmojiMode}>
            {emojiMode ? '⌨️' : (
              <span className="material-symbols-outlined">add_reaction</span>
            )}
          </button>

          {emojiOverlayVisible && !emojiMode && (
            <div className={style.emojiOverlay}>
              {['😂','❤️','🔥','👍','🥲'].map((emoji, index) => (
                <button
                  key={index}
                  className={style.keyboardButton}
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
