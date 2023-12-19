import React, { useEffect, useState } from 'react';
import Cookie from './Components/Cookie';
import ScoreBoard from './Components/ScoreBoard';
import UpgradeButton from './Components/UpgradeButton';
import ClickMultiplier from './Components/ClickMultiplier';
import AutoClickerManager from './Components/AutoClickerManager';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1); // initialize clickMultiplier to 1
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10); // initialize clickUpgradeCost to 100
  const [cursorAmount, setCursorAmount] = useState(0); // initialize cursorAmount to 0
  // const [cursorCost, setCursorCost] = useState(10); // initialize cursorCost to 10

  const autoClickerShop = [
    { cost: 100, CPS: 1 },    // index 0
    { cost: 500, CPS: 5 },    // index 1
    { cost: 1000, CPS: 10 },  // index 2
    { cost: 2000, CPS: 20 },  // index 3
    { cost: 5000, CPS: 50 },  // index 4
    { cost: 10000, CPS: 100 } // index 5
  ];

  const [autoClickersOwned, setAutoClickersOwned] = useState(new Array(autoClickerShop.length).fill(0));


  const handleCookieClick = () => {
    setScore(prevScore => prevScore + clickMultiplier);
    // console.log(clickMultiplier);
  };

  const handleUpgradeClick = () => {
    if (score >= clickUpgradeCost) { // if score is less than clickUpgradeCost, return (do nothing
      setClickMultiplier(prevClickMultiplier => prevClickMultiplier + 10000); // increase clickMultiplier by 20%
      setScore(prevScore => prevScore - clickUpgradeCost); // subtract clickUpgradeCost from score
      setClickUpgradeCost(prevClickUpgradeCost => prevClickUpgradeCost * 1.2); // increase clickUpgradeCost by 100%
    };
  };

  const buyAutoClicker = (index) => {
    console.log('I was clicked')
    const cost = autoClickerShop[index].cost;
    if (score >= cost) {
      setScore(prevScore => prevScore - cost);
      setAutoClickersOwned(prevAutoClickersOwned => {
        const newAutoClickerOwned = [...prevAutoClickersOwned];
        newAutoClickerOwned[index]++;
        console.log(newAutoClickerOwned);
        return newAutoClickerOwned
      });
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // store the total CPS (cookies per second) in totalCPS
      const totalCPS = autoClickerShop.reduce((acc, curr, index) => {
        return acc + (curr.CPS * autoClickersOwned[index]);
      }, 0); // 0 is the initial value of acc (accumulator), curr is the current element in the array

      setScore(prevScore => prevScore + totalCPS);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickersOwned]);

  return (
    <div className="App">
      <ScoreBoard score={score} />
      <Cookie onClick={handleCookieClick} />
      <UpgradeButton onClick={handleUpgradeClick} cost={clickUpgradeCost} />
      <ClickMultiplier clickMultiplier={clickMultiplier} />
      <AutoClickerManager 
        autoClickerShop={ autoClickerShop }
        autoClickersOwned={ autoClickersOwned }
        buyAutoClicker={ buyAutoClicker }/>
    </div>
  );
};

export default App;