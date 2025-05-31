import React from 'react';

function HistoryPanel({ emotionHistory }) {
  return (
    <div className="history">
      <h3>📜 Emotion History</h3>
      <ul>
        {emotionHistory.map((item, idx) => (
          <li key={idx}>
            <strong>{item.date}</strong> - "{item.input}" → Text: {item.textEmotion}, Toy: {item.toyEmotion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryPanel;
