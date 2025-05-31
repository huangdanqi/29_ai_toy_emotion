import React from 'react';

function EmotionPanel({ textEmotion, toyEmotion, emotionMessage }) {
  return (
    <div className="emotion-box">
      <h2>🎭 Toy Emotion: {toyEmotion}</h2>
      <p>{emotionMessage}</p>
      <h2>💬 Text Emotion: {textEmotion}</h2>
    </div>
  );
}

export default EmotionPanel;
