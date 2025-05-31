const state = {
  counters: {
    happy: 0,
    excited: 0,
    stress: 0,
    secure: 0,
  },
  days: {
    noInteraction: 0,
    shakeDays: 0,
    chatDays: 0,
    touchDays: 0,
    happyToneDays: 0,
    noise: false,
  },
  emotion: 'normal'
};

const messages = {
  en: {
    normal: 'Ready for anything!',
    happy: 'Your happiness is contagious! 😊',
    excited: 'Wheee! I love when you talk to me every day!',
    stress: "Ahh! You're shaking me too much!",
    secure: 'I feel safe when you’re close!',
    anxious: "Too loud! I can't think straight!",
    calm: 'Quiet days… just thinking...',
    lethargic: 'I feel sluggish… where are you?',
    sad: 'I miss you... are you mad at me?'
  },
  zh: {
    normal: '我准备好了！',
    happy: '你的快乐传染给我了！😊',
    excited: '每天都和我聊天真开心！',
    stress: '别摇我啦，我晕了！',
    secure: '我觉得很安全，有你真好！',
    anxious: '太吵了！我受不了了！',
    calm: '今天好安静，我在思考人生……',
    lethargic: '我好累……你在哪？',
    sad: '我想你了……你是不是生气了？'
  }
};

function processToyEvent(type, language = 'en') {
  if (type === 'shake') {
    state.days.shakeDays++;
    if (state.days.shakeDays % 3 === 0) state.counters.stress++;
  }
  if (type === 'touch') {
    state.days.touchDays++;
    if (state.days.touchDays % 5 === 0) state.counters.secure++;
  }
  if (type === 'chat') {
    state.days.chatDays++;
    if (state.days.chatDays % 3 === 0) state.counters.excited++;
  }
  if (type === 'noisy') {
    state.days.noise = true;
    state.emotion = 'anxious';
    return { emotion: state.emotion, message: messages[language][state.emotion] };
  }
  if (type === 'tick') {
    state.days.noInteraction++;
    if (state.days.noInteraction >= 6) state.emotion = 'lethargic';
    else if (state.days.noInteraction >= 3) state.emotion = 'calm';
  }

  const priority = ['stress', 'excited', 'happy', 'secure'];
  for (let p of priority) {
    if (state.counters[p] >= 6) {
      state.emotion = p;
      return { emotion: state.emotion, message: messages[language][state.emotion] };
    }
  }

  if (state.days.noise) return { emotion: 'anxious', message: messages[language]['anxious'] };

  state.emotion = 'normal';
  return { emotion: 'normal', message: messages[language]['normal'] };
}

module.exports = { processToyEvent, state };
