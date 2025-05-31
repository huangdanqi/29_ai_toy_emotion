import React from 'react';

const ChatBox = ({ messages = [] }) => {
  return (
    <div className="chatbox">
      { (Array.isArray(messages) ? messages : []).map((msg, idx) => <div key={idx}>🧍 {msg}</div>) }
    </div>
  );
}

export default ChatBox;
