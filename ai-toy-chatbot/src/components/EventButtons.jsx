import React from 'react';

function EventButtons({ sendToyEvent }) {
  return (
    <div className="events">
      <button onClick={() => sendToyEvent('shake')}>Shake</button>
      <button onClick={() => sendToyEvent('touch')}>Touch</button>
      <button onClick={() => sendToyEvent('noisy')}>Noise</button>
      <button onClick={() => sendToyEvent('tick')}>1 Day Pass</button>
    </div>
  );
}

export default EventButtons;
