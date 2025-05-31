import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import EmotionPanel from './components/EmotionPanel';
import InputArea from './components/InputArea';
import EventButtons from './components/EventButtons';
import LanguageSelector from './components/LanguageSelector';
import HistoryPanel from './components/HistoryPanel';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [textEmotion, setTextEmotion] = useState('normal');
  const [toyEmotion, setToyEmotion] = useState('normal');
  const [emotionMessage, setEmotionMessage] = useState('Ready for anything!');
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [simulate, setSimulate] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch('http://localhost:3001/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, language, simulation: simulate })
      });
      const data = await res.json();
      setMessages([...messages, input]);
      setTextEmotion(data.textEmotion);
      setToyEmotion(data.toyEmotion);
      setEmotionMessage(data.toyEmotionMessage);
      setEmotionHistory([...emotionHistory, {
        date: new Date().toLocaleString(),
        input,
        textEmotion: data.textEmotion,
        toyEmotion: data.toyEmotion,
      }]);
      setInput('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const sendToyEvent = async (eventType) => {
    try {
      const res = await fetch('http://localhost:3001/api/toy-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: eventType, simulation: simulate })
      });
      const data = await res.json();
      setToyEmotion(data.toyEmotion);
      setEmotionMessage(data.toyEmotionMessage);
      setEmotionHistory([...emotionHistory, {
        date: new Date().toLocaleString(),
        input: eventType,
        textEmotion: '-',
        toyEmotion: data.toyEmotion,
      }]);
    } catch (err) {
      console.error('Event error:', err);
    }
  };

  return (
    <div className="App">
      <h1>🧸 AI Emotion Toy</h1>
      <LanguageSelector language={language} setLanguage={setLanguage} simulate={simulate} setSimulate={setSimulate} />
      <EmotionPanel textEmotion={textEmotion} toyEmotion={toyEmotion} emotionMessage={emotionMessage} />
      <ChatBox messages={messages} />
      <InputArea input={input} setInput={setInput} sendMessage={sendMessage} />
      <EventButtons sendToyEvent={sendToyEvent} />
      <HistoryPanel emotionHistory={emotionHistory} />
    </div>
  );
}

export default App;
