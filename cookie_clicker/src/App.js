import React, { useState } from 'react';
import Cookie from './Cookie';
import ScoreBoard from './ScoreBoard';

function App() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <ScoreBoard score={score} />
      <Cookie onClick={handleClick} />
    </div>
  );
};

export default App;
