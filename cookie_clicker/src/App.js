import React, { useCallback, useEffect, useState } from 'react';
import Cookie from './Components/Cookie';
import ScoreBoard from './Components/ScoreBoard';
import UpgradeButton from './Components/UpgradeButton';
import ClickMultiplier from './Components/ClickMultiplier';
import AutoClickerManager from './Components/AutoClickerManager';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from './firebase';
import './App.css';

const userId = "cookie_clicker_user1"; 

function App() {
  const [score, setScore] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1); // initialize clickMultiplier to 1
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10); // initialize clickUpgradeCost to 100

  const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);

  const [count, setCount] = useState(0); // initialize count to 0

  const autoClickerShop = [
    { cost: 100, CPS: 1 },    // index 0
    { cost: 500, CPS: 5 },    // index 1
    { cost: 1000, CPS: 10 },  // index 2
    { cost: 2000, CPS: 20 },  // index 3
    { cost: 5000, CPS: 50 },  // index 4
    { cost: 10000, CPS: 100 } // index 5
  ];

  const [autoClickersOwned, setAutoClickersOwned] = useState(new Array(autoClickerShop.length).fill(0));

  const totalCPS = autoClickerShop.reduce((acc, curr, index) => {
    return acc + (curr.CPS * autoClickersOwned[index]);
  }, 0); // 0 is the initial value of acc (accumulator), curr is the current element in the array

  const refresh = () => {
    setScore(0);
    setClickMultiplier(1);
    setClickUpgradeCost(10);
    setAutoClickersOwned([0, 0, 0, 0, 0, 0]);
  }

  const handleCookieClick = () => {
    setScore(prevScore => prevScore + clickMultiplier);
  };

  const handleUpgradeClick = () => {
    if (score >= clickUpgradeCost) { // if score is less than clickUpgradeCost, return (do nothing
      setClickMultiplier(prevClickMultiplier => prevClickMultiplier + 10000); // increase clickMultiplier by 20%
      setScore(prevScore => prevScore - clickUpgradeCost); // subtract clickUpgradeCost from score
      setClickUpgradeCost(prevClickUpgradeCost => prevClickUpgradeCost * 1.2); // increase clickUpgradeCost by 100%
    };
  };

  const buyAutoClicker = (index) => {
    const cost = Math.round(autoClickerShop[index].cost * 1.2 ** autoClickersOwned[index]/50) * 50;
    if (score >= cost) {
      setScore(prevScore => prevScore - cost);
      setAutoClickersOwned(prevAutoClickersOwned => {
        const newAutoClickerOwned = [...prevAutoClickersOwned];
        newAutoClickerOwned[index]++;
        return newAutoClickerOwned
      });
    };
  }
  
  const loadGameData = async () => {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState) {
      setScore(gameState.score);
      setClickMultiplier(gameState.clickMultiplier);
      setClickUpgradeCost(gameState.clickUpgradeCost);
      setAutoClickersOwned(gameState.autoClickersOwned);
    } else {
      const docRef = doc(db, "gameStates", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const gameState = docSnap.data();
        setScore(gameState.score);
        setClickMultiplier(gameState.clickMultiplier);
        setClickUpgradeCost(gameState.clickUpgradeCost);
        setAutoClickersOwned(gameState.autoClickersOwned);
      } 
    } setIsGameDataLoaded(true);
  }

  const saveDataToFirestore = async () => {
    const gameState = {
      score,
      clickMultiplier,
      clickUpgradeCost,
      autoClickersOwned
    };

    const docRef = doc(db, "gameStates", userId);
    try {
      await setDoc(docRef, gameState);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    loadGameData();
  }, []); // empty array means this useEffect will only run once per load

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => prevScore + totalCPS/30);
    }, 1000/30);

    return () => clearInterval(interval);
  }, [autoClickersOwned]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      const gameState = {
        score,
        clickMultiplier,
        clickUpgradeCost,
        autoClickersOwned
      };
      localStorage.setItem('gameState', JSON.stringify(gameState));
    }, 3000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);  

  useEffect(() => {
    const interval = setInterval(() => {
      saveDataToFirestore();
    }, 120000); // save data to firestore every 2 minutes

    return () => clearInterval(interval);
  }, [count]);
  

  return (
    <div className="App">
      <button onClick={refresh}>Click</button>
      <ScoreBoard score={score} totalCPS={totalCPS} />
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