import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState(''); // User input
  const [messages, setMessages] = useState([]); // Chat history
  const [emotion, setEmotion] = useState('normal'); // Emotion state
  const [topic, setTopic] = useState(''); // Topic state
  const [manualTopic, setManualTopic] = useState(''); // Manual topic

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post('http://localhost:3001/api/chat', {
        message: input,
        topic,
        manualTopic,
      });

      const data = res.data;
      if (!topic && data.topic) {
        setTopic(data.topic);
      }

      setMessages([...messages, { user: input, bot: data.reply }]);
      setEmotion(data.currentEmotion);
      setInput('');
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  return (
    <div className="App">
      <h1>🤖 AI Toy Chatbot</h1>
      <div className="topic-input">
        <input
          type="text"
          placeholder="Enter a topic (optional)"
          value={manualTopic}
          onChange={e => setManualTopic(e.target.value)}
        />
        <button onClick={() => { setTopic(manualTopic); setMessages([]); }}>Start New Topic</button>
      </div>
      <h2>📌 Topic: {topic || 'N/A'}</h2>
      <div className="chatbox">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">
            <strong>🧍 You:</strong> {msg.user}<br />
            <strong>🤖 Bot:</strong> {msg.bot}
          </div>
        ))}
      </div>
      <div className="emotion-display">🧠 Emotion: <strong>{emotion}</strong></div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;