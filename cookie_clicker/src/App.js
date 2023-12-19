import React, { useState } from 'react';
import Cookie from './Cookie';
import ScoreBoard from './ScoreBoard';
import UpgradeButton from './UpgradeButton';
import ClickMultiplier from './ClickMultiplier';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1); // initialize clickMultiplier to 1
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10); // initialize clickUpgradeCost to 100
  const [autoClicker, setAutoClicker] = useState(0); // initialize autoClicker to 0

  const handleCookieClick = () => {
    setScore(prevScore => prevScore + clickMultiplier);
    // console.log(clickMultiplier);
  };

  const handleUpgradeClick = () => {
    if (score >= clickUpgradeCost) { // if score is less than clickUpgradeCost, return (do nothing
      setClickMultiplier(prevClickMultiplier => prevClickMultiplier * 1.2); // increase clickMultiplier by 20%
      setScore(prevScore => prevScore - clickUpgradeCost); // subtract clickUpgradeCost from score
      setClickUpgradeCost(prevClickUpgradeCost => prevClickUpgradeCost + 20); // increase clickUpgradeCost by 100%
    } else {
      alert('在梦里，买不起！');
    }
  };

  const handleAC1Click = () => {
    setAutoClicker(prevAutoClicker => prevAutoClicker + 1);
    setScore(prevScore => prevScore - 100);
  };

  return (
    <div className="App">
      <ScoreBoard score={score} />
      <Cookie onClick={handleCookieClick} />
      <UpgradeButton onClick={handleUpgradeClick} cost={clickUpgradeCost} />
      <ClickMultiplier clickMultiplier={clickMultiplier} />
    </div>
  );
};

export default App;
