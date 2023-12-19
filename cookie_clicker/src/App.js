import React, { useEffect, useState } from 'react';
import Cookie from './Cookie';
import ScoreBoard from './ScoreBoard';
import UpgradeButton from './UpgradeButton';
import ClickMultiplier from './ClickMultiplier';
import BuyCursor from './BuyCursor';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1); // initialize clickMultiplier to 1
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10); // initialize clickUpgradeCost to 100
  const [cursorAmount, setCursorAmount] = useState(0); // initialize cursorAmount to 0
  const [cursorCost, setCursorCost] = useState(10); // initialize cursorCost to 10


  const handleCookieClick = () => {
    setScore(prevScore => prevScore + clickMultiplier);
    // console.log(clickMultiplier);
  };

  const handleUpgradeClick = () => {
    if (score >= clickUpgradeCost) { // if score is less than clickUpgradeCost, return (do nothing
      setClickMultiplier(prevClickMultiplier => prevClickMultiplier * 1.2); // increase clickMultiplier by 20%
      setScore(prevScore => prevScore - clickUpgradeCost); // subtract clickUpgradeCost from score
      setClickUpgradeCost(prevClickUpgradeCost => prevClickUpgradeCost + 20); // increase clickUpgradeCost by 100%
    };
  };

  const buyCursor = () => {
    if (score >= cursorCost) {
      setCursorAmount(prevCursorAmount => prevCursorAmount + 1);
      setScore(prevScore => prevScore - cursorCost);
      setCursorCost(prevCursorCost => prevCursorCost * 1.2);
    }; 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + cursorAmount);
    }, 1000);

    return () => clearInterval(interval);
  }, [cursorAmount]);

  return (
    <div className="App">
      <ScoreBoard score={score} />
      <Cookie onClick={handleCookieClick} />
      <UpgradeButton onClick={handleUpgradeClick} cost={clickUpgradeCost} />
      <ClickMultiplier clickMultiplier={clickMultiplier} />
      <BuyCursor onClick={buyCursor} cost={cursorCost} />
    </div>
  );
};

export default App;
