import React from 'react';

export default function LangSelector({ language, onChange }) {
  const languages = ['he', 'en', 'emoji'];
  return (
    <div className="lang-selector">
      {languages.map((lang) => (
        <button
          key={lang}
          className={language === lang ? 'selected' : ''}
          onClick={() => onChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
