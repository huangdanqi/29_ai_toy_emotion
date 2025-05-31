import React from 'react';

function LanguageSelector({ language, setLanguage, simulate, setSimulate }) {
  return (
    <div>
      <label>🌐 Language: </label>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
      <label style={{ marginLeft: '1rem' }}>
        <input type="checkbox" checked={simulate} onChange={e => setSimulate(e.target.checked)} />
        Simulation Mode
      </label>
    </div>
  );
}

export default LanguageSelector;
