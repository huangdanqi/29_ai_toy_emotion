import React from 'react';

function InputArea({ input, setInput, sendMessage }) {
  return (
    <div className="input-area">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Say something..."
        style={{ color: 'black' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default InputArea;
