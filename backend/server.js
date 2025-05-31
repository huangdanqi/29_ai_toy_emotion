// 📁 server.js (Backend)

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '2122a118464b35c9d15b083231881663.lXSTxduoUJXwz7e0';
const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// Initial toy emotion state
let toyState = {
  shakeCount: 0,
  touchCount: 0,
  chatCount: 0,
  tickCount: 0,
  noisyCount: 0,
  emotion: 'normal',
  emotionMessage: 'Ready for anything!',
  history: []
};

function resetToyState() {
  toyState = {
    shakeCount: 0,
    touchCount: 0,
    chatCount: 0,
    tickCount: 0,
    noisyCount: 0,
    emotion: 'normal',
    emotionMessage: 'Ready for anything!',
    history: []
  };
}

function evaluateToyEmotion(simulation = false) {
  const threshold = simulation ? 2 : 5;

  if (toyState.noisyCount >= 1) {
    toyState.emotion = 'nervous';
    toyState.emotionMessage = 'Too loud!';
  } else if (toyState.shakeCount >= threshold) {
    toyState.emotion = 'excited';
    toyState.emotionMessage = 'Yay! That tickles!';
  } else if (toyState.touchCount >= threshold) {
    toyState.emotion = 'secure';
    toyState.emotionMessage = 'I feel so loved!';
  } else if (toyState.chatCount >= threshold) {
    toyState.emotion = 'connected';
    toyState.emotionMessage = 'I love our talks!';
  } else if (toyState.tickCount >= threshold) {
    toyState.emotion = 'lethargic';
    toyState.emotionMessage = 'Getting tired...';
  } else {
    toyState.emotion = 'normal';
    toyState.emotionMessage = 'Ready for anything!';
  }

  toyState.history.push({
    emotion: toyState.emotion,
    message: toyState.emotionMessage,
    day: toyState.tickCount
  });
}

async function analyzeTextEmotion(message, language) {
  const prompt = language === 'zh'
    ? '请判断用户的情绪标签（happy, sad, lethargic, or normal），仅返回英文标签。'
    : 'Please judge the user\'s emotion as one of: happy, sad, lethargic, or normal. Return only the label.';

  try {
    const response = await axios.post(API_URL, {
      model: 'glm-4',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const result = response.data.choices[0].message.content.trim().toLowerCase();
    if (['happy', 'sad', 'lethargic'].includes(result)) return result;
    return 'normal';
  } catch (err) {
    console.error('LLM API error:', err.message);
    return 'normal';
  }
}

app.post('/api/message', async (req, res) => {
  const { message, language, simulation } = req.body;
  const textEmotion = await analyzeTextEmotion(message, language);

  toyState.chatCount += 1;
  evaluateToyEmotion(simulation);

  res.json({
    textEmotion,
    toyEmotion: toyState.emotion,
    toyEmotionMessage: toyState.emotionMessage,
    history: toyState.history
  });
});

app.post('/api/toy-event', (req, res) => {
  const { type, simulation } = req.body;

  if (type === 'shake') toyState.shakeCount += 1;
  if (type === 'touch') toyState.touchCount += 1;
  if (type === 'chat') toyState.chatCount += 1;
  if (type === 'tick') toyState.tickCount += 1;
  if (type === 'noisy') toyState.noisyCount += 1;

  evaluateToyEmotion(simulation);

  res.json({
    toyEmotion: toyState.emotion,
    toyEmotionMessage: toyState.emotionMessage,
    history: toyState.history
  });
});

app.post('/api/reset', (req, res) => {
  resetToyState();
  res.json({ message: 'State reset.' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
