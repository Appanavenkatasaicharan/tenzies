import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import Confetti from 'react-confetti';
import {nanoid} from 'nanoid';

function App() {

  const [dyeNums,setDyeNums] = useState(newDice());
  const [tenzies,setTenzies] = useState(false);

  function rollDice()
  {
    setDyeNums(
      prevDyeNums => prevDyeNums.map(
        die => die.isHeld ? die : {...die,value : Math.floor(Math.random()*(6-1)+1)}
      )
    )
  }

  function newGame(){
    setDyeNums(newDice());
    setTenzies(false)
  }
  
  function newDice(){
    const arr = []
    for(let i=0;i<10;i++){
      arr[i] = {  
        id : nanoid(),
        value : Math.floor(Math.random()*(6-1)+1),
        isHeld : false} ;
      }
    return arr;
  }

  function holdDice(id){
    setDyeNums(
      (prevDyeNums) => prevDyeNums.map(
        (die) => die.id === id ? {...die,isHeld:!die.isHeld} : die
      )
    )
  }

  useEffect(
    () => {
      const held = dyeNums.every((die) => die.isHeld === true )
      const firstValue = dyeNums[0].value;
      const vals = dyeNums.every((die) => die.value === firstValue )
      if(held&&vals){
        setTenzies(true);
      }
    },[dyeNums]
  )
  const dice = dyeNums.map(
    (die) => <Die key={die.id} 
                  value = {die.value} 
                  isHeld={die.isHeld} 
                  onClick = {() => { holdDice(die.id) }} />
  )

  return (
    <>
    {tenzies && <Confetti />}
    <div className='Main'>
      <h1 className='header'>Tenzies</h1>
      <p className='header--text'>Roll until all dice are the same. Click each die freeze it at its current value between rolls</p>
      <div className="die--container">
        {dice}
      </div>
      <button className='roll' onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
    </div>
    </>
  );
}

export default App;
