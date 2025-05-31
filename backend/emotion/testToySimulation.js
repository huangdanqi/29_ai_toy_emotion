const axios = require('axios');

const API_URL = 'http://localhost:3001/api/toy-event';
const language = 'en'; // or 'zh'

// List of toy events you want to simulate rapidly
const testSequence = [
  { type: 'shake', times: 9 },       // Will trigger stress
  { type: 'touch', times: 10 },      // Will trigger secure
  { type: 'chat', times: 12 },       // Will trigger excited
  { type: 'tick', times: 7 },        // Will trigger calm → lethargic
  { type: 'noisy', times: 2 },       // Will trigger anxious
];

// Helper to delay between requests
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function simulate() {
  for (const event of testSequence) {
    for (let i = 0; i < event.times; i++) {
      try {
        const res = await axios.post(API_URL, { type: event.type, language });
        console.log(`[${event.type}] → ${res.data.emotion} | ${res.data.message}`);
        await wait(300); // 300ms between events to avoid flooding
      } catch (err) {
        console.error(`Error sending ${event.type}:`, err.message);
      }
    }
    await wait(1000); // Small pause between event types
  }
  console.log('✅ Test completed.');
}

simulate();
